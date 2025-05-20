'use client'

import { Fragment, useState, useEffect } from 'react'
import Image from 'next/image'
import Lightbox, { Slide, Render } from 'yet-another-react-lightbox'
import { Captions, Thumbnails } from 'yet-another-react-lightbox/plugins'
import { ASSET_DIR } from 'hgss-dir'

import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'yet-another-react-lightbox/styles.css'

interface GalleryLightboxProps {
  items: GalleryItem[]
}

type ThumbnailPositionType = 'bottom' | 'start' | 'end' | 'top' | undefined

export default function GalleryLightbox({ items }: GalleryLightboxProps) {
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

  return (
    <Fragment>
      {items?.map(
        (item, i) =>
          item?.image !== '' && (
            <Image
              key={i}
              src={item?.image}
              alt={item.title}
              loading="eager"
              width={250}
              height={250}
              onClick={() => setIndex(i)}
              className={'h-[250px] w-[250px] object-cover object-center cursor-zoom-in rounded-md shadow-md'}
            />
          )
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
