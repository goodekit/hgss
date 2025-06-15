'use client'

import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Input } from 'component/ui/input'
import { Label } from 'component/ui/label'
import { KEY } from 'lib/constant'

const FormPasswordField = ({ name, label  }: { name: string, label: string }) => {
    const [showPassword, setShowPassword] = useState(false);

    function togglePassword(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        setShowPassword((prevState: unknown) => !prevState)
    }

    return (
      <div>
        <Label htmlFor={name}>{label}</Label>
        <div className="relative">
          <Input
            id={'password-toggle'}
            aria-label={'password-toggle'}
            name={name}
            type={showPassword ? KEY.TEXT : KEY.PASSWORD}
            autoComplete={name}
            defaultValue={''}
            required
          />
          <button type={'button'} onClick={togglePassword} className={'absolute inset-y-0 right-3 items-center flex text-muted-foreground'}>
            {showPassword ? <EyeIcon size={15} /> : <EyeOffIcon size={15} />}
          </button>
        </div>
      </div>
    )
}

export default FormPasswordField