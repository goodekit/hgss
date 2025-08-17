/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useRef } from 'react'
import { z, ZodSchema } from 'zod'
import { Controller, Path, Control, useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from 'component/ui/form'
import { parseAddress, transl } from 'lib'

interface RHFGoogleAddressAutocompleteProps<TSchema extends ZodSchema,TName extends Path<z.infer<TSchema>>> {
  control  : Control<z.infer<TSchema>>
  name     : TName
  label   ?: string
  country ?: string
  fullName?: string
  onFocus ?: () => void
  onBlur  ?: () => void
  onChange?: () => void
}

function RHFGoogleAddressAutocomplete<TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>>({ control, name, label, country, fullName, onFocus, onBlur, onChange }: RHFGoogleAddressAutocompleteProps<TSchema, TName>) {
  const autoRef      = useRef<any>(null)
  const fieldRef     = useRef<((value: unknown) => void) | null>(null)
  const { setValue } = useFormContext()

  useEffect(() => {
   if (!autoRef.current) return

     const handler = (event: any) => {
      const place = event?.place
      if (!place) return

      const getComponent = (type: string) =>
        place.addressComponents?.find((c: any) => c.types.includes(type))?.longText || ''

      const streetNumber = getComponent('street_number')
      const route        = getComponent('route')
      const city         =
        getComponent('locality') ||
        getComponent('postal_town') ||
        getComponent('administrative_area_level_2') ||
        getComponent('administrative_area_level_1')
      const postalCode  = getComponent('postal_code')
      const countryVal  = getComponent('country')
      const latitude    = place.location?.lat.toString() || ''
      const longitude   = place.location?.lng.toString() || ''
      const fullAddress = [streetNumber && route ? `${streetNumber} ${route}` : route, city, postalCode, countryVal]
        .filter(Boolean)
        .join(', ')

      setValue('streetAddress', `${streetNumber} ${route}`)
      setValue('city', city)
      setValue('postalCode', postalCode)
      setValue('latitude', latitude)
      setValue('longitude', longitude)

      if (fullName) setValue('fullName', fullName)

      fieldRef.current?.(fullAddress)
    }

    autoRef.current.addEventListener('gmp-placechange', handler)

    return () => autoRef.current?.removeEventListener('gmp-placechange', handler)
  })

  // to avoid build err: bypass type checking by wrapping in any
  const GmpPlaceAutocomplete = 'gmp-place-autocomplete' as any

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        fieldRef.current = field.onChange
        return (
          <FormField
            name={name}
            render={() => (
              <FormItem>
                {label && <FormLabel>{label}</FormLabel>}
                <FormControl>
                  <GmpPlaceAutocomplete
                    ref={autoRef}
                    placeholder={transl('form.address.placeholder')}
                    value={parseAddress(field.value) || ''}
                    included-region-codes={country ? country : undefined}
                    requested-language={'en'}
                    requested-region={country ? country : undefined}
                    style={{ width: '100%', padding: '2px', borderRadius: '2px' }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={onChange}></GmpPlaceAutocomplete>
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
        )
      }}
    />
  )
}

export default RHFGoogleAddressAutocomplete