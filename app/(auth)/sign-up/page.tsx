import { Metadata } from 'next'
import { en } from 'public/locale'
import { PATH_DIR, ASSET_DIR } from 'hgss-dir'
import Link from 'next/link'
import Image from 'next/image'
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardDescription, CardContent } from 'component/ui'
import SignUpForm from './sign-up-form'

export const metadata: Metadata = { title: en.sign_up.label }

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
    <div className="grid grid-cols-1 md:grid-cols-7 h-screen w-full">
      <div className="relative col-span-4 hidden md:block">
        <Image src={ASSET_DIR.BG_2} alt="hgss-background" className={'h-screen'} fill sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"} />
      </div>
      <div className={'col-span-3 flex items-center justify-center min-h-screen'}>
        <div className="max-w-2xl w-full px-6">
          <Card className="shadow-none border-none">
            <CardHeader className="space-y-4">
              <Link href={PATH_DIR.ROOT} className="flex-center">
                <Image src={ASSET_DIR.LOGO} height={120} width={120} alt={'logo'} />
              </Link>
              <CardDescription className="text-center">{en.sign_up.description}</CardDescription>
              <CardContent className="space-y-4">
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
