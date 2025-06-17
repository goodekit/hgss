"use client"

import { signIn } from 'next-auth/react'
import { TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'
import { transl } from 'lib/util'

interface GoogleSignInBtnProps {
  loading ?: boolean
  disabled?: boolean
  onClick ?: () => void
}

export const GoogleSignInBtn = ({ loading, disabled, onClick }: GoogleSignInBtnProps) => {
  return (
    <div className={'my-5'}>
      <TapeBtn
        className={'texture-bg'}
        disabled={loading || disabled}
        label={disabled ? <EllipsisLoader /> : transl('sign_in.google')}
        onClick={() => { onClick?.(); signIn('google', { callbackUrl: '/' })}}
      />
    </div>
  )
}