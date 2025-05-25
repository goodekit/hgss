import { FC, Fragment } from 'react'
import { Metadata } from 'next'
import { en } from 'public/locale'
import { PATH_DIR } from 'hgss-dir'
import { notFound } from 'next/navigation'
import { getProductById } from 'lib/action'
import { ProductForm } from 'component/admin'
import { FormBackBtn } from 'component/shared/btn'
import { generateTitle } from 'lib'

export const metadata: Metadata = { title: generateTitle(en.update_product.label, en.admin.label) }

interface AdminUpdateGalleryPageProps {
  params: Promise<{ id: string }>
}
const AdminUpdateGalleryPage: FC<AdminUpdateGalleryPageProps> = async ({ params }) => {
  const { id } = await params
  const product = await getProductById(id)
  if (!product) return notFound()
  return (
    <Fragment>
      <FormBackBtn href={PATH_DIR.ADMIN.PRODUCT} withLink />
      <h1 className="h2-bold permanent-marker-regular">{en.update_product.label}</h1>
      <ProductForm type={'update'} product={product} productId={product.id} />
    </Fragment>
  )
}

export default AdminUpdateGalleryPage
