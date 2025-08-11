'use client'

import { FC, Fragment, useEffect } from 'react'
import { PATH_DIR } from 'hgss-dir'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form'
import { useToast, usePreventNavigation, useFormState, useCleanupUnsubmittedImages } from 'hook'
import { Plus, MoveUpRight } from 'lucide-react'
import { GallerySchema, UpdateGallerySchema, galleryDefaultValue, galleryItemDefaultValue } from 'lib/schema'
import { createGallery, updateGallery, deleteGalleryItem } from 'lib/action/gallery.action'
import { deleteImage } from 'lib/action/image-action'
import { Form, Button } from 'component/ui'
import { LoadingBtn } from 'component/shared/btn'
import { RHFFormField, RHFFormImageUpload } from 'component/shared/rhf'
import { formatText, delay, cn, transl } from 'lib/util'
import GalleryItemForm from './gallery-item-form'

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

  const { control, formState, handleSubmit } = form
  const { errors }                                     = formState
  const cover                                          = form.watch('cover')
  const galleryItems                                   = form.getValues(`galleryItems`)
  const { fields, append, remove }                     = useFieldArray<CreateGallery>({ control, name: 'galleryItems' as never })

  usePreventNavigation(isDirty)
  useCleanupUnsubmittedImages(form, 'cover', '__submitted')

  useEffect(() => {
    setDirty(formState.isDirty)
  }, [formState.isDirty, setDirty])

 const onSubmit: SubmitHandler<UpdateGallery | CreateGallery> = async (data) => {
    if (Object.keys(errors).length > 0) {
      toast({ variant: 'destructive', description: transl('error.form') });
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
      form.setValue('__submitted', true)
    } catch (error) {
      toast({ variant: 'destructive', description: transl('error.gallery_save') + error })
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
            toast({ variant: 'destructive', description: transl('error.failed_delete_file') })
          } else {
            toast({ description: transl('success.deleted')})
          }
        } else {
          const imageResponse = await deleteImage({ currentImages: image })
          if (!imageResponse.success) {
            toast({ variant: 'destructive', description: transl('error.failed_delete_file') })
          } else {
            toast({ description: transl('success.deleted') })
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
          <div className={"flex flex-col md:flex-row gap-4"}>
            <RHFFormField control={control} name={'title'} formKey={'title'} withWrapper={false} />
          </div>
          <div className={"upload-field flex justify-evenly gap-4 h-auto"}>
            <div className={'w-2/3'}>
              <RHFFormField control={control} name={'description'} formKey={'description'} type={'textarea'} withWrapper={false} className={'h-40'} />
            </div>
            <span className={'w-1/3'}>
              <RHFFormImageUpload control={control} name={'cover'} formKey={'cover'} image={cover} form={form} />
            </span>
          </div>

          <div className={"flex flex-col gap-4"}>
            <div className={"flex flex-col gap-4"}>
              <label>{transl('form.gallery_item.label')}</label>
              {errors.galleryItems && <p className="text-sm text-destructive">{errors.galleryItems.message as string}</p>}
              {fields.map((field, index) => (
                <GalleryItemForm key={field.id} form={form} field={field} index={index} remove={remove} handleRemoveIndex={handleRemoveIndex} isUpdate={isUpdate} galleryItems={galleryItems} />
              ))}
              <Button type={'button'} variant={'ghost'} onClick={() => append({ ...galleryItemDefaultValue })} className={cn('font-bold w-full')}>
                {'+ '}{transl('form.gallery_item.placeholder')}
              </Button>
            </div>
          </div>
          <div className={"flex justify-end"}>
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
