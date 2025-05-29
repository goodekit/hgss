'use client'

import { Fragment, useEffect, useState } from 'react'
import { en } from 'public/locale'
import { usePathname } from 'next/navigation'
import { PATH_DIR } from 'hgss-dir'
import { NAV_CONFIG, NAV_CONFIG_ADMIN, NAV_CONFIG_USER } from 'hgss-nav'
import { signOutBasic } from 'lib/action'
import { User2Icon, LogOut, Shield } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTrigger, SheetTitle, Separator, Button } from 'component/ui'
import { ThemeToggle } from 'component/shared/header/theme-toggle'
import { BagNavLink } from 'component/shared/bag'
import { ProtectedNavLink } from 'component/shared/protect'
import { LinkBtn } from 'component/shared/btn'
import { charAtName, KEY } from 'lib'

export const MobileMenuClient = ({ user, count, moduleType = 'default' }: { user: User, count: number, moduleType?: ModuleType }) => {
  const [open, setOpen] = useState(false)
  const pathname        = usePathname()
  const isAdmin         = user?.role === KEY.ADMIN
  const menuIcon        = user?.name ? charAtName(user.name) : '|~}'
  const NAV_CONFIG_MAP  = {
    admin  : NAV_CONFIG_ADMIN,
    user   : NAV_CONFIG_USER,
    default: NAV_CONFIG
  }

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const navConfig = NAV_CONFIG_MAP[moduleType] || NAV_CONFIG

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
      <ThemeToggle />
      <form action={signOutBasic} className="w-full">
        <Button className={"w-full py-4 h-4 flex justify-start"} variant={'ghost'}>
          <LogOut /> <span>{en.sign_out.label}</span>
        </Button>
      </form>
    </div>
  )

  return (
    <nav className={'md:hidden'}>
      <Sheet open={open} onOpenChange={setOpen}>
        <BagNavLink itemCount={count} />
        <SheetTrigger type={'button'} className={'align-middle'}>{menuIcon}</SheetTrigger>
        <SheetContent className={'w-full special-elite'}>
          <SheetTitle></SheetTitle>
          <div className={'flex flex-col h-full justify-between'}>
            <div className={'flex flex-col space-y-4 mt-5'}>
              {navConfig.map(({ title, href }, index) => (
                <ProtectedNavLink key={index} href={href}>
                  {title}
                </ProtectedNavLink>
              ))}
              <Separator className="my-4" />
              {!user ? null : (
                <Fragment>
                  <ProtectedNavLink href={PATH_DIR.USER.ACCOUNT} className={'justify-start'}>
                    {en.account.label}
                  </ProtectedNavLink>
                  <ProtectedNavLink href={PATH_DIR.USER.ORDER}>{en.order_history.label}</ProtectedNavLink>
                </Fragment>
              )}
            </div>
            <div className={'mt-auto flex flex-col'}>{renderUser}</div>
          </div>
          <SheetDescription></SheetDescription>
        </SheetContent>
      </Sheet>
    </nav>
  )
}