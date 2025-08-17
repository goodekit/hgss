
import { Fragment, JSX, useState } from 'react'
import { z, ZodSchema } from 'zod'
import { Control, ControllerRenderProps, Path } from 'react-hook-form'
import countries from 'world-countries'
import { FormField, FormControl, FormLabel, FormMessage, FormItem } from 'component/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'component/ui/select'
import { transl } from 'lib'

type FormKeyLocale = keyof AppLocale['form']
interface CountrySelectOptions { label: string, value: string, flag: string }
interface RHFFormCountrySelectProps<TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>> {
  control       : Control<z.infer<TSchema>>
  name          : TName
  formKey       : FormKeyLocale
  options      ?: CountrySelectOptions[]
  icon         ?: JSX.Element
  disabled     ?: boolean
  className    ?: string
  defaultOption?: string
}

interface RHFFormSelectControllerRender<TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>> {
  field: ControllerRenderProps<z.infer<TSchema>, TName>
}

const defaultCountryOptions = countries.map((country) => ({
  label: country.name.common,
  value: country.cca2.toUpperCase(),
  flag : country.flag
}))

const RHFFormCountrySelect = <TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>>({ control, name, formKey, options, icon, disabled = false,  className, defaultOption }: RHFFormCountrySelectProps<TSchema, TName>) => {
  const [searchTerm, setSearchTerm] = useState('')
  const countryOptions              = options ?? defaultCountryOptions
  const currentValueLabel           = countryOptions.find(_opt => _opt?.value?.toUpperCase() === (defaultOption ?? '')?.toUpperCase())?.label ?? transl(`form.${formKey}.placeholder`)

  const sortedCountriesOptions = countryOptions?.sort((a, b) => {
    const priority  = ['nz', 'au']
    const aPriority = priority.indexOf(a.value)
    const bPriority = priority.indexOf(b.value)

    if (aPriority !== -1 && bPriority !== -1) {
      return aPriority - bPriority
    }
    if (!aPriority) return -1
    if (!bPriority) return -1
    return a.label.localeCompare(b.label)
  })

  const filteredOptions = sortedCountriesOptions.filter(_country => _country.label.toLowerCase().includes(searchTerm.toLowerCase()) || _country.value.toLowerCase().includes(searchTerm.toLowerCase()))

  const FormFieldComponent = (
    <FormField
    control={control}
    name={name}
    render={({ field }: RHFFormSelectControllerRender<TSchema, TName>) => (
      <FormItem className={"w-full special-elite relative"}>
        <FormLabel>{transl(`form.${formKey}.label`)}</FormLabel>
        <Select onValueChange={field.onChange} value={field.value?.toString() || ''}  defaultValue={defaultOption}>
          <FormControl>
            <SelectTrigger disabled={disabled}>
            <SelectValue placeholder={currentValueLabel}>
              {countryOptions.find(_opt => _opt.value === field.value)?.label || transl(`form.${formKey}.label`)}
            </SelectValue>
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <input type={'text'} placeholder={'Search country...'} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className={'mb-2 px-2 py-1 border rounded w-full sticky z-30 top-0'} />
            {Array.isArray(filteredOptions) && filteredOptions.map((option: CountrySelectOptions, index: number) => (
              <SelectItem key={index} value={option.value}>
               <div className={'relative py-0 text-center items-center flex special-elite'}>{option.flag} &nbsp; {option.label}&nbsp;<span>{icon && ( <Fragment>{icon}</Fragment>)}</span></div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}/>
  )

  return (
    <div className={className}>
      {FormFieldComponent}
    </div>
  )
}

export default RHFFormCountrySelect
