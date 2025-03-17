'use client'

import { FC, useTransition } from 'react'
import { en } from 'public/locale'
import { useToast } from 'hook'
import { updateOrderToDelivered } from 'lib/action'
import { TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from '../loader'


interface MarkDeliveredBtnProps {
  orderId: string
}
const MarkDeliveredBtn: FC<MarkDeliveredBtnProps> = ({ orderId }) => {
  const [isPending, startTransition] = useTransition()
  const { toast }                    = useToast()

  const handleMarkDelivered = async () => {
    startTransition(async () => {
      const response = await updateOrderToDelivered(orderId)
      toast({ variant: response.success ? 'default' : 'destructive', description: response.message })
    })
  }
  return (
    <TapeBtn type={'button'} textSize={'text-lg'} disabled={isPending} label= {isPending ? ( <div className={'flex justify-center'}> <i>{en.loading.processing}</i> <span><EllipsisLoader /></span></div> ) : en.mark_delivered.label} onClick={handleMarkDelivered} className={'w-full texture-6-bg'} />
  )
}

export default MarkDeliveredBtn
