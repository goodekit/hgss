'use client'

import { useTransition, FC } from 'react'
import { en } from 'public/locale'
import { ShoppingBagIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PATH_DIR } from 'hgss-dir'
import { useToast } from 'hook'
import { addItemToBag, removeItemFromBag } from 'lib/action'
import { ToastAction } from 'component/ui'
import { DynamicBagBtn, TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'

interface AddToBagProps {
  item : BagItem
  bag ?: Bag
}

const AddToBag: FC<AddToBagProps> = ({ bag, item }) => {
  const [isPending, startTransition] = useTransition()
  const router                       = useRouter()
  const { toast }                    = useToast()
  const existItem                    = bag && bag.items.find((x) => x.productId === item.productId)

  const handleAddToBag = async () => {
    startTransition(async () => {
      const response = await addItemToBag(item)
      if (!response.success) {
        toast({ variant: 'destructive', description: response.message })
        return
      }
      toast({
        description: response.message,
        action: (
          <ToastAction className={'bg-white border-0'} altText={"go-to-bag"} onClick={() => router.push(PATH_DIR.BAG)}>
            {en.go_to_bag}
          </ToastAction>
        )
      })
    })
  }

  const handleRemoveFromBag = async () => {
    startTransition(async () => {
      const response = await removeItemFromBag(item.productId)
      toast({ variant: response.success ? 'default' : 'destructive', description: response.message })
      return
    })
  }

  const render = existItem ? (
    <DynamicBagBtn isPending={isPending} handlePlus={handleAddToBag} handleMinus={handleRemoveFromBag} amount={existItem.qty} />
  ) : (
    <TapeBtn type={'button'} className={'texture-4-bg'} onClick={handleAddToBag} label={isPending ? (
    <EllipsisLoader />
    ) : (
      <div className={'flex justify-center gap-5 items-center'}>
      {'+'} {en.add_to_bag} <ShoppingBagIcon size={15} />
      </div>
    )}/>
  )
  return render
}

export default AddToBag
