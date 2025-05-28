'use client'

import { Fragment, useState, useEffect } from 'react'
import { en } from 'public/locale'
import Image from 'next/image'
import Lightbox, { Slide, Render } from 'yet-another-react-lightbox'
import { Captions, Thumbnails } from 'yet-another-react-lightbox/plugins'
import { ASSET_DIR, PATH_DIR } from 'hgss-dir'
import { FileX2, FolderX, SquarePen, View } from 'lucide-react'
import { Button } from 'component/ui'
import { LinkBtn } from 'component/shared/btn'
import { DeleteDialg } from 'component/shared/dialg'
import { KEY } from 'lib'
import { deleteGallery, deleteGalleryItem } from 'lib/action'

import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'yet-another-react-lightbox/styles.css'

interface GalleryLightboxProps {
  items      : GalleryItem[]
  moduleType?: ModuleType
}

type ThumbnailPositionType = 'bottom' | 'start' | 'end' | 'top' | undefined

export default function GalleryLightbox({ items, moduleType = 'user' }: GalleryLightboxProps) {
    const [index, setIndex] = useState<number | null>(null)
    const [thumbnailProps, setThumbnailProps] = useState({
        border  : 0,
        position: 'end' as ThumbnailPositionType,
        width   : 200,
        height  : 200
    })


    useEffect(() => {
        function handleResize() {
            if (typeof window !== 'undefined' && window.innerWidth < 640) {
              setThumbnailProps({
                border  : 0,
                position: 'bottom',
                width   : 100,
                height  : 100
              })
            } else {
                setThumbnailProps({
                  border  : 0,
                  position: 'end',
                  width   : 200,
                  height  : 200
                })
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
      }, [])


    const slides: Slide[] = items.map((item) => ({
        src        : item.image ? item.image : ASSET_DIR.GALLERY_COVER_DEFAULT,
        title      : item.title,
        description: item.description
    }))

    const sameAlbum              = (itm: GalleryItem) => items.filter((_itm) => _itm.galleryId === itm.galleryId )
    const multipleItemsInAnAlbum = (itm: GalleryItem) => (sameAlbum(itm).length > 1 ? en.delete_album.description_multiple : en.delete_album.description)
    const lastItemInAnAlbum      = (itm: GalleryItem) => (sameAlbum(itm).length <= 1 ? en.delete_image.description_last_image : en.delete_image.description)

  return (
    <Fragment>
      {items?.map(
        (item, i) =>
          item?.image !== '' &&
          (moduleType === KEY.ADMIN ? (
            <div key={i} className="relative group lg:h-[250px] lg:w-[250px] rounded-md shadow-md overflow-hidden">
              <Image
                priority
                src={item?.image}
                alt={item.title}
                loading="eager"
                width={250}
                height={250}
                onClick={() => setIndex(i)}
                className={'h-[250px] w-full object-cover object-center cursor-zoom-in'}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex-col items-center justify-center space-y-2 opacity-0 group-hover:opacity-100 flex transition-opacity">
                <Button size={'sm'} onClick={() => setIndex(i)}>{<View />}</Button>
                <LinkBtn variant={'outline'} href={PATH_DIR.ADMIN.GALLERY_VIEW(item.galleryId)} className={'text-button'} size={'sm'}>{<SquarePen/>}</LinkBtn>
                <DeleteDialg id={item.id} label={<FileX2/>} variant={'destructive'} action={deleteGalleryItem} description={lastItemInAnAlbum(item)} />
                <DeleteDialg id={item.galleryId} label={<FolderX />} variant={'destructive'} action={deleteGallery} description={multipleItemsInAnAlbum(item)} />
              </div>
            </div>
          ) : (
            <Image
              priority
              src={item?.image}
              alt={item.title}
              loading="eager"
              width={250}
              height={250}
              onClick={() => setIndex(i)}
              className={'h-[250px] w-full object-cover object-center cursor-zoom-in'}
            />
          ))
      )}
      {slides && (
        <Lightbox
          open={index !== null}
          close={() => setIndex(null)}
          index={index ?? 0}
          slides={slides}
          plugins={[Captions, Thumbnails]}
          thumbnails={thumbnailProps}
          captions={{ descriptionTextAlign: 'center', showToggle: true, descriptionMaxLines: 3 }}
          render={
            {
              description: ({ description }: { description: string }) => (
                <div className="text-white text-center mt-4 text-sm sm:text-base px-4 max-w-2xl mx-auto font-light tracking-wide">{description}</div>
              )
            } as Render
          }
        />
      )}
    </Fragment>
  )
}
