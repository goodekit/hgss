"use client"

import { en } from 'public/locale'
// import { ArrowLeft } from 'lucide-react'
import { Tooltp } from 'component/shared/tooltp'
import { Button } from 'component/ui'

const BackBtn = () => {

 const handleBackButton = () => { window.history.back() }
  return (
    <Tooltp content={en.go_back}>
      <Button variant={'ghost'} onClick={handleBackButton}>
       <h2 className={'text-4xl'}>{'<-'}</h2>
        {/* <ArrowLeft className={'default-size_icon'} /> */}
      </Button>
    </Tooltp>
  )
}

export default BackBtn
