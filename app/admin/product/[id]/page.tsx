import { FC, Fragment } from 'react'
import { Metadata } from 'next'
import { PATH_DIR } from 'hgss-dir'
import { notFound } from 'next/navigation'
import { getProductById } from 'lib/action'
import { ProductForm } from 'component/admin'
import { FormBackBtn } from 'component/shared/btn'
import { generateTitle, transl } from 'lib'

export const metadata: Metadata = { title: generateTitle(transl('update_product.label'), transl('admin.label')) }

interface AdminProductUpdatePageProps { params: Promise<{ id: string }> }
const AdminProductUpdatePage: FC<AdminProductUpdatePageProps> = async ({ params }) => {
  const { id }  = await params
  const product = await getProductById(id)
  if (!product) return notFound()
  return (
    <Fragment>
      <FormBackBtn href={PATH_DIR.ADMIN.PRODUCT} withLink />
      <h1 className={"h2-bold permanent-marker-regular"}>{transl('update_product.label')}</h1>
      <ProductForm type={'update'} product={product} productId={product.id} />
    </Fragment>
  )
}

export default AdminProductUpdatePage
