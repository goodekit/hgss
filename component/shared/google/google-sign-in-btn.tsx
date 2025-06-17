"use client"

import { signIn } from 'next-auth/react'
import { useToast } from 'hook'
import { TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'
import { transl } from 'lib/util'

interface GoogleSignInBtnProps {
  userName?: string
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
}

export const GoogleSignInBtn = ({ userName, loading, disabled, onClick }: GoogleSignInBtnProps) => {
  const { toast }    = useToast()
  const handleSignIn = () => {
    onClick?.();
    signIn('google', { callbackUrl: '/' }).then(() => { toast({ description: transl('success.sign_in_welcome_back', { name: userName || 'Mate' })})})
  }
  return (
    <div className={'my-5'}>
      <TapeBtn
        className={'texture-bg'}
        disabled={loading || disabled}
        label={disabled ? <EllipsisLoader /> : transl('sign_in.google')}
        onClick={handleSignIn}
      />
    </div>
  )
}