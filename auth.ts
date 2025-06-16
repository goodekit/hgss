/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GLOBAL } from 'hgss'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { cookies } from 'next/headers'
import { prisma } from 'db/prisma'
import { compare } from 'lib/encrypt'
import { KEY } from 'lib/constant'
import { authConfig } from './auth.config'

export type SessionStrategyType = 'jwt' | 'database' | undefined

export const config = {
  pages: {
    signIn: '/sign-in',
    error : '/sign-in'
  },
  session: {
    strategy: 'jwt' as const,
    maxAge  : 24 * 60 * 60
  },
  providers: [
    GoogleProvider({
      clientId    : GLOBAL.GOOGLE.CLIENT_ID,
      clientSecret: GLOBAL.GOOGLE.CLIENT_SECRET
    }),
    CredentialsProvider({
      credentials: {
        email   : { type: 'email' },
        password: { type: 'password' }
      },
      async authorize(credentials) {
        if (credentials === null) return null
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string
          }
        })
        if (user && user.password) {
          const isMatch = await compare(credentials.password as string, user.password)
          if (isMatch) {
            return {
              id   : user.id,
              name : user.name,
              email: user.email,
              role : user.role
            }
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async session({ session, user, trigger, token }: any) {
      session.user.id   = token.id
      session.user.role = token.role
      session.user.name = token.name

      if (trigger === 'update') {
        session.user.name = user.name
      }
      return session
    },

    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        let dbUser = await prisma.user.findUnique({
          where: { email: user.email! }
        })
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email: user.email!,
              name : user.name ?? user.email!.split('@')[0],
              role : 'user'
            }
          })
        }
        token.id   = dbUser.id
        token.sub  = dbUser.id
        token.role = dbUser.role
        token.name = dbUser.name

        if (dbUser.name === 'NO_NAME') {
          const name = dbUser.email!.split('@')[0]
          await prisma.user.update({ where: { id: dbUser.id }, data: { name } })
          token.name = name
        }

        if (trigger === 'signIn' || trigger === 'signUp') {
          const cookiesObject = await cookies()
          const sessionBagId = cookiesObject.get(KEY.SESSION_BAG_ID)?.value
          if (sessionBagId) {
            const sessionBag = await prisma.bag.findFirst({ where: { sessionBagId } })
            if (sessionBag) {
              await prisma.bag.deleteMany({ where: { userId: dbUser.id } })
              await prisma.bag.update({ where: { id: sessionBag.id }, data: { userId: dbUser.id } })
            }
          }
        }
      }

      if (session?.user.name && trigger === 'update') {
        token.name = session.user.name
      }
      return token
    },
    ...(authConfig.callbacks ?? {})
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)
