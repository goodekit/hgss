"use client"
import { HTMLAttributes } from 'react'
import { NAV_CONFIG_ADMIN } from 'hgss-nav'
import { cn } from 'lib'
import { ProtectedNavLink } from 'component/shared/protect'

const MainNav = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <nav className={cn('flex items-center special-elite space-x-4 lg:space-x-6', className)} {...props}>
      {NAV_CONFIG_ADMIN.map((item, index) => (
        <ProtectedNavLink key={index} href={item.href}>
          {item.title}
        </ProtectedNavLink>
      ))}
    </nav>
  )
}

export default MainNav
