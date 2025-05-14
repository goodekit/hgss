import { cn } from 'lib'

const HamburgerUserMenu = () => {
  return (
    <div className={cn('hamburger md:hidden focus:outline-none', 'relative z-50')}>
      <span className={'hamburger-top'}></span>
      <span className={'hamburger-middle'}></span>
      <span className={'hamburger-bottom'}></span>
    </div>
  )
}

export default HamburgerUserMenu