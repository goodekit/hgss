import { ReactNode, forwardRef } from 'react'
import Link from 'next/link'
import { Button } from 'component/ui'

interface LinkBtnProps {
  href      : string
  children  : ReactNode
  variant  ?: ButtonVariant
  className?: string
  size     ?: ButtonSize
}

const LinkBtn = forwardRef<HTMLAnchorElement, LinkBtnProps>(
  ({ href, children, variant = 'ghost', className, size = 'default' }, ref) => {
    return (
      <Button asChild variant={variant} className={className} size={size}>
        <Link href={href} ref={ref && ref}>
          {children}
        </Link>
      </Button>
    )
  }
)

LinkBtn.displayName = 'LinkBtn'

export default LinkBtn
