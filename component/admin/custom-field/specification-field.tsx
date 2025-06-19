import { Button, Input } from "component/ui"
import { Plus } from 'lucide-react'
import { ArrayPath, FieldValues, FieldArrayWithId, UseFormRegister, Path } from 'react-hook-form'
import { transl, cn } from "lib/util"

type SpecificationFieldProps<TFieldValues extends FieldValues, TFieldArrayName extends ArrayPath<TFieldValues>> = {
 fields  : FieldArrayWithId<TFieldValues,    TFieldArrayName>[]
 register: UseFormRegister<TFieldValues>
 remove  : (index: number) => void
 onClick : () => void
}
const SpecificationField = <TFieldValues extends FieldValues, TFieldArrayName extends ArrayPath<TFieldValues>>({ fields, onClick, register, remove }: SpecificationFieldProps<TFieldValues, TFieldArrayName>) => {
    return (
         <div className={"flex flex-col gap-4"}>
            <label>{transl('form.specifications.label')}</label>
            {fields.map((field, index) => (
                <div key={index} className={"flex gap-2"}>
                    <Input {...register(`specifications.${index}` as Path<TFieldValues>)} className={"border p-2 rounded w-full"} />
                    <span><Button type={'button'} variant={'ghost'} className={cn('bg-punkpink text-black hover:bg-pink-500 hover:font-bold')} onClick={() => remove(index)}>{transl('remove.label')}</Button></span>
                </div>
            ))}
            <Button type={"button"} variant={'ghost'} onClick={onClick} className={cn('font-bold align-middle items-center text-button')}><Plus/><span>{transl('form.specifications.placeholder')}</span></Button>
        </div>
    )
}

export default SpecificationField