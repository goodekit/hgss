'use client'

import { useEffect, useRef } from 'react'
import { z, ZodSchema } from 'zod'
import { Controller, Path, Control, useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from 'component/ui/form'
import { Input } from 'component/ui/input'
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

const RHFGoogleAddressAutocomplete = <TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>>({ control, name, label, country, fullName, onFocus, onBlur, onChange }: RHFGoogleAddressAutocompleteProps<TSchema, TName>) => {
  const inputRef     = useRef<HTMLInputElement | null>(null)
  const fieldRef     = useRef<((value: unknown) => void) | null>(null)
  const { setValue } = useFormContext()

  useEffect(() => {
    if (!window.google || !inputRef.current) return

    inputRef.current.value = ''

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      ...(country ? {  componentRestrictions: { country } } : {}),
      fields: ['address_component', 'geometry']
    })

    autocomplete.addListener('place_changed', () => {
      const place        = autocomplete.getPlace()
      const getComponent = (type: string) => place.address_components?.find((c) => c.types.includes(type))?.long_name || ''
      const streetNumber = getComponent('street_number')
      const route        = getComponent('route')
      const city         = getComponent('locality') || getComponent('postal_town') || getComponent('administrative_area_level_2') || getComponent('administrative_area_level_1')
      const postalCode   = getComponent('postal_code')
      const country      = getComponent('country')
      const latitude     = place.geometry?.location?.lat()?.toString() || ''
      const longitude    = place.geometry?.location?.lng()?.toString() || ''
      const fullAddress  = [ streetNumber && route ? `${streetNumber} ${route}` : route, city, postalCode, country ]
        .filter(Boolean)
        .join(', ')

      setValue('streetAddress', `${streetNumber} ${route}`)
      setValue('city', city)
      setValue('postalCode', postalCode)
      setValue('latitude', latitude)
      setValue('longitude', longitude)

      if (fullName) {
        setValue('fullName', fullName)
      }

      fieldRef.current?.(fullAddress)
    })

    return () => {
      google.maps.event.clearInstanceListeners(autocomplete)
    }
  }, [control, name, country, fullName])

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
                  <Input ref={inputRef} placeholder={transl('form.address.placeholder')} defaultValue={parseAddress(field.value) || ''} onFocus={onFocus} onBlur={onBlur} onChange={onChange} />
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