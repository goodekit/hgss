import { Fragment } from 'react'
import { Metadata } from 'next'
import { PATH_DIR } from 'hgss-dir'
import { auth } from 'auth'
import { getMyBag, getUserById } from 'lib/action'
import { redirect } from 'next/navigation'
import { PurchaseFlow } from 'component/shared/custom'
import ShippingAddressForm from './shipping-address-form'
import { transl } from 'lib'

export const metadata: Metadata = { title: transl('shipping_address.label') }

const ShippingPage = async () => {
    const bag = await getMyBag()
    if (!bag || bag.items.length === 0) redirect(PATH_DIR.BAG)
    const session = await auth()
    const userId  = session?.user?.id
    if (!userId) throw new Error('no UserId')
    const user    = await getUserById(userId)
  return (
    <Fragment>
      <PurchaseFlow current={1} />
      <ShippingAddressForm address={user.address as ShippingAddress} userName={user.name ?? ''} />
    </Fragment>
  )
}

export default ShippingPage
