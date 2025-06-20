import { FC } from 'react'
import { cn } from "lib/util"

interface EllipsisLoaderProps {
    className?: string
    dotSize  ?: string
    dotColor ?: string
}

const EllipsisLoader: FC<EllipsisLoaderProps> = ({ className, dotSize = 'text-xl', dotColor = 'text-black', ...props }) => {
  return (
    <div className={cn('flex text-center justify-center gap-1', className)} {...props}>
      <span className={cn('dot-animation permanent-marker-regular', dotSize, dotColor)}>{'.'}</span>
      <span className={cn('dot-animation permanent-marker-regular delay-200', dotSize, dotColor)}>{'.'}</span>
      <span className={cn('dot-animation permanent-marker-regular delay-400', dotSize, dotColor)}>{'.'}</span>
    </div>
  )
};

export default EllipsisLoader