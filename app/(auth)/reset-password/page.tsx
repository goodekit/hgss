import { Metadata } from 'next'
import { en } from 'hgss-locale'
import Link from 'next/link'
import Image from 'next/image'
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardDescription, CardContent } from 'component/ui'
import { PATH_DIR, ASSET_DIR } from 'hgss-dir'
import ResetPasswordForm from './reset-password-form'
import { transl } from 'lib'

export const metadata: Metadata = { title: en.sign_in.label }

interface ResetPasswordPageProps {
  searchParams: Promise<{ callbackUrl: string }>
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  const { callbackUrl } = await searchParams
  const session         = await auth()
  if (session) {
    redirect(callbackUrl || PATH_DIR.ROOT)
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 h-screen w-full special-elite">
      <div className="relative col-span-4 hidden md:block">
        <Image src={ASSET_DIR.BG}  alt="hgss-background" fill priority sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"} className={'h-screen'} />
      </div>
      <div className={'col-span-3 flex items-center justify-center min-h-screen'}>
        <div className="max-w-2xl px-6 w-full">
          <Card className="shadow-none border-none">
            <CardHeader className="space-y-4">
              <Link href={PATH_DIR.ROOT} className="flex-center">
                <div className="relative w-[120px] h-[120px]">
                  <Image src={ASSET_DIR.LOGO} alt="logo" fill style={{ objectFit: 'contain' }} />
                </div>
              </Link>
              <CardDescription className={"text-center"}>{transl('form.reset_password.placeholder')}</CardDescription>
              <CardContent className={"space-y-4"}>
                <ResetPasswordForm />
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
