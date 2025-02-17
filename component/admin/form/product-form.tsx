'use client'

import { FC, Fragment, useEffect } from 'react'
import { en } from 'public/locale'
import { PATH_DIR } from 'hgss-dir'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form'
import { useToast, usePreventNavigation, useFormState } from 'hook'
import slugify from 'slugify'
import { Plus, MoveUpRight } from 'lucide-react'
import { ProductSchema, UpdateProductSchema, productDefaultValue } from 'lib/schema'
import { createProduct, updateProduct } from 'lib/action'
import { Form, Button } from 'component/ui'
import { BannerUploadField } from 'component/admin/custom-field'
import { LoadingBtn } from 'component/shared/btn'
import { RHFFormField, RHFFormDropzone, RHFCheckbox } from 'component/shared/rhf'
import { capitalize, delay } from 'lib/util'

const ProductForm: FC<ProductForm> = ({ type, product, productId }) => {
  const { toast }             = useToast()
  const { isDirty, setDirty } = useFormState()
  const router                = useRouter()
  const form                  = useForm<Product>({
    resolver: type === 'update' ? zodResolver(UpdateProductSchema) : zodResolver(ProductSchema),
    defaultValues: product && type === 'update' ? product : productDefaultValue
  })

  const { control, formState, register, handleSubmit } = form
  const { errors }                           = formState
  const images                               = form.watch('images')
  const isFeatured                           = form.watch('isFeatured')
  const banner                               = form.watch('banner')

  const { fields, append, remove } = useFieldArray({ control, name: 'specifications' })

  usePreventNavigation(isDirty)

  useEffect(() => {
    setDirty(formState.isDirty)
  }, [formState.isDirty, setDirty])

  const handleSlugify = () => {
    form.setValue('slug', slugify(form.getValues('name'), { lower: true }))
  }

 const onSubmit: SubmitHandler<CreateProduct> = async (data) => {
  if (Object.keys(errors).length > 0) {
    toast({ variant: 'destructive', description: 'Please fix form errors before submitting.' });
    return
  }
    try {
      await delay(500)
      if (type === 'create') {
        const response = await createProduct(data)
        if (!response.success) {
          toast({ variant: 'destructive', description: response.message })
        } else {
          toast({ description: response.message })
        }
      }

      if (type === 'update' && productId) {
        const response = await updateProduct({ ...data, id: productId })
        if (!response.success) {
          toast({ variant: 'destructive', description: response.message })
        } else {
          toast({ description: response.message })
        }
      }
      router.push(PATH_DIR.ADMIN.PRODUCT)
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'An error occurred while saving the product' + error
      })
    }
  }


  return (
    <Fragment>
      <Form {...form}>
        <form method={'POST'} onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4">
            <RHFFormField control={control} name={'name'} formKey={'name'} withWrapper={false} />
            <RHFFormField
              control={control}
              name={'slug'}
              formKey={'slug'}
              type={'inputWithButton'}
              withWrapper={false}
              buttonLabel={en.generate.label}
              onClick={handleSlugify}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <RHFFormField control={control} name={'category'} formKey={'category'} withWrapper={false} />
            <RHFFormField control={control} name={'brand'} formKey={'brand'} withWrapper={false} />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <RHFFormField control={control} name={'price'} formKey={'price'} withWrapper={false} />
            <RHFFormField control={control} name={'stock'} formKey={'stock'} withWrapper={false} />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <RHFFormField control={control} name={'model'} formKey={'model'} withWrapper={false} />
          </div>
          <div className=" flex flex-col md:flex-col gap-4">
            <div className="flex flex-col gap-4">
                <label>{en.form.specifications.label}</label>
                {fields.map((field, index) => (
                  <div key={field.id} className={"flex gap-2"}>
                    <input {...register(`specifications.${index}` as const)}
                      className="border p-2 rounded w-full"
                    />
                    <Button type="button" onClick={() => remove(index)}>{en.remove.label}</Button>
                  </div>
                ))}
                <Button type="button" onClick={() => append('')}>{'+ '}{en.form.specifications.placeholder}</Button>
              </div>
          </div>
          <div className="upload-field flex flex-col md:flex-row gap-4">
            <RHFFormDropzone control={control} name={'images'} formKey={'images'} images={images} form={form} />
          </div>
          <div className="upload-field gap-4 h-auto">
            <RHFFormField control={control} name={'description'} formKey={'description'} type={'textarea'} withWrapper={false} />
          </div>
          <div className="upload-field gap-4 h-auto">
            <RHFCheckbox control={control} name={'isFeatured'} formKey={'featured'} />
          </div>
          <div className="upload-field gap-4">
            <BannerUploadField isFeatured={isFeatured} banner={banner!} onClientUploadComplete={(res: { url: string }[]) => { form.setValue('banner', res[0].url ) }}  />
          </div>
          <div className="flex justify-end">
            <LoadingBtn
              isPending={formState.isSubmitting}
              label={`${capitalize(type)} Product`}
              disabled={formState.isSubmitting}
              className={'min-w-24 sm:w-full'}
              icon={type === 'create' ? <Plus size={20} /> : <MoveUpRight size={20} />}
            />
          </div>
        </form>
      </Form>
    </Fragment>
  )
}

export default ProductForm
