import React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gmp-place-autocomplete': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        placeholder?: string
        value?: string
        'included-region-codes'?: string
        'requested-language'?: string
        'requested-region'?: string
        style?: React.CSSProperties
        onFocus?: () => void
        onBlur?: () => void
        onChange?: () => void
      }
    }
  }
}

export {}
