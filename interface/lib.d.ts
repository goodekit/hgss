/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gmp-place-autocomplete': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        ref                    ?: React.Ref<any>
        placeholder            ?: string
        value                  ?: string
        'included-region-codes'?: string
        'requested-language'   ?: string
        'requested-region'     ?: string
        style                  ?: React.CSSProperties
        onFocus                ?: React.FocusEventHandler<HTMLElement>
        onBlur                 ?: React.FocusEventHandler<HTMLElement>
        onChange               ?: React.ChangeEventHandler<HTMLElement>
      }
    }
  }
}