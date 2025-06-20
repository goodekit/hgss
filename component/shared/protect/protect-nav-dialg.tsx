import { FC } from 'react'
import { AlertDialog, AlertDialogTitle, AlertDialogContent, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from 'component/ui'
import { transl } from 'lib/util'

interface ProtectNavDialgProps {
  open               : boolean
  setOpen            : (open: boolean) => void
  confirmedNavigation: () => void
}

const ProtectNavDialg: FC<ProtectNavDialgProps> = ({ open, setOpen, confirmedNavigation }) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
      <AlertDialogTitle>{transl('message.default.title')}</AlertDialogTitle>
        <p>{transl('message.unsaved_changes.description')}</p>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>{transl('stay.label')}</AlertDialogCancel>
          <AlertDialogAction className={'text-black'} onClick={confirmedNavigation}>{transl('leave.label')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ProtectNavDialg
