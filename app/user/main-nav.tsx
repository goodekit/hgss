"use client"
import { HTMLAttributes } from 'react'
import { NAV_CONFIG } from 'hgss-nav'
import Link from 'next/link'
// import { en } from 'public/locale'
import { usePathname } from 'next/navigation'
import { cn } from 'lib'

const MainNav = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname()

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      {NAV_CONFIG.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn('text-sm font-medium transition-colors hover:text-primary', pathname.includes(item.href) ? '' : 'text-muted-foreground')}>
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

export default MainNav
