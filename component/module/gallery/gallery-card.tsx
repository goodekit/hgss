'use client'

import { FC } from 'react'
import { PATH_DIR } from 'hgss-dir'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardHeader, CardContent } from 'component/ui'
import { cn } from 'lib'

interface GalleryCardProps {
  galleryItem  : GalleryItem
  fallbackPhoto: string
}

const GalleryCard: FC<GalleryCardProps> = ({ galleryItem, fallbackPhoto }) => {
  return (
    <Card className={'w-full max-w-sm sm:max-w-screen-sm special-elite align-middle m-auto border-2 rounded-md cursor-pointer -rotate-1 hover:rotate-0 transform transition-all duration-300 shadow'}>
      <CardHeader className="p-0 items-center">
        <Link href={PATH_DIR.PRODUCT_VIEW(galleryItem.id)}>
          <Image
            src={galleryItem?.image ? galleryItem?.image : fallbackPhoto}
            alt={galleryItem.title}
            height={300}
            width={300}
            className={'object-cover object-center h-[250px] w-[250px]'}
            priority
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className={cn('text-brand')}>{galleryItem.title}</div>
        <Link href={PATH_DIR.PRODUCT_VIEW(galleryItem.id)}>
          <h2 className={"text-sm font-medium"}>{galleryItem.description}</h2>
        </Link>
      </CardContent>
    </Card>
  )
}

export default GalleryCard
