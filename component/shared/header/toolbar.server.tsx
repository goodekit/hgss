import { Toolbar } from 'component/shared/header/toolbar'
import { getMyBagCount } from 'lib/action'
import { auth } from 'auth'
import { Session } from 'next-auth'

export const ToolbarServer = async ({ moduleType }: { moduleType: ModuleType }) => {
      const session = await auth()
      const user    = session?.user ?? null
      const count   = await getMyBagCount()

    return <Toolbar moduleType={moduleType} user={user as Session['user']} count={count} session={session} />
}