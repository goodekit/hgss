"use server"

import { PrismaClient } from '@prisma/client'
import { Prisma } from '@prisma/client'
import { GLOBAL } from 'hgss'
import { convertToPlainObject } from 'lib/util'
import { KEY } from 'lib/constant'

const TAG = 'PRODUCT.ACTION'

/**
 * Fetches the latest products from the database.
 *
 * This function retrieves a specified number of the most recently created products
 * from the database, ordered by their creation date in descending order.
 *
 * @returns {Promise<object[]>} A promise that resolves to an array of plain objects
 * representing the latest products.
 */
export async function getProducts() {
    const prisma = new PrismaClient()
    const data = await prisma.product.findMany({ take: GLOBAL.LATEST_PRODUCT_QUANTITY, orderBy: { createdAt: 'desc' }})

    return convertToPlainObject(data)
}


/**
 * Retrieves a paginated list of products from the database.
 *
 * @param {Object} params - The parameters for retrieving products.
 * @param {string} params.query - The search query for filtering products.
 * @param {number} [params.limit=GLOBAL.PAGE_SIZE] - The number of products to retrieve per page.
 * @param {number} params.page - The current page number.
 * @param {string} params.category - The category to filter products by.
 * @returns {Promise<Object>} A promise that resolves to an object containing the product data and total pages.
 * @property {Array} data - The list of products.
 * @property {number} totalPages - The total number of pages.
 */
// export async function getAllProducts({ query, limit = GLOBAL.PAGE_SIZE, page, category, price, rating, sort }: AppProductsAction<number>) {
//     const queryFilter: Prisma.ProductWhereInput =
//     query && query !== KEY.ALL
//       ? { name: { contains: query, mode: 'insensitive' } as Prisma.StringFilter }
//       : {}
//     const categoryFilter                       = category && category !== KEY.ALL ? { category } : {}
//     const priceFilter:Prisma.ProductWhereInput = price && price       !== KEY.ALL ? { price: { gte: Number(price.split('-')[0]),  lte: Number(price.split('-')[1]) } } : {}
//     const ratingFilter                         = rating && rating     !== KEY.ALL ? { rating: { gte: Number(rating)} } : {}

//     const data = await prisma.product.findMany({
//       where  : { ...queryFilter, ...categoryFilter, ...priceFilter, ...ratingFilter },
//       orderBy: sort === KEY.LOWEST ? { price: 'asc' } : sort === KEY.HIGHEST ? { price : 'desc' } : sort === KEY.RATING ? { rating: 'desc' } : { createdAt: 'desc' },
//       skip   : (page - 1) * limit,
//       take   : limit
//     })
//     const count = await prisma.product.count({ where: { ...queryFilter }})

//     const summary = { data, totalPages: Math.ceil(count / limit) }
//     return summary
//   }