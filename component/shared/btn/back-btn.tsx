"use client"

import { FC, ReactNode } from 'react'
import { Tooltp } from 'component/shared/tooltp'
import { Button } from 'component/ui'
import { cn, transl } from 'lib/util'

interface BackBtnProps {
  className?: ReactNode
}

const BackBtn: FC<BackBtnProps> = ({ className }) => {

 const handleBackButton = () => { window.history.back() }
  return (
    <Tooltp content={transl('go_back')}>
      <Button variant={'ghost'} onClick={handleBackButton} className={cn("", className)}>
       <h2 className={'text-2xl permanent-marker-regular mb-4'}>{'<-'}</h2>
      </Button>
    </Tooltp>
  )
}

export default BackBtn
