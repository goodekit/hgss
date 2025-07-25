import { FC } from 'react'
import { en } from 'public/locale'
import { Metadata } from 'next'
import Link from 'next/link'
import { PATH_DIR } from 'hgss-dir'
import { getAllGalleryItems, getGalleryCount } from 'lib/action'
import { Button } from 'component/ui'
import { Pagination, NoResult } from 'component/shared'
import { GalleryLightBox } from 'component/module/gallery'
import { generateTitle, KEY, transl } from 'lib'

export const metadata: Metadata = { title: generateTitle(en.gallery.label, en.admin.label) }

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
    const counts       = await getGalleryCount()
    return (
    <div className={'space-y-2'} suppressHydrationWarning>
        <div className={'flex-between md:mb-5'}>
            <div className={"space-y-4 gap-3"}>
                <h1 className={'h2-bold'}>{en.gallery.label}</h1>
            </div>
            <Button asChild className={'bg-punkpink text-black hover:bg-pink-500 hover:font-bold'}>
                <Link href={PATH_DIR.ADMIN.GALLERY_CREATE}>{transl('create_gallery.label')}</Link>
            </Button>
        </div>
        <div className={'flex-between md:mb-5'}>
            <div className={'space-y-4'}>
                <p className={'text-md'}>{`Albums: ${counts.gallery}`}</p>
                <p className={'text-md'}>{`Images: ${counts.galleryItem}`}</p>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <GalleryLightBox items={galleryItems.data} moduleType={'admin'} />
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