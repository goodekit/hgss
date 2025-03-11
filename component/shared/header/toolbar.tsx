import { getMyBagCount, getUserById } from 'lib/action'
import { auth } from 'auth'
import { ThemeToggle, MobileMenu, BagIconWithBadge } from 'component/shared'
import { UserMenu } from 'component/shared/header'

const Toolbar = async () => {
  const count   = await getMyBagCount()
  const session = await auth()
  const user  = session?.user

  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ThemeToggle />
        <BagIconWithBadge itemCount={count}/>
        <UserMenu />
      </nav>
      <MobileMenu user={user} />
    </div>
  )
}

export default Toolbar
