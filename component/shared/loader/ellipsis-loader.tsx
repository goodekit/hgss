import { FC } from 'react'
import { cn } from "lib/util"

interface EllipsisLoaderProps {
    className?: string
}

const EllipsisLoader: FC<EllipsisLoaderProps> = ({ className, ...props }) => {
  return (
    <div className={cn("flex text-center justify-center gap-1", className)} {...props}>
      <span className="dot-animation text-xl text-black">{'.'}</span>
      <span className="dot-animation text-xl text-black delay-200">{'.'}</span>
      <span className="dot-animation text-xl text-black delay-400">{'.'}</span>
    </div>
  );
};

export default EllipsisLoader