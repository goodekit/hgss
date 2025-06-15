import { SessionProvider} from 'next-auth/react'
import { Metadata } from 'next'
import { en } from 'public/locale'
import { auth } from 'auth'
import { getUserById } from 'lib/action'
import { AccountForm } from 'component/shared/form'
import { transl } from 'lib/util'

export const metadata: Metadata = { title: 'Account' }

const UserAccountPage = async () => {
  const session = await auth()
  const userId  = session?.user?.id

  if (!userId) throw new Error(en.error.user_not_found)
  const user = await getUserById(userId)

  return <SessionProvider session={session}>
    <div className={"max-w-md mx-auto space-y-4"}>
      <h2 className={"h2-bold permanent-marker-regular"}>
      {transl('navigation.account.label')}
      </h2>
      <AccountForm user={user} />
    </div>
  </SessionProvider>
}

export default UserAccountPage
