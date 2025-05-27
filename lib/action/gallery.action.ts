'use server'

import { en } from 'public/locale'
import { GLOBAL } from 'hgss'
import { PATH_DIR } from 'hgss-dir'
import { Prisma } from '@prisma/client'
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { prisma } from 'db'
import { revalidatePath } from 'next/cache'
import { SystemLogger } from 'lib/app-logger'
import { GalleryItemSchema, GallerySchema, UpdateGalleryItemSchema, UpdateGallerySchema } from 'lib/schema'
import { convertToPlainObject } from 'lib/util'
import { KEY, CODE } from 'lib/constant'

const TAG = 'GALLERY.ACTION'

const s3 = new S3Client({
  region: GLOBAL.AWS.REGION,
  credentials: {
    accessKeyId: GLOBAL.AWS.ACCESS_KEY_ID,
    secretAccessKey: GLOBAL.AWS.SECRET_ACCESS_KEY
  }
})

/**
 * Fetches the latest galleries from the database.
 *
 * This function retrieves a specified number of the most recently created galleries
 * from the database, ordered by their creation date in descending order.
 *
 * @returns {Promise<object[]>} A promise that resolves to an array of plain objects
 * representing the latest galleries.
 */
export async function getAllGallery({ limit = GLOBAL.PAGE_SIZE_GALLERY, page, query, category, sort }: AppDocumentsFilters) {
  const queryFilter: Prisma.GalleryWhereInput =
    query && query !== KEY.ALL
      ? {
          OR: [{ title: { contains: query, mode: 'insensitive' } as Prisma.StringFilter }]
        }
      : {}

  const categoryFilter = category && category !== KEY.ALL ? { category } : {}
  const gallery        = await prisma.gallery.findMany({
    where  : { ...queryFilter, ...categoryFilter },
    orderBy: sort === KEY.NEWEST ? { createdAt: 'desc' }: { createdAt: 'asc' },
    skip   : (page - 1) * limit,
    take   : limit
  })
  const count   = await prisma.gallery.count({ where: { ...queryFilter } })
  const summary = { data: gallery, totalPages: Math.ceil(count / limit) }
  return convertToPlainObject(summary)
}

export async function getGalleryById(galleryId: string) {
  const gallery = await prisma.gallery.findFirst({ where: { id: galleryId } })
  if (!gallery) throw new Error(en.error.not_found)
  return convertToPlainObject(gallery)
}

/**
 * Fetches the latest gallery items from the database.
 *
 * This function retrieves a specified number of the most recently created gallery items
 * from the database, ordered by their creation date in descending order.
 *
 * @returns {Promise<object[]>} A promise that resolves to an array of plain objects
 * representing the latest galleries.
 */
export async function getAllGalleryItems({ limit = GLOBAL.PAGE_SIZE_GALLERY, page, query, sort, category }: AppDocumentsFilters) {
  const queryFilter: Prisma.GalleryItemWhereInput =
    query && query !== KEY.ALL
      ? {
          OR: [{ title: { contains: query, mode: 'insensitive' } as Prisma.StringFilter }]
        } : {}

  const categoryFilter = category && category !== KEY.ALL ? { category }: {}
  const galleryItems   = await prisma.galleryItem.findMany({
    where  : { ...queryFilter, ...categoryFilter },
    orderBy: sort === KEY.NEWEST ? { createdAt: 'desc' }: { createdAt: 'asc' },
    skip   : (page - 1) * limit,
    take   : limit
  })
  const count   = await prisma.galleryItem.count({ where: { ...queryFilter } })
  const summary = { data: galleryItems, totalPages: Math.ceil(count / limit) }
  return convertToPlainObject(summary)
}

export async function getGalleryItemById(galleryItemId: string) {
  const galleryItem = await prisma.galleryItem.findFirst({ where: { id: galleryItemId } })
  if (!galleryItem) throw new Error(en.error.not_found)
  return convertToPlainObject(galleryItem)
}

/**
 * Creates a new gallery item using the provided data.
 *
 * @param {CreateGalleryItem} data - The data for the new gallery item.
 * @returns {Promise<any>} The created product or an error response.
 *
 * @throws {AppError} If there is an error during gallery item creation.
 */
export async function createGalleryItem(data: CreateGalleryItem) {
  try {
    let galleryId = data.galleryId

    if (!galleryId) {
      const newGallery = await prisma.gallery.create({
        data: {
          title      : 'Untitled Gallery',
          description: 'Auto-created gallery',
          cover      : 'default.jpg'
        }
      })
      galleryId = newGallery.id
    }
    const { title, description, image } = GalleryItemSchema.parse({ ...data, galleryId })
    const galleryItem = await prisma.galleryItem.create({ data: { title, description, image, gallery: { connect: { id: data.galleryId } } } })
    revalidatePath(PATH_DIR.ADMIN.GALLERY)
    return SystemLogger.response(en.success.created, CODE.CREATED, TAG, '', galleryItem)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

/**
 * Creates a new gallery using the provided data.
 *
 * @param {CreateGalleryItem} data - The data for the new gallery.
 * @returns {Promise<any>} The created product or an error response.
 *
 * @throws {AppError} If there is an error during gallery creation.
 */
export async function createGallery(data: CreateGallery) {
  try {
    const parsed                    = GallerySchema.parse(data)
    const { galleryItems, ...rest } = parsed

    const newGallery = await prisma.gallery.create({
      data: {
        ...rest,
        ...(galleryItems && {
          galleryItems: {
            create: galleryItems.map(({ title, description, image }) => ({
              title,
              description,
              image
            }))
          }
        })
      }
    })

    if (!galleryItems || galleryItems.length === 0) {
      throw new Error('At least one gallery item must be provided')
    }

    revalidatePath(PATH_DIR.ADMIN.GALLERY)

    return SystemLogger.response(en.success.created, CODE.CREATED, TAG, '', newGallery)
  } catch (error) {
    console.error('Gallery creation failed: ', error)
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

/**
 * Updates an existing gallery in the database.
 *
 * @param {UpdateGallery} data - The data to update the gallery with.
 * @returns {Promise<SystemLogger>} - A promise that resolves to a SystemLogger response.
 * @throws {Error} - Throws an error if the gallery is not found or if there is a validation error.
 */
export async function updateGallery(data: UpdateGallery) {
  try {
    const parsed                                      = UpdateGallerySchema.parse(data)
    const { title, description, cover, galleryItems } = parsed
    const galleryExists                               = await prisma.gallery.findFirst({ where: { id: parsed.id } })
    if (!galleryExists) throw new Error(en.error.not_found)

    await prisma.gallery.update({
      where: { id: parsed.id },
      data: {
        title,
        description,
        cover,
        ...(galleryItems && {
          galleryItems: {
            upsert: galleryItems.map(item => ({
              where : { id: item.id || '' },
              update: { title: item.title, description: item.description, image: item.image },
              create: { title: item.title, description: item.description, image: item.image }
            }))
          }
        })
      }
    })
    revalidatePath(PATH_DIR.ADMIN.GALLERY)
    return SystemLogger.response(en.success.updated, CODE.OK, TAG, '', parsed)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

/**
 * Updates an existing gallery item in the database.
 *
 * @param {UpdateGalleryItem} data - The data to update the gallery item with.
 * @returns {Promise<SystemLogger>} - A promise that resolves to a SystemLogger response.
 * @throws {Error} - Throws an error if the gallery item is not found or if there is a validation error.
 */
export async function updateGalleryItem(data: UpdateGalleryItem) {
  try {
    const parsed       = UpdateGalleryItemSchema.parse(data)
    const { title, description, image } = parsed
    const galleryItemExists = await prisma.galleryItem.findFirst({ where: { id: parsed.id } })
    if (!galleryItemExists) throw new Error(en.error.not_found)

    await prisma.galleryItem.update({ where: { id: parsed.id }, data: { title, description, image } })
    revalidatePath(PATH_DIR.ADMIN.GALLERY)
    return SystemLogger.response(en.success.updated, CODE.OK, TAG, '', parsed)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}



type ImageArr = { currentImages: string[]; index: number }
type ImageSolo = { currentImages: string }
type ImageInput = ImageArr | ImageSolo

export async function deleteGalleryItemImage(args: ImageInput) {
  const getFileKeyFromUrl = (url: string) => {
    try {
      const urlParts = url?.split('/')
      const keyParts = urlParts.slice(3)
      return keyParts.join('/')
    } catch (error) {
      console.error(en.error.failed_extraction_file_key, error)
      return null
    }
  }

  const imageToDelete = 'index' in args ? args.currentImages[args.index] : args.currentImages
  const fileKey = getFileKeyFromUrl(imageToDelete)

  if (!fileKey) return { succes: false, error: en.error.invalid_file_key }
  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: GLOBAL.AWS.S3_BUCKET_NAME,
        Key: fileKey
      })
    )
    return { success: true }
  } catch (error) {
    console.error(en.error.unable_delete, error)
    return { success: false, error }
  }
}

export async function deleteGalleryItem(galleryItemId: string) {
  try {
    const item = await prisma.galleryItem.findFirst({ where: { id: galleryItemId }})
    if (!item) throw new Error(en.error.not_found)
    await prisma.galleryItem.delete({ where: { id: galleryItemId } })

    const remainingItems = await prisma.galleryItem.count({ where: { galleryId: item.galleryId }})
    if (remainingItems === 0) {
      await prisma.gallery.delete({ where: { id: item.galleryId }})
    }

    revalidatePath(PATH_DIR.ADMIN.GALLERY)
    return SystemLogger.response(en.success.deleted, CODE.OK, TAG)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

export async function deleteGallery(galleryId: string) {
  try {
    await prisma.gallery.delete({ where: { id: galleryId } })
    revalidatePath(PATH_DIR.ADMIN.GALLERY)
    return SystemLogger.response(en.success.deleted, CODE.OK, TAG)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

/**
 * Deletes a gallery image from the current list of images by its index or by its address.
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
export async function deleteGalleryImage(args: ImageInput) {
  const getFileKeyFromUrl = (url: string) => {
    try {
      const urlParts = url?.split('/')
      const keyParts = urlParts.slice(3)
      return keyParts.join('/')
    } catch (error) {
      console.error(en.error.failed_extract_file_key, error)
      return null
    }
  }

  const imageToDelete = 'index' in args ? args?.currentImages[args.index] : args.currentImages
  const fileKey = getFileKeyFromUrl(imageToDelete)

  if (!fileKey) return { success: false, error: en.error.invalid_file_key }

    try {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: GLOBAL.AWS.S3_BUCKET_NAME,
          Key   : fileKey
        })
      )
      return { success: true }
    } catch (error) {
      console.error(en.error.unable_delete, error)
      return { success: false, error }
    }
}