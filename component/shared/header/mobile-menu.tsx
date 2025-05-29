import MobileMenuClient from 'component/shared/header/mobile-menu.client'

const MobileMenu = async ({ user, count, moduleType }: { user: User, count: number,  moduleType?: ModuleType }) => {
  return <MobileMenuClient user={user} count={count} moduleType={moduleType} />
}

export default MobileMenu
