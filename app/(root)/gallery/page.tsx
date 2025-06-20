import { FC, Fragment } from 'react'
import { _mockData } from '_mock'
import { getAllGalleryItems } from 'lib/action'
import { NoResult, Pagination } from 'component/shared'
import { PageTitle } from 'component/shared/title'
import { GalleryLightBox } from 'component/module/gallery'
import { KEY, transl } from 'lib'

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
          <PageTitle title={transl('gallery.label')} />
        </div>
        <div className="md:col-span-5 space-y-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryItems.data.length <= 0 && <NoResult data={_mockData.products.length} />}
            <GalleryLightBox items={galleryItems.data}  />
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
