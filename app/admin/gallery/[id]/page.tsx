import { FC, Fragment } from 'react'
import { Metadata } from 'next'
import { en } from 'public/locale'
import { PATH_DIR } from 'hgss-dir'
import { notFound } from 'next/navigation'
import { getGalleryById } from 'lib/action'
import { GalleryForm } from 'component/admin'
import { FormBackBtn } from 'component/shared/btn'
import { generateTitle } from 'lib'

export const metadata: Metadata = { title: generateTitle(en.update_product.label, en.admin.label) }

interface AdminUpdateGalleryPageProps {
  params: Promise<{ id: string }>
}
const AdminUpdateGalleryPage: FC<AdminUpdateGalleryPageProps> = async ({ params }) => {
  const { id } = await params
  const gallery = await getGalleryById(id)
  if (!gallery) return notFound()
  return (
    <Fragment>
      <FormBackBtn href={PATH_DIR.ADMIN.GALLERY} withLink />
      <h1 className="h2-bold permanent-marker-regular">{en.update_gallery.label}</h1>
      <GalleryForm type={'update'} gallery={gallery} galleryId={gallery.id} />
    </Fragment>
  )
}

export default AdminUpdateGalleryPage
