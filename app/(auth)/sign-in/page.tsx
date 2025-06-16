import { Metadata } from 'next'
import { PATH_DIR, ASSET_DIR } from 'hgss-dir'
import Link from 'next/link'
import Image from 'next/image'
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardContent } from 'component/ui'
import { AppAuthBG } from 'component/shared/app'
import { transl } from 'lib/util'
import SignInForm from './sign-in-form'

export const metadata: Metadata = { title: transl('sign_in.label') }

interface SignInPageProps {
  searchParams: Promise<{ callbackUrl: string }>
}

const SignInPage = async ({ searchParams }: SignInPageProps) => {
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
            <CardHeader className={'space-y-4'}>
              <Link href={PATH_DIR.ROOT} className="flex-center">
                <div className={'relative w-[120px] h-[120px]'}>
                  <Image src={ASSET_DIR.LOGO} alt="logo" fill style={{ objectFit: 'contain' }} />
                </div>
              </Link>
              <CardContent className="space-y-4">
                <SignInForm />
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
