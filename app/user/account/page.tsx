import { SessionProvider} from 'next-auth/react'
import { Metadata } from 'next'
import { auth } from 'auth'
import { Badge } from 'component/ui'
import { getUserById } from 'lib/action'
import { transl, formatDateTime, cn } from 'lib/util'

import AccountForm from './account-form'
import AccountChangePasswordForm from './account-change-password-form'

export const metadata: Metadata = { title: transl('account.label') }

const UserAccountPage = async () => {
  const session  = await auth()
  const userId   = session?.user?.id
  const authFlow = session?.user?.provider

  const isCredentialsAuthFlow = authFlow === 'credentials'

  if (!userId) throw new Error(transl('error.user_not_found'))
  const user = await getUserById(userId)

  return (
    <SessionProvider session={session}>
      <div className={'min-w-xl mx-auto space-y-4'}>
        <h2 className={'h2-bold permanent-marker-regular'}>{transl('navigation.account.label')}</h2>
        <div className={'flex flex-col md:flex-row justify-start w-full md:w-[1200px] gap-5 space-y-5'}>
          <div className={cn("w-full md:w-[500px] my-10")}>
            <AccountForm user={user} />
          </div>
          {isCredentialsAuthFlow && (
            <div className={'w-auto md:w-[500px] p-5 rounded-md'}>
              <AccountChangePasswordForm />
            </div>
          )}
        </div>
        <div className={"flex justify-start align-center items-center gap-2"}>
          <p className={'text-muted-foreground'}>{transl('last_updated_at.label')}</p><span><Badge variant={'outline'} className={'w-auto'}>{formatDateTime(user?.updatedAt).dateTime}</Badge></span>
        </div>
      </div>
    </SessionProvider>
  )
}

export default UserAccountPage
