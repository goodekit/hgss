import { Fragment } from 'react'
import { en } from 'public/locale'
import { PATH_DIR } from 'hgss-dir'
import { NAV_CONFIG, NAV_CONFIG_ADMIN, NAV_CONFIG_USER } from 'hgss-nav'
import { signOutBasic } from 'lib/action'
import { EllipsisVertical, User2Icon, LogOut, Shield } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTrigger, Separator, Button } from 'component/ui'
import { ProtectedNavLink } from 'component/shared/protect'
import { LinkBtn } from 'component/shared/btn'
import { ThemeToggle, BagNavLink } from 'component/shared'
import { KEY } from 'lib'

const MobileMenu = ({ user, count, moduleType = 'default' }: { user: User, count: number, moduleType?: ModuleType }) => {
  const isAdmin    = user?.role === KEY.ADMIN

  let navConfig

  switch (moduleType) {
    case 'admin':
      navConfig = NAV_CONFIG_ADMIN
      break

    case 'user':
      navConfig = NAV_CONFIG_USER
      break

    default:
      navConfig = NAV_CONFIG
      break
  }

  const renderUser = !user ? (
    <LinkBtn href={PATH_DIR.SIGN_IN} className={'flex justify-start'}>
      <User2Icon /> {en.sign_in.label}
    </LinkBtn>
  ) : (
    <div className={"flex flex-col space-y-2 text-center special-elite"}>
      {isAdmin && (
        <Fragment>
          <LinkBtn href={PATH_DIR.ADMIN.OVERVIEW} className={'flex justify-start'}><Shield />{en.admin.label}</LinkBtn>
          <Separator className="my-4" />
        </Fragment>
      )}
      <ThemeToggle className={'flex justify-start'} />
      <form action={signOutBasic} className="w-full">
        <Button className={"w-full py-4 h-4 flex justify-start"} variant={'ghost'}>
          <LogOut /> <span>{en.sign_out.label}</span>
        </Button>
      </form>
    </div>
  )

  return (
    <nav className={"md:hidden"}>
      <Sheet>
        <BagNavLink itemCount={count}/>
        <SheetTrigger className={"align-middle"}>
          <EllipsisVertical />
        </SheetTrigger>
        <SheetContent className={"w-[200px] special-elite"}>
          <div className={'flex flex-col h-full justify-between'}>
            <div className={'flex flex-col space-y-4 mt-5'}>
                {navConfig.map(({ title, href }, index) => (
                  <ProtectedNavLink key={index}href={href}>{title}</ProtectedNavLink>
                ))}
                 <Separator className="my-4" />
                {!user ? null : (
                  <Fragment>
                    <ProtectedNavLink href={PATH_DIR.USER.ACCOUNT} className={'justify-start'}>{en.account.label}</ProtectedNavLink>
                    <ProtectedNavLink href={PATH_DIR.USER.ORDER}>{en.order_history.label}</ProtectedNavLink>
                  </Fragment>
                )}
            </div>
            <div className={"mt-auto flex flex-col"}>
              {renderUser}
            </div>
          </div>
          <SheetDescription></SheetDescription>
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default MobileMenu
