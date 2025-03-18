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
  DropdownMenuCheckboxItem,
  Button
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
      return <div className={'flex items-center gap-1'}><MoonIcon /> <span className={'md:hidden'}>{capitalize(KEY.DARK)}</span></div>
    }
    if (theme === KEY.LIGHT) {
      return <div className={'flex items-center gap-1'}><SunIcon /> <span className={'md:hidden'}>{capitalize(KEY.LIGHT)}</span></div>
    }
    return <div className={'flex items-center gap-1'}><SunMoon /> <span className={'md:hidden'}>{capitalize(KEY.SYSTEM)}</span></div>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className={cn("focus-visible:ring-0 focus-visible:ring-offset-0", className)}>
          {renderIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={'special-elite mt-5 justify-between items-start flex flex-col cursor-pointer'}>
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
