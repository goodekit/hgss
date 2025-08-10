'use server'

import { GLOBAL } from 'hgss'
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { transl } from "lib/util"


const s3 = new S3Client({
  region: GLOBAL.AWS.REGION,
  credentials: {
    accessKeyId    : GLOBAL.AWS.ACCESS_KEY_ID,
    secretAccessKey: GLOBAL.AWS.SECRET_ACCESS_KEY
  }
})

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
export async function deleteImage(args: ImageInput) {
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