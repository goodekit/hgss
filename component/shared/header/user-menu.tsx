import { Fragment } from 'react'
import { en } from 'public/locale'
import { PATH_DIR } from 'hgss-dir'
import Link from 'next/link'
import { auth } from 'auth'
import { signOutBasic } from 'lib/action'
import { User2Icon, LogOut } from 'lucide-react'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, Separator } from 'component/ui'
import { ProtectedNavLink } from 'component/shared/protect'
import { KEY } from 'lib/constant'
import { charAtName } from 'lib/util'

const UserMenu = async () => {
  const session = await auth()
  if (!session) {
    return (
      <Button asChild variant="ghost">
        <Link href={PATH_DIR.SIGN_IN}>
          <User2Icon /> {en.sign_in.label}
        </Link>
      </Button>
    )
  }

  const isAdmin = session?.user?.role === KEY.ADMIN

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className={"rounded-sm flex text-center hover:font-bold text-2xl"}>
              {session?.user?.name ? charAtName(session?.user?.name) : <User2Icon />}
            </button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={"w-52 text-sm special-elite"} align="end" forceMount>
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-2">
              <div className="text-sm font-medium leading-none">{session?.user?.name}</div>
              <Separator className="my-4" />
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem className="p-2">
            <ProtectedNavLink href={PATH_DIR.USER.ACCOUNT}>{en.navigation.account.label}</ProtectedNavLink>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2">
            <ProtectedNavLink href={PATH_DIR.USER.ORDER}>{en.order_history.label}</ProtectedNavLink>
          </DropdownMenuItem>

          <Separator className="my-2" />
          {isAdmin && (
            <Fragment>
              <DropdownMenuItem className="p-2">
                <ProtectedNavLink href={PATH_DIR.ADMIN.OVERVIEW}>{en.admin.label}</ProtectedNavLink>
              </DropdownMenuItem>
              <Separator className="my-2" />
            </Fragment>
          )}

          <DropdownMenuItem className="p-1">
            <form action={signOutBasic} className="w-full">
              <Button className="w-full py-4 px-2 h-4 justify-start" variant={'ghost'}>
                <LogOut /> {en.sign_out.label}
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserMenu
