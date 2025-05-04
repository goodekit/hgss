import { FC } from 'react'
import { getMyBagCount } from 'lib/action'
import { auth } from 'auth'
import { ThemeToggle, MobileMenu, BagIconWithBadge } from 'component/shared'
import { UserMenu } from 'component/shared/header'

interface ToolbarProps {
  moduleType?: ModuleType
}

const Toolbar: FC<ToolbarProps> = async ({ moduleType }) => {
  const count = await getMyBagCount()
  const session = await auth()
  const user = session?.user

  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-3">
        <ThemeToggle />
        <BagIconWithBadge itemCount={count} />
        <UserMenu />
      </nav>
      <MobileMenu user={user as User} count={count} moduleType={moduleType} />
    </div>
  )
}

export default Toolbar
