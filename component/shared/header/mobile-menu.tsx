import { Fragment } from 'react'
import { PATH_DIR } from 'hgss-dir'
import { en } from 'public/locale'
import { signOutBasic } from 'lib/action'
import { EllipsisVertical, ShoppingBagIcon, User2Icon, LogOut, SquareUserRound } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTrigger, Separator, Button } from 'component/ui'
import { ProtectedNavLink } from 'component/shared/protect'
import { LinkBtn,  } from 'component/shared/btn'
import { ThemeToggle } from 'component/shared'
import { charAtName, KEY } from 'lib'

const MobileMenu = (user: User) => {
  const isAdmin    = user?.role === KEY.ADMIN
  const renderUser = !user ? (
    <LinkBtn href={PATH_DIR.SIGN_IN}>
      <User2Icon />
    </LinkBtn>
  ) : (
    <div className="flex flex-col space-y-2">
      <ProtectedNavLink href={PATH_DIR.USER.ACCOUNT}>{charAtName(user.name)}</ProtectedNavLink>
      <ProtectedNavLink href={PATH_DIR.USER.ACCOUNT}><SquareUserRound /></ProtectedNavLink>
      <ProtectedNavLink href={PATH_DIR.USER.ORDER}>{en.order_history.label}</ProtectedNavLink>
      <Separator className="my-4" />
      {isAdmin && (
        <Fragment>
          <ProtectedNavLink href={PATH_DIR.ADMIN.OVERVIEW}>{en.admin.label}</ProtectedNavLink>
          <Separator className="my-2" />
        </Fragment>
      )}
       <form action={signOutBasic} className="w-full">
          <Button className="w-full py-4 px-2 h-4 justify-start" variant={'ghost'}>
            <LogOut />
          </Button>
        </form>
    </div>
  )

  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <EllipsisVertical />
        </SheetTrigger>
        <SheetContent className="flex flex-col items-start w-[100px]">
          <ThemeToggle />
          <LinkBtn href={PATH_DIR.BAG}>
            <ShoppingBagIcon />
          </LinkBtn>
          {renderUser}
          <SheetDescription></SheetDescription>
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default MobileMenu
