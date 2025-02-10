import { PATH_DIR } from 'hgss-dir'
import { EllipsisVertical, ShoppingBagIcon, User2Icon } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTrigger } from 'component/ui'
import { LinkBtn } from 'component/shared/btn'
import { ThemeToggle } from 'component/shared'

const MobileMenu = () => {
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
          <LinkBtn href={PATH_DIR.SIGN_IN}>
            <User2Icon />
          </LinkBtn>
          <SheetDescription></SheetDescription>
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default MobileMenu
