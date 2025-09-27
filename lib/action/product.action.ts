"use server"

import { GLOBAL } from 'hgss'
import { PATH_DIR } from 'hgss-dir'
import { Prisma } from '@prisma/client'
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { prisma } from 'db'
import { revalidatePath } from 'next/cache'
import { cache, invalidateCache } from 'lib/cache'
import { CACHE_KEY, CACHE_TTL } from 'config/cache.config'
import { SystemLogger } from 'lib/app-logger'
import { ProductSchema, UpdateProductSchema } from 'lib/schema'
import { convertToPlainObject, transl } from 'lib/util'
import { KEY, CODE } from 'lib/constant'

const TAG = 'PRODUCT.ACTION'

const s3 = new S3Client({
    region: GLOBAL.AWS.REGION,
    credentials: {
        accessKeyId    : GLOBAL.AWS.ACCESS_KEY_ID,
        secretAccessKey: GLOBAL.AWS.SECRET_ACCESS_KEY
    }
})
/**
 * Deletes a product image from the current list of images by its index.
 *
 * @param currentImages - An array of image URLs representing the current images.
 * @param index - The index of the image to delete in the `currentImages` array.
 * @returns A promise that resolves to an object indicating the success or failure of the operation.
 *
 * The returned object has the following structure:
 * - `success`: A boolean indicating whether the deletion was successful.
 * - `error` (optional): An error object or message if the deletion failed.
 *
 * The function performs the following steps:
 * 1. Extracts the file key from the image URL using `getFileKeyFromUrl`.
 * 2. If the file key is valid, it attempts to delete the file using the `UTApi` service.
 * 3. Returns the result of the deletion operation.
 *
 * If any error occurs during the process, it logs the error and returns a failure response.
 */
export async function deleteProductImage(args: ImageInput) {
  const getFileKeyFromUrl = (url: string) => {
    try {
      const urlParts = url?.split('/')
      const keyParts = urlParts.slice(3)
      return keyParts.join('/')
    } catch (error) {
      console.error(transl('error.failed_extract_file_key'), error)
      return null
    }
  }

  const imageToDelete = 'index' in args ? args?.currentImages[args.index] : args.currentImages
  const fileKey = getFileKeyFromUrl(imageToDelete)

  if (!fileKey) return { success: false, error: transl('error.invalid_file_key') }

    try {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: GLOBAL.AWS.S3_BUCKET_NAME,
          Key   : fileKey
        })
      )
      return { success: true }
    } catch (error) {
      console.error(transl('error.unable_delete'), error)
      return { success: false, error }
    }
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
export async function getAllProducts({ query, limit = GLOBAL.PAGE_SIZE, page, category, price, rating, sort }: AppProductsAction<number>) {
  return cache({
    key    : CACHE_KEY.products(page),
    ttl    : CACHE_TTL.products,
    fetcher: async () => {
      const queryFilter: Prisma.ProductWhereInput = query && query       !== KEY.ALL ? { name: { contains: query, mode: 'insensitive' } as Prisma.StringFilter } : {}
      const categoryFilter                        = category && category !== KEY.ALL ? { category } : {}
      const priceFilter: Prisma.ProductWhereInput = price && price       !== KEY.ALL ? { price: { gte: Number(price.split('-')[0]), lte: Number(price.split('-')[1]) } } : {}
      const ratingFilter                          = rating && rating     !== KEY.ALL ? { rating: { gte: Number(rating) } } : {}

      const data = await prisma.product.findMany({
        where: { ...queryFilter, ...categoryFilter, ...priceFilter, ...ratingFilter },
        orderBy:
          sort === KEY.LOWEST
            ? { price: 'asc' }
            : sort === KEY.HIGHEST
              ? { price: 'desc' }
              : sort === KEY.RATING
                ? { rating: 'desc' }
                : { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      })
      const count = await prisma.product.count({ where: { ...queryFilter } })

      const summary = { data, totalPages: Math.ceil(count / limit) }
      return convertToPlainObject(summary)
    }
  })
}

  /**
 * Retrieves a product by its slug.
 *
 * @param {string} slug - The slug of the product to retrieve.
 * @returns {Promise<Product | null>} A promise that resolves to the product if found, or null if not found.
 */
export async function getProductBySlug(slug: string) {
   return cache({
     key    : CACHE_KEY.productBySlug(slug),
     ttl    : CACHE_TTL.productBySlug,
     fetcher: async () => {
       const data = await prisma.product.findFirst({ where: { slug } })
       return data
     }
   })
  }

  export async function getProductById(productId: string) {
    return cache({
      key    : CACHE_KEY.productById(productId),
      ttl    : CACHE_TTL.productById,
      fetcher: async () => {
        const data = await prisma.product.findFirst({ where: { id: productId } })
        return convertToPlainObject(data)
      }
    })
  }

/**
 * Retrieves all product categories along with the count of products in each category.
 *
 * @returns {Promise<Array<{ category: string, _count: number }>>} A promise that resolves to an array of objects,
 * each containing a category and the count of products in that category.
 */
export async function getAllCategories() {
  return cache({
    key    : CACHE_KEY.categories,
    ttl    : CACHE_TTL.categories,
    fetcher: async () => {
      const products = await prisma.product.groupBy({ by: ['category'], _count: true })
      return products
    }
  })
}

/**
 * Creates a new product using the provided data.
 *
 * @param {CreateProduct} data - The data for the new product.
 * @returns {Promise<any>} The created product or an error response.
 *
 * @throws {AppError} If there is an error during product creation.
 */
export async function createProduct(data: CreateProduct) {
  try {
    const product    = ProductSchema.omit({ __submitted: true }).parse(data)
    const newProduct = await prisma.product.create({ data: product })
    await invalidateCache(CACHE_KEY.productById(newProduct.id))
    revalidatePath(PATH_DIR.ADMIN.PRODUCT)
    return SystemLogger.response(transl('success.product_created'), CODE.CREATED, TAG, '', product)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}


/**
 * Updates an existing product in the database.
 *
 * @param {UpdateProduct} data - The data to update the product with.
 * @returns {Promise<SystemLogger>} - A promise that resolves to a SystemLogger response.
 * @throws {Error} - Throws an error if the product is not found or if there is a validation error.
 */
export async function updateProduct(data:UpdateProduct) {
  try {
    const product       = UpdateProductSchema.omit({ __submitted: true }).parse(data)
    const productExists = await prisma.product.findFirst({ where: { id: product.id }})
    if (!productExists) throw new Error(transl('error.product_not_found'))

    const updatedProduct = await prisma.product.update({ where: {id: product.id }, data: product })
    await invalidateCache(CACHE_KEY.productById(updatedProduct.id))
    revalidatePath(PATH_DIR.ADMIN.PRODUCT)
    return SystemLogger.response(transl('success.product_updated'), CODE.OK, TAG, '', product)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

/**
 * Deletes a product by its ID.
 *
 * @param {string} productId - The ID of the product to delete.
 * @returns {Promise<SystemLogger>} - The result of the deletion operation.
 * @throws {Error} - Throws an error if the product is not found.
 */
export async function deleteProduct(productId: string) {
  try {
    await prisma.product.delete({ where: { id: productId } })
    await invalidateCache(CACHE_KEY.productById(productId))
    revalidatePath(PATH_DIR.ADMIN.PRODUCT)
    return SystemLogger.response(transl('success.product_deleted'), CODE.OK, TAG)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}