import { Metadata } from 'next'
import { PATH_DIR, ASSET_DIR } from 'hgss-dir'
import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { auth } from 'auth'
import { Card, CardHeader, CardContent } from 'component/ui'
import { Label } from 'component/ui/label'
import { AppAuthBG } from 'component/shared/app'
import { transl } from 'lib/util'
import ForgotPasswordForm from './forgot-password-form'

export const metadata: Metadata = { title: transl('sign_in.label') }

interface ForgotPasswordPageProps {
  searchParams: Promise<{ callbackUrl: string }>
}

const ForgotPasswordPage = async ({ searchParams }: ForgotPasswordPageProps) => {
  const { callbackUrl } = await searchParams
  const session         = await auth()
  if (session) {
    redirect(callbackUrl || PATH_DIR.ROOT)
  }
  return (
    <div className={'grid grid-cols-1 md:grid-cols-7 h-screen w-full special-elite'}>
      <AppAuthBG />
      <div className={'col-span-4 flex items-center justify-center min-h-screen'}>
        <div className={'max-w-2xl px-6 w-full'}>
          <Card className={'shadow-none border-none'}>
            <CardHeader className={'flex justify-center items-center space-y-4'}>
              <Link href={PATH_DIR.ROOT} className="flex-center">
                <div className={'relative w-[120px] h-[120px]'}>
                  <Image src={ASSET_DIR.LOGO} alt="logo" fill style={{ objectFit: 'contain' }} />
                </div>
              </Link>
              <Label className={'text-3xl'}>{transl('reset_password.label')}</Label>
            </CardHeader>
            <CardContent className={'space-y-4 my-4'}>
              <ForgotPasswordForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
