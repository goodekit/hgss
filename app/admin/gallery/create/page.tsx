import { Fragment } from 'react'
import { Metadata } from 'next'
import { en } from 'public/locale'
import { PATH_DIR } from 'hgss-dir'
import { GalleryForm } from 'component/admin'
import { FormBackBtn } from 'component/shared/btn'
import { generateTitle } from 'lib'

export const metadata: Metadata = { title: generateTitle(en.create_product.label, en.admin.label) }

const AdminCreateGalleryPage = () => {
  return (
    <Fragment>
      <FormBackBtn href={PATH_DIR.ADMIN.GALLERY} withLink />
      <h2 className="h2-bold permanent-marker-regular">{en.create_gallery.label}</h2>
      <div className="my-8">
        <GalleryForm type={'create'} />
      </div>
    </Fragment>
  )
}

export default AdminCreateGalleryPage
