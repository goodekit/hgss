import { FC } from 'react'
import { ShoppingBagIcon } from 'lucide-react'
import { PATH_DIR } from 'hgss-dir'
import { Badge } from 'component/ui'
import { ProtectedNavLink } from 'component/shared/protect'

interface BagIconWithBadgeProps {
  itemCount: number
}

const BagIconWithBadge: FC<BagIconWithBadgeProps> = ({ itemCount }) => {
  const limit = itemCount > 9 ? '9+' : itemCount
  return (
    <div className={'relative flex items-center inline-block'}>
        <ProtectedNavLink href={PATH_DIR.BAG}>
            <div className={'relative'}>
              <ShoppingBagIcon size={20} />
              {itemCount > 0 && <Badge variant={'outline'} className={'absolute -top-2 -right-2 px-1 py-0 text-xs rounded-lg bg-red-500 shadow-none text-white'}>{limit}</Badge>}
            </div>
        </ProtectedNavLink>
    </div>
  )
}

export default BagIconWithBadge
