import { getOrderSummary } from 'lib/action/order.action'

jest.mock('lib/cache', () => {
  const cacheMock = jest.fn()
  return {
    cache          : cacheMock,
    invalidateCache: jest.fn()
  }
})

jest.mock('db/prisma', () => ({
  prisma: {
    bag    : { findFirst: jest.fn() },
    order  : {
      count    : jest.fn(),
      aggregate: jest.fn(),
      findMany : jest.fn()
    },
    product: { count: jest.fn() },
    user   : { count: jest.fn() },
    $queryRaw: jest.fn()
  }
}))

const { cache } = jest.requireMock('lib/cache') as { cache: jest.Mock }
const { prisma } = jest.requireMock('db/prisma') as {
  prisma: {
    order  : { count: jest.Mock; aggregate: jest.Mock; findMany: jest.Mock }
    product: { count: jest.Mock }
    user   : { count: jest.Mock }
    $queryRaw: jest.Mock
  }
}

const mockedCache        = cache as jest.Mock
const mockedOrderCount   = prisma.order.count as jest.Mock
const mockedProductCount = prisma.product.count as jest.Mock
const mockedUserCount    = prisma.user.count as jest.Mock
const mockedAggregate    = prisma.order.aggregate as jest.Mock
const mockedQueryRaw     = prisma.$queryRaw as jest.Mock
const mockedFindMany     = prisma.order.findMany as jest.Mock

describe('getOrderSummary', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedCache.mockImplementation(async ({ fetcher }) => fetcher())
  })

  it('aggregates counts, totals, and latest sales data from prisma', async () => {
    mockedOrderCount.mockResolvedValue(12)
    mockedProductCount.mockResolvedValue(7)
    mockedUserCount.mockResolvedValue(3)
    mockedAggregate.mockResolvedValue({ _sum: { totalPrice: 456.78 } })
    mockedQueryRaw.mockResolvedValue([
      { month: '01/25', totalSales: 120 },
      { month: '02/25', totalSales: 80 }
    ])
    mockedFindMany.mockResolvedValue([{ id: 'ord-1' }])

    const summary = await getOrderSummary()

    expect(mockedCache).toHaveBeenCalledWith(expect.objectContaining({
      key: 'cache:orders:summary'
    }))
    expect(summary.count).toEqual({ orders: 12, products: 7, users: 3 })
    expect(summary.totalSales).toEqual({ _sum: { totalPrice: 456.78 } })
    expect(summary.salesData).toEqual([
      { month: '01/25', totalSales: 120 },
      { month: '02/25', totalSales: 80 }
    ])
    expect(summary.latestSales).toEqual([{ id: 'ord-1' }])

    expect(mockedOrderCount).toHaveBeenCalledTimes(1)
    expect(mockedProductCount).toHaveBeenCalledTimes(1)
    expect(mockedUserCount).toHaveBeenCalledTimes(1)
    expect(mockedAggregate).toHaveBeenCalledTimes(1)
    expect(mockedQueryRaw).toHaveBeenCalledTimes(1)
    expect(mockedFindMany).toHaveBeenCalledTimes(1)
  })
})
