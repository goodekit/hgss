import { FC } from 'react'
import { en } from 'public/locale'
import { _mockData } from '_mock'
import { Metadata } from 'next'
import Link from 'next/link'
import { PATH_DIR } from 'hgss-dir'
import { generateTitle, KEY } from 'lib'
import { getAllGalleryItems } from 'lib/action'
import { Button } from 'component/ui'
import { Pagination, NoResult } from 'component/shared'
import { GalleryLightBox } from 'component/module/gallery'
import { PageTitle } from 'component/admin'

export const metadata: Metadata = { title: generateTitle(en.product.products.label, en.admin.label) }

const DEFAULT_QUERY = 'all'
interface AdminGalleryPageProps {
    searchParams: Promise<AppSearchPage<string>>
}
const AdminGalleryPage: FC<AdminGalleryPageProps> = async ({ searchParams }) => {
    const {
      query    = DEFAULT_QUERY,
      category = DEFAULT_QUERY,
      sort     = KEY.NEWEST,
      page     = '1'
    }          = await searchParams
    const galleryItems = await getAllGalleryItems({ query, category, sort, page: Number(page) })
    return (
    <div className={'space-y-2'} suppressHydrationWarning>
        <div className={'flex-between'}>
            <PageTitle query={query} title={en.gallery.label} href={PATH_DIR.ADMIN.PRODUCT} />
            <Button asChild className={'text-black'}>
                <Link href={PATH_DIR.ADMIN.GALLERY_CREATE}>{en.create_gallery.label}</Link>
            </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryItems.data.length <= 0 && <NoResult data={_mockData.products.length} />}
            <GalleryLightBox items={galleryItems.data} />
        </div>
        <NoResult data={galleryItems.totalPages} />
        {galleryItems.totalPages > 1 && (
            <div className="mt-5 flex justify-end">
                <Pagination page={Number(page) || 1} totalPages={galleryItems.totalPages}/>
            </div>
        )}
    </div>
    );
}

export default AdminGalleryPage