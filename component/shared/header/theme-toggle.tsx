'use client'
import { useState, useEffect } from 'react'
import { en } from 'public/locale'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon, SunMoon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuCheckboxItem
} from 'component/ui'
import { capitalize, cn, KEY } from 'lib'

interface ThemeToggleProps {
  className?: string
}

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme }   = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const renderIcon = () => {
    if (theme === KEY.DARK) {
      return <div className={'flex items-center gap-1'}><MoonIcon size={20} /> <span className={'md:hidden'}>{capitalize(KEY.DARK)}</span></div>
    }
    if (theme === KEY.LIGHT) {
      return <div className={'flex items-center gap-1'}><SunIcon size={20} /> <span className={'md:hidden'}>{capitalize(KEY.LIGHT)}</span></div>
    }
    return <div className={'flex items-center gap-1'}><SunMoon size={20} /> <span className={'md:hidden'}>{capitalize(KEY.SYSTEM)}</span></div>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
         <button className={cn('text-sm font-medium transition-colors hover:text-primary ease-in-out text-muted-foreground', className)}>
          {renderIcon()}
         </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={'special-elite flex flex-col cursor-pointer'} align={"end"} forceMount>
        <DropdownMenuLabel>{capitalize(en.appearance.label)}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={theme === KEY.SYSTEM} onClick={() => setTheme(KEY.SYSTEM)}>
          {capitalize(KEY.SYSTEM)}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={theme === KEY.LIGHT} onClick={() => setTheme(KEY.LIGHT)}>
          {capitalize(KEY.LIGHT)}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={theme === KEY.DARK} onClick={() => setTheme(KEY.DARK)}>
          {capitalize(KEY.DARK)}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeToggle
