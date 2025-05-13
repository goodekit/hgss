"use client"
import { FC } from 'react'
import { en } from 'public/locale'
import { useTheme } from 'next-themes'
import { Tooltp } from 'component/shared/tooltp'
import { Button } from 'component/ui'
import { ProtectedNavLink } from 'component/shared/protect'
import { cn, KEY } from 'lib'

interface FormBackBtnProps {
  href               ?: string
  label              ?: string
  withLink           ?: boolean
  handleExclusiveBack?: () => void
}

const FormBackBtn: FC<FormBackBtnProps> = ({ href = '', label,  handleExclusiveBack, withLink = false }) => {
  const { systemTheme, theme } = useTheme()

  const isDark    = (theme === KEY.DARK) || (theme === KEY.SYSTEM && systemTheme === KEY.DARK)
  const respLabel = isDark ? 'text-tape' : 'text-black'

  const handleBackButton = () => {
    window.history.back()
  }
  return (
    <Tooltp content={en.go_back}>
      {withLink ? (
        <Button variant={'ghost'}>
          <ProtectedNavLink href={href} className={'flex flex-row items-center gap-2'}>
            <p className={cn('text-2xl', respLabel)}>{'<-'}</p> &nbsp; <span>{label}</span>
          </ProtectedNavLink>
        </Button>
      ) : (
        <Button variant={'ghost'} onClick={handleBackButton || handleExclusiveBack}>
          <p className={'text-xl text-tape'}>{'<-'}</p>
        </Button>
      )}
    </Tooltp>
  )
}

export default FormBackBtn
