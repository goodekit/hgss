'use client'

import { FC, Fragment, useEffect } from 'react'
import { en } from 'public/locale'
import { PATH_DIR } from 'hgss-dir'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form'
import { useToast, usePreventNavigation, useFormState } from 'hook'
import { Plus, MoveUpRight, X } from 'lucide-react'
import { GallerySchema, UpdateGallerySchema, galleryDefaultValue, galleryItemDefaultValue } from 'lib/schema'
import { createGallery, updateGallery, deleteGalleryItem } from 'lib/action/gallery.action'
import { deleteImage } from 'lib/action/image-action'
import { Form, Button, Card } from 'component/ui'
import { LoadingBtn } from 'component/shared/btn'
import { RHFFormField, RHFFormImageUpload } from 'component/shared/rhf'
import { formatText, delay, cn, transl } from 'lib/util'

const TAG = 'Gallery'
const GalleryForm: FC<GalleryForm> = ({ type, gallery, galleryId }) => {
 const { toast }             = useToast()
 const { isDirty, setDirty } = useFormState()
 const router                = useRouter()
 const isUpdate              = type === 'update'
 const form                  = useForm<UpdateGallery | CreateGallery>({
   resolver     : isUpdate ? zodResolver(UpdateGallerySchema): zodResolver(GallerySchema),
   defaultValues: isUpdate && gallery ? gallery              : galleryDefaultValue
 })

  const { control, formState, register, handleSubmit } = form
  const { errors }                                     = formState
  const cover                                          = form.watch('cover')
  const image                                          = (index:number) =>  form.watch(`galleryItems.${index}.image`)
  const galleryItems                                   = form.getValues(`galleryItems`)
  const { fields, append, remove }                     = useFieldArray<CreateGallery>({ control, name: 'galleryItems' as never })

  usePreventNavigation(isDirty)

  useEffect(() => {
    setDirty(formState.isDirty)
  }, [formState.isDirty, setDirty])

 const onSubmit: SubmitHandler<UpdateGallery | CreateGallery> = async (data) => {
    if (Object.keys(errors).length > 0) {
      toast({ variant: 'destructive', description: en.error.form });
      return
    }
    try {
      await delay(500)
      if (type === 'create') {
        const response = await createGallery(data)
        if (!response.success) {
          toast({ variant: 'destructive', description: response.message })
        } else {
          toast({ description: response.message })
          router.push(PATH_DIR.ADMIN.GALLERY)
        }
      }

      if (type === 'update' && galleryId) {
        const response = await updateGallery(data)
        if (!response.success) {
          toast({ variant: 'destructive', description: response.message })
        } else {
          toast({ description: response.message })
          router.push(PATH_DIR.ADMIN.GALLERY)
        }
      }
      // router.push(PATH_DIR.ADMIN.GALLERY)
    } catch (error) {
      toast({ variant: 'destructive', description: en.error.gallery_save + error })
    }
  }

  const handleRemoveIndex = async (image: string, index: number) => {
    try {
      await delay(500)
      if (image && image.startsWith('http')) {
        const itemId = form.getValues(`galleryItems.${index}.id`)
        if (itemId) {
          const response = await deleteGalleryItem(itemId)
          if (!response.success) {
            toast({ variant: 'destructive', description: en.error.failed_delete_file })
          } else {
            toast({ description: en.success.deleted })
          }
        } else {
          const imageResponse = await deleteImage({ currentImages: image })
          if (!imageResponse.success) {
            toast({ variant: 'destructive', description: en.error.failed_delete_file })
          } else {
            toast({ description: en.success.deleted })
          }
        }
      }

      remove(index)
    } catch (error: unknown) {
      toast({ variant: 'destructive', description: String(error) })
    }
  }

  return (
    <Fragment>
      <Form {...form}>
        <form method={'POST'} onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4">
            <RHFFormField control={control} name={'title'} formKey={'title'} withWrapper={false} />
          </div>
          <div className="upload-field gap-4 h-auto">
            <RHFFormField control={control} name={'description'} formKey={'description'} type={'textarea'} withWrapper={false} />
          </div>

          <div className={'w-full flex justify-end'}>
            <div className={'w-1/3'}>
              <RHFFormImageUpload control={control} name={'cover'} formKey={'cover'} image={cover} form={form} />
            </div>
          </div>

          <div className=" flex flex-col gap-4">
            {/* TODO: put in the components */}
            <div className="flex flex-col gap-4">
              <label>{en.form.gallery_item.label}</label>
              {errors.galleryItems && <p className="text-sm text-destructive">{errors.galleryItems.message as string}</p>}
              {fields.map((field, index) => (
                <Card key={field.id} className={'relative flex flex-col w-full p-2'}>
                  {!(isUpdate && galleryItems.filter((item: UpdateGalleryItem) => !!item?.id).length === 1 && (galleryItems[index] as UpdateGalleryItem)?.id) && (
                    <div className="absolute -top-2 -right-2 md:top-0 md:-right-11">
                      {image(index) === '' ? (
                        <Button type={'button'} size={'sm'} variant={'destructive'} className={cn('text-black rounded-l-none')} onClick={() => remove(index)}> <X /> </Button>
                      ) : (
                        <Button type={'button'} size={'sm'} variant={'destructive'} className={cn('text-black rounded-l-none')} onClick={() => handleRemoveIndex(image(index), index)}> <X /> </Button>
                      )}
                    </div>
                  )}
                  <input type="hidden" {...register(`galleryItems.${index}.id`)} />
                  <div className={'flex flex-col md:flex-row justify-evenly gap-2'}>
                    <div className={'w-full'}>
                      <RHFFormField
                        control={control}
                        formKey={'title'}
                        {...register(`galleryItems.${index}.title`)}
                        withLabel={false}
                        withBorder={false}
                        className={'border-b p-2 rounded w-full'}
                      />
                      <RHFFormField
                        control={control}
                        formKey={'description'}
                        type={'textarea'}
                        {...register(`galleryItems.${index}.description`)}
                        withLabel={false}
                        withBorder={false}
                        className={'p-2 rounded w-full'}
                      />
                    </div>
                    <div className={'w-full md:w-1/3'}>
                      <RHFFormImageUpload
                        control={control}
                        name={`galleryItems.${index}.image`}
                        formKey={'image'}
                        image={form.watch(`galleryItems.${index}.image`)}
                        form={form}
                        withLabel={false}
                        folderName={'gallery'}
                      />
                    </div>
                  </div>
                </Card>
              ))}
              <Button type={'button'} variant={'ghost'} onClick={() => append({ ...galleryItemDefaultValue })} className={cn('font-bold w-full')}>
                {'+ '}{transl('form.gallery_item.placeholder')}
              </Button>
            </div>
          </div>
          <div className="flex justify-end">
            <LoadingBtn
              variant={'link'}
              isPending={formState.isSubmitting}
              label={formatText(`${type} ${TAG}`, 'capitalize')}
              disabled={formState.isSubmitting}
              className={'min-w-24 sm:w-full texture-bg permanent-marker-regular text-xl text-black bg-transparent'}
              icon={type === 'create' ? <Plus size={20} /> : <MoveUpRight size={20} />}
            />
          </div>
        </form>
      </Form>
    </Fragment>
  )
}

export default GalleryForm
