import { Metadata } from 'next'
import { en } from 'public/locale'
import Link from 'next/link'
import Image from 'next/image'
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardDescription, CardContent } from 'component/ui'
import { PATH_DIR, ASSET_DIR } from 'hgss-dir'
import SignInForm from './sign-in-form'

export const metadata: Metadata = { title: en.sign_in.label }

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
    <div className="grid grid-cols-1 md:grid-cols-7 h-screen w-full bg-black special-elite">
      <div className="relative col-span-4 hidden md:block">
        <Image src={ASSET_DIR.BG}  alt="hgss-background" className={'h-screen'} fill sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"} />
      </div>
      <div className={"col-span-3 bg-black flex items-center justify-center min-h-screen"}>
        <div className="max-w-2xl w-full px-6">
          <Card className="shadow-none border-none">
            <CardHeader className="space-y-4">
              <Link href={PATH_DIR.ROOT} className="flex-center">
                <Image src={ASSET_DIR.LOGO} height={120} width={120} alt={'logo'} />
              </Link>
              <CardDescription className="text-center">{en.sign_in.description}</CardDescription>
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
