
import { z, ZodSchema } from 'zod'
import { en } from 'public/locale'
import { Control, ControllerRenderProps, Path } from 'react-hook-form'
import { Textarea } from 'component/ui'
import { FormField, FormControl, FormLabel, FormMessage, FormItem } from 'component/ui/form'
import { Input } from 'component/ui/input'
import { Button } from 'component/ui/button'
import { cn, transl } from 'lib/util'

type FormKeyLocale = keyof typeof en.form
type FormFieldType = 'input' | 'inputWithButton' | 'textarea'

interface RHFFormFieldProps<TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>> {
  control     : Control<z.infer<TSchema>>
  name        : TName
  formKey     : FormKeyLocale
  type       ?: FormFieldType
  disabled   ?: boolean
  className  ?: string
  withWrapper?: boolean
  withButton ?: boolean
  buttonLabel?: string
  onClick    ?: () => void
  withLabel  ?: boolean
  withBorder ?: boolean
}

interface RHFFormFieldControllerRender<TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>> {
  field: ControllerRenderProps<z.infer<TSchema>, TName>
}

const RHFFormField = <TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>>({ control, name, formKey, disabled = false, withWrapper = true, className, type = 'input', buttonLabel, onClick, withLabel = true, withBorder = true }: RHFFormFieldProps<TSchema, TName>) => {
  const FormFieldComponent = (
    <FormField
    control={control}
    name={name}
    render={({ field }: RHFFormFieldControllerRender<TSchema, TName>) => (
      <FormItem className={"w-full"}>
        {withLabel && (
          <FormControl>
            <FormLabel className={cn(disabled ? 'text-muted-foreground opacity-25' : 'peer-invalid:text-red-600')}>{transl(`form.${formKey}.label` as const)}</FormLabel>
          </FormControl>
        )}
        {
        type === 'inputWithButton' ? (
          <div className={'flex flex-row items-center gap-2'}>
            <Input disabled={disabled} placeholder={transl(`form.${formKey}.placeholder` as const)} {...field} />
           <span><Button type={'button'} variant={'ghost'} className={'bg-punkpink text-black hover:bg-pink-500 hover:font-bold'} onClick={onClick}>{buttonLabel}</Button></span>
          </div>
        )
        :
        type === 'textarea' ? (
          <Textarea disabled={disabled} placeholder={transl(`form.${formKey}.placeholder` as const)} {...field} className={cn('resize-none', !withBorder && 'border-none')} />
        )
        :
        type === 'input' ?
        (
          <Input disabled={disabled} placeholder={transl(`form.${formKey}.placeholder` as const)} {...field} className={cn(!withBorder && 'border-none')} />
        ):
        (
          <Input disabled={disabled} placeholder={transl(`form.${formKey}.placeholder` as const)} {...field} className={cn(!withBorder && 'border-none')} />
        )}
        {!disabled && <FormMessage />}
      </FormItem>
    )}/>
  )

  return withWrapper ?  (
    <div className={cn("flex flex-col md:flex-row gap-5", className)}>
      {FormFieldComponent}
    </div>
  ) : FormFieldComponent
}

export default RHFFormField
