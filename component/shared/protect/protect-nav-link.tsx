'use client'

import { Fragment, useState, useRef, useEffect } from 'react'
import { useFormState } from 'hook'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { AlertDialogTitle, AlertDialog, AlertDialogContent, AlertDialogDescription,  AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from 'component/ui'
import { LinkBtn } from 'component/shared/btn'
import { cn, transl } from 'lib'

interface ProtectedNavLinkProps {
  href      : string
  children  : React.ReactNode
  className?: string
  linkBtn  ?: boolean
}

const ProtectedNavLink: React.FC<ProtectedNavLinkProps> = ({ href, children, className, linkBtn }) => {
  const [showDialog, setShowDialog] = useState(false)
  const [nextPath, setNextPath]     = useState<string | null>(null)
  const { isDirty, setDirty }       = useFormState()
  const pathname                    = usePathname()
  const router                      = useRouter()
  const triggerRef                  = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!showDialog && triggerRef.current) {
      triggerRef.current.focus()
    }
  }, [showDialog])

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    const overlay = document.querySelector('[data-radix-sheet-overlay]') as HTMLElement | null
    overlay?.click()

    if (isDirty) {
      e.preventDefault()
      setNextPath(path)
      setShowDialog(true)
    }
  }

  const confirmNavigation = () => {
    setDirty(false)
    setShowDialog(false)
    if (nextPath) {
      router.push(nextPath)
      setNextPath(null)
    }
  }

  return (
    <Fragment>
      {linkBtn ? (
        <LinkBtn
        href={href}
        ref={triggerRef}
        size={'sm'}
        className={cn('text-sm font-medium transition-colors hover:text-primary ease-in-out', className, pathname.includes(href) ? 'font-semibold' : 'text-muted-foreground')}>
          {children}
        </LinkBtn>)
        : (
      <Link
        href={href}
        ref={triggerRef}
        onClick={(e) => handleNavigation(e, href)}
        className={cn('text-sm font-medium transition-colors hover:text-primary ease-in-out', className, pathname.includes(href) ? 'font-semibold' : 'text-muted-foreground')}>
       {children}
      </Link>
      )}
      {showDialog && (
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent>
            <AlertDialogTitle>{transl('message.default.title')}</AlertDialogTitle>
            <AlertDialogDescription>{transl('message.unsaved_changes.description')}</AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel  onClick={() => setShowDialog(false)}>{transl('cancel.label')}</AlertDialogCancel>
              <AlertDialogAction className={'text-white bg-red-600 border-none hover:bg-red-700'} onClick={confirmNavigation}>{transl('leave.label')}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </Fragment>
  )
}

export default ProtectedNavLink
