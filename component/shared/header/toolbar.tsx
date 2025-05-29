import { FC } from 'react'
import { Session } from 'next-auth'
import { BagIconWithBadge } from 'component/shared/bag'
import { ThemeToggle } from 'component/shared/header/theme-toggle'
import { MobileMenu } from 'component/shared/header/mobile-menu'
import { UserMenu } from 'component/shared/header/user-menu'

interface ToolbarProps {
  moduleType?: ModuleType
  user       : User
  count      : number
  session    : Session | null
}

export const Toolbar: FC<ToolbarProps> = ({ moduleType, user, count, session }) => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-3">
        <ThemeToggle />
        <BagIconWithBadge itemCount={count} />
        <UserMenu session={session} />
      </nav>
      <MobileMenu user={user as User} count={count} moduleType={moduleType} />
    </div>
  )
}

