import { Metadata } from 'next'
import { PATH_DIR, ASSET_DIR } from 'hgss-dir'
import Link from 'next/link'
import Image from 'next/image'
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardDescription, CardContent } from 'component/ui'
import { AppAuthBG } from 'component/shared/app'
import { transl } from 'lib/util'
import SignUpForm from './sign-up-form'

export const metadata: Metadata = { title: transl('sign_up.label') }

interface SignUpPageProps {
  searchParams: Promise<{ callbackUrl: string }>
}
const SignUpPage = async ({ searchParams }: SignUpPageProps) => {
  const session = await auth()
  const { callbackUrl } = await searchParams
  if (session) {
    redirect(callbackUrl || PATH_DIR.ROOT)
  }
  return (
    <div className={'grid grid-cols-1 md:grid-cols-7 h-screen w-full special-elite'}>
      <AppAuthBG image={ASSET_DIR.BG_2} />
      <div className={'col-span-3 flex items-center justify-center min-h-screen'}>
        <div className={'max-w-2xl w-full px-6'}>
          <Card className={'shadow-none border-none'}>
            <CardHeader className={'space-y-4'}>
              <Link href={PATH_DIR.ROOT} className="flex-center">
                <Image src={ASSET_DIR.LOGO} height={120} width={120} alt={'logo'} />
              </Link>
              <CardDescription className={'text-center'}>{transl('sign_up.description')}</CardDescription>
              <CardContent className={'space-y-4'}>
                <SignUpForm />
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
