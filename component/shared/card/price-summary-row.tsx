import { FC, Fragment } from "react"
import { formatCurrency, cn } from "lib/util"

interface PriceSummaryRowProps {
  label            : string
  price            : string | number
  className       ?: string
  hasPromotion    ?: boolean
  promotionalPrice?: string | number
}
const PriceSummaryRow: FC<PriceSummaryRowProps> = ({ label, price, className, hasPromotion, promotionalPrice }) => {
  return (
    <div className="flex justify-between items-center">
      <div className={className}>{label}</div>
      <div className="flex flex-col items-end">
        {hasPromotion ? (
          <Fragment>
            <div className="text-gray-500 line-through text-sm">
              {formatCurrency(price)}
            </div>
            <div className={cn("text-green-600", className)}>
              {promotionalPrice && formatCurrency(promotionalPrice)}
            </div>
          </Fragment>
        ) : (
          <div className={className}>{formatCurrency(price)}</div>
        )}
      </div>
    </div>
  )
}

export default PriceSummaryRow