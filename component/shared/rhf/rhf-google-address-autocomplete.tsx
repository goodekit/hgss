/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useRef } from 'react'
import { z, ZodSchema } from 'zod'
import { Controller, Path, Control, useFormContext, UseFormReturn } from 'react-hook-form'
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from 'component/ui/form'
import { transl } from 'lib'

interface RHFGoogleAddressAutocompleteProps<TSchema extends ZodSchema,TName extends Path<z.infer<TSchema>>> {
  control  : Control<z.infer<TSchema>>
  form     : UseFormReturn<z.infer<TSchema>>
  name     : TName
  label   ?: string
  country ?: string
  fullName?: string
  readonly?: boolean
  onFocus ?: () => void
  onBlur  ?: () => void
  onChange?: () => void
}

function RHFGoogleAddressAutocomplete<TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>>({ control, name, label, country, readonly, fullName, onFocus, onBlur, onChange, form }: RHFGoogleAddressAutocompleteProps<TSchema, TName>) {
  const autoRef      = useRef<any>(null)
  const fieldRef     = useRef<((value: unknown) => void) | null>(null)
  const { setValue } = useFormContext()

  const setFormatted = (val: string) => {
    fieldRef.current?.(val)
    setValue(name as string, val , { shouldValidate: true, shouldDirty: true })
  }

  useEffect(() => {
    const el = autoRef.current as any
    if (!el) return

    if (!autoRef.current) return

    const handlePlaceChange = (event: any) => {
      const place = event?.place
      if (!place) return

      const get = (type: string) => place.addressComponents?.find((c: any) => c.types.includes(type))?.longText || ''

      const formattedAddress = place.formattedAddress || place.displayName || ''
      const streetNumber     = get('street_number')
      const route            = get('route')
      const city             = get('locality') || get('postal_town') || get('administrative_area_level_2') || get('administrative_area_level_1')
      const postalCode       = get('postal_code')
      const countryVal       = get('country')
      const countryComp      = place.addressComponents?.find((_c: any) => _c.types.includes('country'))
      const countryLong      = countryComp?.longText || ''
      const countryShort     = countryComp?.shortText || ''

      let   latitude         = ''
      let   longitude        = ''

      const loc = place.location
      if (loc) {
        if (typeof loc.lat === 'function') {
          latitude  = String(loc.lat())
          longitude = String(loc.lng())
        } else if (typeof (loc as any).lat === 'number') {
          latitude  = String((loc as any).lat)
          longitude = String((loc as any).lng)
        } else if ('latitude' in loc && 'longitude' in loc) {
          latitude = String((loc as any).latitude)
          longitude = String((loc as any).longitude)
        }
      }
      const streetAddress = [streetNumber, route].filter(Boolean).join(' ')
      const fullAddress   = [streetAddress ||  formattedAddress, city, postalCode, countryVal]
        .filter(Boolean)
        .join(', ')

      setFormatted(formattedAddress)
      const currentCountry = (form.getValues('country' as TName) as unknown as string) || ''
      if (!currentCountry && (countryShort || countryLong)) {
        setValue('country', countryShort || countryLong, { shouldValidate: true })
      }
      setValue('address', fullAddress, { shouldDirty: true })
      setValue('streetAddress', `${streetNumber} ${route}`, { shouldDirty: true })
      setValue('city', city)
      setValue('postalCode', postalCode, { shouldDirty: true })
      setValue('latitude', latitude, { shouldDirty: true })
      setValue('longitude', longitude, { shouldDirty: true })

      if (fullName) setValue('fullName', fullName, { shouldDirty: true })

      form.trigger()
      onChange?.()
    }

      const handleSelect = async (evt: any) => {
        try {
          let place: any | null = null
          if (evt?.placePrediction?.toPlace) {
            place = evt.placePrediction.toPlace()
            if (place?.fetchFields) {
              await place.fetchFields({
                fields: ['formattedAddress', 'addressComponents', 'location', 'displayName']
              })
            }
          }
          if (place) handlePlaceChange({ place })
        } catch (err) {
          console.error('Places select error:', err)
        }
      }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value ?? ''
      fieldRef.current?.(val)
      onChange?.()
    }


    const handleFocus = () => onFocus?.()
    const handleBlur  = ()  => onBlur?.()

    el.addEventListener('gmp-select', handleSelect)
    el.addEventListener('gmp-placeselect', handleSelect)
    el.addEventListener('input', handleInput)
    el.addEventListener('focus', handleFocus)
    el.addEventListener('blur', handleBlur)

    return () => {
      el?.removeEventListener('gmp-select', handleSelect)
      el?.removeEventListener('gmp-placeselect', handleSelect)
      el.removeEventListener('input', handleInput)
      el.removeEventListener('focus', handleFocus)
      el.removeEventListener('blur', handleBlur)
    }
  }, [onBlur, onFocus, onChange, setValue, fullName])

  // to avoid build err: bypass type checking by wrapping in any
  const GmpPlaceAutocomplete = 'gmp-place-autocomplete' as any
  const regionCode           = country && country.length === 2 ? country : undefined
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        fieldRef.current = field.onChange
        const displayValue = readonly ? `${fullName ? `${fullName}, ` : ''}${field.value || ''}${country ? `, ${country}` : ''}` : (field.value || '')
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
                    value={displayValue}
                    included-region-codes={regionCode}
                    requested-language={'en'}
                    requested-region={country ? country : undefined}
                    style={{ width: '100%', borderRadius: '2px' }}
                    autofocus={!readonly}></GmpPlaceAutocomplete>
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