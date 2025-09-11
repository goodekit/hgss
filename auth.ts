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
      if (session?.user?.id) {
        const exists = await prisma.user.findUnique({ where: { id: session.user.id } })
        if (!exists) {
          (await cookies()).delete('next-auth.session-token')
          throw new Error('Session is stale, please log in again')
        }
      }

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
        token.id                = newOrExistingUser.id
        token.sub               = newOrExistingUser.id
        token.role              = newOrExistingUser.role
        token.name              = newOrExistingUser.name
        token.lastInvalidatedAt = newOrExistingUser.lastInvalidatedAt.getTime()

        if (account) {
          token.provider = account.provider
        }

        if (token?.id) {
          const userFromToken = await prisma.user.findUnique({
            where : { id: token.id },
            select: { lastInvalidatedAt: true }
          })

          if (!userFromToken) {
            throw new Error(transl('error.user_not_found_reauth'))
          }

          const tokenIssuedAt   = (token.iat as number) * 1000
          const lastInvalidated = userFromToken.lastInvalidatedAt.getTime()

          if (tokenIssuedAt < lastInvalidated) {
            throw new Error('error.session_stale')
          }

          if (newOrExistingUser.name === 'NO_NAME') {
            const name = newOrExistingUser.email!.split('@')[0]
            await prisma.user.update({ where: { id: newOrExistingUser.id }, data: { name } })
            token.name = name
          }

          if (trigger === 'signIn' || trigger === 'signUp') {
            const cookiesObject = await cookies()
            const sessionBagId  = cookiesObject.get(KEY.SESSION_BAG_ID)?.value
            if (sessionBagId) {
              const sessionBag = await prisma.bag.findFirst({ where: { sessionBagId } })
              if (sessionBag && !sessionBag.userId) {
              // only update the session bag if it is not already associated with a user
              // ensures that bags already linked to a user are intentionally left unchanged
                await prisma.bag.deleteMany({ where: { userId: newOrExistingUser.id } })
                await prisma.bag.update({ where: { id: sessionBag.id }, data: { userId: newOrExistingUser.id } })
                await invalidateCache(CACHE_KEY.myBagId(sessionBagId))
              }
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
