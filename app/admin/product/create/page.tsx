import { Fragment } from 'react'
import { Metadata } from 'next'
import { PATH_DIR } from 'hgss-dir'
import { ProductForm } from 'component/admin'
import { FormBackBtn } from 'component/shared/btn'
import { generateTitle, transl } from 'lib'

export const metadata: Metadata = { title: generateTitle(transl('create_product.label'), transl('admin.label')) }

const AdminCreateProductPage = () => {
  return (
    <Fragment>
      <FormBackBtn href={PATH_DIR.ADMIN.PRODUCT} withLink />
      <h2 className={"h2-bold permanent-marker-regular"}>{transl('create_product.label')}</h2>
      <div className={"my-8"}>
        <ProductForm type={'create'} />
      </div>
    </Fragment>
  )
}

export default AdminCreateProductPage
