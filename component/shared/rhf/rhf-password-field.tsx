'use client'

import { useState } from 'react'
import { en } from 'hgss-locale'
import { z, ZodSchema } from 'zod'
import { Path, useForm } from 'react-hook-form'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Input } from 'component/ui'
import { Label } from 'component/ui/label'
import { transl } from 'lib/util'
import { KEY } from "lib/constant"

type FormKeyLocale = keyof typeof en.form
interface RHFPasswordFieldProps <TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>> {
    register : (name: TName) => ReturnType<ReturnType<typeof useForm>['register']>
    name     : TName
    label    : string
    error   ?: string
    formKey  : FormKeyLocale
}

const RHFPasswordField = <TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>>({ register, name, label, error, formKey }: RHFPasswordFieldProps<TSchema, TName>) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
      <div>
        <Label htmlFor={name}>{label}</Label>
        <div className="relative">
          <Input
            id={name}
            aria-label={'password-toggle'}
            {...register(name)}
            name={name}
            type={showPassword ? KEY.TEXT : KEY.PASSWORD}
            autoComplete={KEY.PASSWORD}
            placeholder={transl(`form.${formKey}.placeholder` as const)}
            required
          />
          <button type={'button'} onClick={togglePassword} className={'absolute inset-y-0 right-3 items-center flex text-muted-foreground'}>
            {showPassword ? <EyeIcon size={15} /> : <EyeOffIcon size={15} />}
          </button>
        </div>
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    )
}

export default RHFPasswordField