import { cn } from "lib"

type Props = {
 title     : string
 className?: string
}
const PageTitle = ({ title, className }: Props) => {
    return (
      <div className="space-y-4 gap-3">
        <h1 className={cn(className ? className : 'h2-bold')}>{title}</h1>
      </div>
    )
}

export default PageTitle