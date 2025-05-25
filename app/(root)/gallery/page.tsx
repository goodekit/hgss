import { FC, Fragment } from 'react'
import { en } from 'public/locale'
import { PATH_DIR } from 'hgss-dir'
import Link from 'next/link'
import { _mockData } from '_mock'
import { KEY } from 'lib'
import { getAllGalleryItems } from 'lib/action'
import { NoResult, Pagination } from 'component/shared'
import { PageTitle } from 'component/admin'
import { Button } from 'component/ui'
import { GalleryLightBox } from 'component/module/gallery'

const DEFAULT_QUERY = 'all'
interface GalleryPageProps {
  searchParams: Promise<AppSearchPage<string>>
}

const GalleryPage: FC<GalleryPageProps> = async ({ searchParams }) => {
  const {
  query    = DEFAULT_QUERY,
  category = DEFAULT_QUERY,
  sort     = KEY.NEWEST,
  page     = '1'
  }        = await searchParams
  const galleryItems = await getAllGalleryItems({ query, category, sort, page: Number(page) })

  return (
    <Fragment>
      <div className="grid md:grid-cols-5 md:gap-5">
        <div className={'flex-between'}>
          <PageTitle query={query} title={en.product.products.label} href={PATH_DIR.ADMIN.PRODUCT} />
          <Button asChild className={'bg-punkpink text-black'}>
            <Link href={PATH_DIR.ADMIN.GALLERY_CREATE}>{en.create_gallery.label}</Link>
          </Button>
        </div>
        <div className="md:col-span-5 space-y-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryItems.data.length <= 0 && <NoResult data={_mockData.products.length} />}
            <GalleryLightBox items={galleryItems.data} />
          </div>
          {galleryItems.totalPages > 1 && (
            <div className={'mt-5 flex justify-end'}>
              <Pagination page={Number(page) || 1} totalPages={galleryItems?.totalPages} />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default GalleryPage
