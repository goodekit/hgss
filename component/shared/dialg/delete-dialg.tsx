'use client'

import { FC, Fragment, useTransition, useState } from 'react'
import { en } from 'public/locale'
import { useToast } from 'hook'
import { systemPalette } from 'hgss-design'
import { useTheme } from 'next-themes'
import { Minus } from 'lucide-react'
import {
  Button,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter
} from 'component/ui'
import { EllipsisLoader } from 'component/shared/loader'
import { delay } from 'lib/util'
import { KEY } from 'lib/constant'

interface DeleteDialg {
  id       : string
  action   : (orderId: string) => Promise<AppResponse>
  children?: React.ReactNode
}
const DeleteDialg: FC<DeleteDialg> = ({ id, action, children }) => {
  const [isPending, startTransition] = useTransition()
  const [open, setOpen]              = useState(false)
  const { toast }                    = useToast()
  const { theme }                    = useTheme()

  const mode                         = theme === KEY.LIGHT ? 'light' : theme === KEY.DARK ? 'dark' : 'light'

  const handleDeleteOrder = async () => {
    startTransition(async () => {
      await delay(500)
      const response = await action(id)
      if (!response.success) {
        toast({ variant: 'destructive', description: response.message })
      } else {
        setOpen(false)
        toast({ description: response.message })
      }
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
      {children ? children : (
        <Button size={'sm'} variant={'ghost'}>
         <Minus size={20} color={systemPalette[mode].text.destructive} />
        </Button>
      )}
      </AlertDialogTrigger>
      <AlertDialogContent className={'special-elite'}>
        <AlertDialogHeader>
          <AlertDialogTitle>{en.message.default.title}</AlertDialogTitle>
          <AlertDialogDescription>{en.message.confirm_delete_order.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{en.cancel.label}</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleDeleteOrder} style={{ backgroundColor: systemPalette[mode].action.destructive, color: systemPalette[mode].text.secondary }}>
            {isPending ? (
              <Fragment>
                <i>{en.loading.delete_order}</i> <EllipsisLoader />
              </Fragment>
            ) : (
              en.delete.label
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialg
