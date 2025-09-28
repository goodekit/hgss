import type { Session } from 'next-auth'
import { getMyBagCount } from 'lib/action/bag.action'

jest.mock('auth', () => ({
  auth: jest.fn()
}))

jest.mock('next/headers', () => ({
  cookies: jest.fn()
}))

jest.mock('db/prisma', () => ({
  prisma: {
    bag: {
      findFirst: jest.fn()
    },
    order    : {},
    product  : {},
    user     : {},
    $queryRaw: jest.fn()
  }
}))

const { auth }    = jest.requireMock('auth') as { auth: jest.Mock }
const { cookies } = jest.requireMock('next/headers') as { cookies: jest.Mock }
const { prisma }  = jest.requireMock('db/prisma') as { prisma: { bag: { findFirst: jest.Mock } } }

const mockedAuth      = auth
const mockedCookies   = cookies
const mockedFindFirst = prisma.bag.findFirst

const createCookieStore = (bagId = 'bag-123') => ({
  get: jest.fn().mockReturnValue({ value: bagId })
})

describe('getMyBagCount', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedCookies.mockResolvedValue(createCookieStore())
  })

  it('uses provided session to fetch bag items and skips extra auth lookups', async () => {
    const session = { user: { id: 'user-42' } } as unknown as Session
    mockedFindFirst.mockResolvedValue({ items: [{ qty: 2 }, { qty: 3 }] })

    const count = await getMyBagCount(session)

    expect(count).toBe(5)
    expect(mockedFindFirst).toHaveBeenCalledWith({
      where : { userId: 'user-42' },
      select: { items: true }
    })
    expect(mockedAuth).not.toHaveBeenCalled()
  })

  it('falls back to session bag id when no authenticated user is present', async () => {
    mockedAuth.mockResolvedValue(null)
    mockedFindFirst.mockResolvedValue({ items: [{ qty: 4 }] })

    const count = await getMyBagCount()

    expect(mockedAuth).toHaveBeenCalledTimes(1)
    expect(mockedFindFirst).toHaveBeenCalledWith({
      where : { sessionBagId: 'bag-123' },
      select: { items: true }
    })
    expect(count).toBe(4)
  })

  it('returns zero when no bag is found for the request context', async () => {
    mockedAuth.mockResolvedValue(null)
    mockedFindFirst.mockResolvedValue(null)

    const count = await getMyBagCount()

    expect(count).toBe(0)
  })
})
