'use client'

import { useState } from 'react'
import { z, ZodSchema } from 'zod'
import { Path, useForm } from 'react-hook-form'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Input } from 'component/ui'
import { Label } from 'component/ui/label'
import { KEY } from "lib/constant"

interface RHFPasswordFieldProps <TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>> {
    register: (name: TName) => ReturnType<ReturnType<typeof useForm>['register']>
    name    : TName
    label   : string
}

const RHFPasswordField = <TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>>({ register, name, label }: RHFPasswordFieldProps<TSchema, TName>) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }


    return (
      <div>
        <Label htmlFor={name}>{label}</Label>
        <div className="relative">
          <Input
            id={'password-toggle'}
            aria-label={'password-toggle'}
            {...register(name)}
            name={name}
            type={showPassword ? KEY.TEXT : KEY.PASSWORD}
            autoComplete={KEY.PASSWORD}
            required
          />
          <button type={'button'} onClick={togglePassword} className={'absolute inset-y-0 right-3 items-center flex text-muted-foreground'}>
            {showPassword ? <EyeIcon size={15} /> : <EyeOffIcon size={15} />}
          </button>
        </div>
      </div>
    )
}

export default RHFPasswordField