import { GLOBAL } from 'hgss'
import { en } from 'public/locale'
import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'
import sharp from 'sharp'
import { CODE } from 'lib'

const s3 = new S3Client({
  region: GLOBAL.AWS.REGION,
  credentials: {
    accessKeyId    : GLOBAL.AWS.ACCESS_KEY_ID,
    secretAccessKey: GLOBAL.AWS.SECRET_ACCESS_KEY
  }
})

export async function POST(req: NextRequest) {
  const formData   = await req.formData()
  const file       = formData.get('file') as File
  const folderName = (formData.get('folderName') as S3FolderName) || 'upload'

  if (!file) return NextResponse.json({ error: en.error.no_file }, { status: CODE.BAD_REQUEST })

  const allowedFolders = ['product', 'gallery', 'banner']
  if (!allowedFolders.includes(folderName)) {
    return NextResponse.json({ error: 'Invalid folder' }, { status: CODE.BAD_REQUEST })
  }

  const rawBuffer    = Buffer.from(await file.arrayBuffer())
  const fileBuffer   = await sharp(rawBuffer).resize({ width: 1080 }).webp({ quality: 80 }).toBuffer()
  const originalName = file.name.replace(/\.[^/.]+$/, '')
  const fileKey      = `upload/${folderName}/${uuidv4()}-${originalName}.webp`

  await s3.send(
    new PutObjectCommand({
      Bucket     : GLOBAL.AWS.S3_BUCKET_NAME,
      Key        : fileKey,
      Body       : fileBuffer,
      ContentType: GLOBAL.AWS.IMAGE_TYPE
    })
  )

  const publicUrl = GLOBAL.AWS.PUBLIC_URL + fileKey
  return NextResponse.json({ url: publicUrl })
}
