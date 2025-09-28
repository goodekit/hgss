/* eslint-disable @typescript-eslint/no-explicit-any */
import { GLOBAL } from 'hgss'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { cookies } from 'next/headers'
import { prisma } from 'db/prisma'
import { invalidateCache } from 'lib/cache'
import { CACHE_KEY } from 'config/cache.config'
import bcrypt from 'bcryptjs'
import { KEY } from 'lib/constant'
import { authConfig } from './auth.config'
import { transl } from 'lib'

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
          const isMatch = await bcrypt.compare(credentials.password as string, user.password)
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
      session.user.id       = token.id
      session.user.role     = token.role
      session.user.name     = token.name
      session.user.provider = token.provider
      if (trigger === 'update') {
        session.user.name = user.name
      }
      return session
    },

    async jwt({ token, user, trigger, session, account }: any) {
      if (user) {
        let newOrExistingUser = await prisma.user.findUnique({
          where: { email: user.email! }
        })
        if (!newOrExistingUser) {
          newOrExistingUser = await prisma.user.create({
            data: {
              email: user.email!,
              name : user.name ?? user.email!.split('@')[0],
              role : 'user'
            }
          })
        }

        token.id   = newOrExistingUser.id
        token.sub  = newOrExistingUser.id
        token.role = newOrExistingUser.role
        token.name = newOrExistingUser.name
        token.lastInvalidatedAt = newOrExistingUser.lastInvalidatedAt?.getTime?.() ?? 0

        if (account?.provider) {
          token.provider = account.provider
        }

        if (newOrExistingUser.name === 'NO_NAME') {
          const derivedName = newOrExistingUser.email!.split('@')[0]
          await prisma.user.update({ where: { id: newOrExistingUser.id }, data: { name: derivedName } })
          token.name = derivedName
        }

        if (trigger === 'signIn' || trigger === 'signUp') {
          const cookiesObject = await cookies()
          const sessionBagId  = cookiesObject.get(KEY.SESSION_BAG_ID)?.value
          if (sessionBagId) {
            const sessionBag = await prisma.bag.findFirst({ where: { sessionBagId } })
            if (sessionBag && !sessionBag.userId) {
              await prisma.bag.deleteMany({ where: { userId: newOrExistingUser.id } })
              await prisma.bag.update({ where: { id: sessionBag.id }, data: { userId: newOrExistingUser.id } })
              await invalidateCache(CACHE_KEY.myBagId(sessionBagId))
            }
          }
        }
      } else {
        const lastInvalidatedAt = token.lastInvalidatedAt as number | undefined
        const issuedAt          = typeof token.iat === 'number' ? token.iat * 1000 : undefined
        if (lastInvalidatedAt && issuedAt && issuedAt < lastInvalidatedAt) {
          throw new Error('error.session_stale')
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
