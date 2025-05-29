import { Toolbar } from 'component/shared/header/toolbar'
import { getMyBagCount } from 'lib/action'
import { auth } from 'auth'

const ToolBarServer = async ({ moduleType }: { moduleType: ModuleType }) => {
      const session = await auth()
      const user    = session?.user ?? null
      const count   = await getMyBagCount()

    return <Toolbar moduleType={moduleType} user={user as User} count={count} session={session} />
}

export default ToolBarServer