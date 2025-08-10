'use client'

import { FC, Fragment, useTransition } from 'react'
import { PATH_DIR } from 'hgss-dir'
import { useRouter } from 'next/navigation'
import { useToast } from 'hook'
import { addItemToBag, removeItemFromBag } from 'lib/action'
import { Table, Card, CardContent, Badge } from 'component/ui'
import { EllipsisLoader } from 'component/shared/loader'
import { TapeBtn, LinkBtn } from 'component/shared/btn'
import { BagTableHead, BagTableBody } from 'component/shared/bag'
import { formatCurrency, transl } from 'lib/util'

interface BagTableProps {
  bag: Bag
}

const BagTable: FC<BagTableProps> = ({ bag }) => {
  const [isPending, startTransition] = useTransition()
  const { toast }                    = useToast()
  const router                       = useRouter()

  const subtotal = bag  && bag.items.reduce((acc, item) => acc + item.qty, 0)

  const handleRemoveItem = async (item: BagItem) => {
    startTransition(async () => {
      const response = await removeItemFromBag(item.productId)
      if (!response.success) {
        toast({ variant: 'destructive', description: response.message })
      }
    })
  }

  const handleAddItem = async (item: BagItem) => {
    startTransition(async () => {
      const response = await addItemToBag(item)
      if (!response.success) {
        toast({ variant: 'destructive', description: response.message })
      }
    })
  }

  const handleNavigateCheckout = () => {
    startTransition(async () => router.push(PATH_DIR.SHIPPING))
  }

  return (
    <Fragment>
      <h1 className={"py-4 h2-bold"}>{transl('your_bag.label')}</h1>
      {!bag || bag.items.length === 0 ? (
        <div className={'special-elite'}>
          {transl('bag_empty')} <LinkBtn href={PATH_DIR.ROOT} variant={'secondary'}>{transl('go_shopping')}</LinkBtn>
        </div>
      ) : (
        <div className={"grid md:grid-cols-4 md:gap-5 special-elite"}>
          <div className={"overflow-x-auto md:col-span-3"}>
            <Table>
              <BagTableHead />
              <BagTableBody bagItems={bag.items} isPending={isPending} handleMinus={handleRemoveItem} handlePlus={handleAddItem} withQtyController />
            </Table>
          </div>
          <Card className={"rounded-sm shadow-none border-none"}>
            <CardContent className={"space-y-8"}>
              <div className={"text-xl justify-between flex"}>
                <div>
                  {transl('subtotal.label')} &nbsp;
                  <Badge variant={'outline'} className="text-md">
                    {subtotal}
                  </Badge>
                  &nbsp;&nbsp;
                </div>
                <span className={"font-bold"}> {formatCurrency(bag.itemsPrice)}</span>
              </div>
              <TapeBtn textSize={'text-lg'} className={'w-full texture-4-bg'} disabled={isPending} onClick={handleNavigateCheckout} type={'button'} label=  {isPending ? <EllipsisLoader /> : ( <span> {'->'} {transl('proceed_to_checkout.label')}</span>)} />
            </CardContent>
          </Card>
        </div>
      )}
    </Fragment>
  )
}

export default BagTable
