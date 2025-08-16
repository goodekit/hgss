import { Fragment } from 'react'
import { GLOBAL } from 'hgss'
import { cn, transl } from 'lib/util'

type ProcessFlowLocaleKey = keyof AppLocale['purchase_flow']

const PurchaseFlow = ({ current = 0 }) => {
  const lastElement = GLOBAL.PURCHASE_FLOW[GLOBAL.PURCHASE_FLOW.length - 1]
  return (
    <div className={"flex-between flex-row space-x-2 space-y-2 mb-10 special-elite"}>
      {(GLOBAL.PURCHASE_FLOW).map((step, index) => (
        <Fragment key={step}>
          <div className={cn('p-2 w-56 rounded-sm text-center text-sm', index === current && 'bg-secondary', index < current && 'opacity-40')}>
            {index < current ? transl(`purchase_flow.${step as ProcessFlowLocaleKey}.completed`) : transl(`purchase_flow.${step as ProcessFlowLocaleKey}.label`)}
          </div>
          {step !== lastElement && <hr className={cn('w-16 border-t mx-2', index < current ? 'border-green-500' : 'border-gray-300')} />}
        </Fragment>
      ))}
    </div>
  )
}

export default PurchaseFlow
