import { FC, Fragment } from 'react'
import { Metadata } from 'next'
import { PATH_DIR } from 'hgss-dir'
import { getUserById } from 'lib/action'
import { notFound } from 'next/navigation'
import { UserAccountForm } from 'component/admin'
import { FormBackBtn } from 'component/shared/btn'
import { generateTitle, transl } from 'lib/util'

export const metadata: Metadata = { title: generateTitle(transl('update_product.label'), transl('admin.label')) }

interface AdminUserUpdatePageProps {
  params: Promise<{ id: string }>
}
const AdminUserUpdatePage: FC<AdminUserUpdatePageProps> = async ({ params }) => {
  const { id } = await params
  const user   = await getUserById(id)
  if (!user) return notFound()
  return (
    <Fragment>
        <FormBackBtn href={PATH_DIR.ADMIN.USER} withLink />
        <h1 className={"h2-bold"}>{transl('update_user.label')}</h1>
        <UserAccountForm user={user} />
    </Fragment>
  )
}

export default AdminUserUpdatePage
