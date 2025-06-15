import { Metadata } from 'next'
import { PATH_DIR, ASSET_DIR } from 'hgss-dir'
import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { getResetPasswordTokenUser } from 'lib/action'
import { Card, CardHeader, CardContent } from 'component/ui'
import { Label } from 'component/ui/label'
import { transl } from 'lib'
import ResetPasswordForm from './reset-password-form'

export const metadata: Metadata = { title: transl('sign_in.label') }

interface ResetPasswordPageProps {
  searchParams: { token?: string }
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  const { token } = searchParams

  let email = ''
  if (token) {
    const response    = await getResetPasswordTokenUser({ token })
    if (response.success) {
      const data  = response.data as { email: string }
            email = data.email
    } else {
      redirect(PATH_DIR.PASSWORD_FORGOT)
    }
  }
  return (
    <div className={'grid grid-cols-1 md:grid-cols-7 h-screen w-full special-elite'}>
      <div className={'relative col-span-4 hidden md:block'}>
        <Image src={ASSET_DIR.BG} alt="hgss-background" fill priority sizes={'(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw'} className={'h-screen'} />
      </div>
      <div className={'col-span-3 flex items-center justify-center min-h-screen'}>
        <div className={'max-w-2xl px-6 w-full'}>
          <Card className={'shadow-none border-none'}>
            <CardHeader className={'flex justify-center items-center space-y-4'}>
              <Link href={PATH_DIR.ROOT} className="flex-center">
                <div className="relative w-[120px] h-[120px]">
                  <Image src={ASSET_DIR.LOGO} alt="logo" fill style={{ objectFit: 'contain' }} />
                </div>
              </Link>
              <Label className={'text-3xl'}>{transl('change_password.label')}</Label>
            </CardHeader>
            <CardContent className={'space-y-4 my-4'}>
              <ResetPasswordForm token={token || ''} verifiedUserEmail={email} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
