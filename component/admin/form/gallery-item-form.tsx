import { Path, UseFormReturn } from 'react-hook-form'
import { X } from 'lucide-react'
import { useCleanupUnsubmittedImages } from 'hook'
import { GallerySchema } from 'lib/schema'
import { Card, Button } from 'component/ui'
import { RHFFormField, RHFFormImageUpload } from 'component/shared/rhf'
import { cn } from 'lib'

type GalleryItemFormSchemaType = CreateGalleryItem | UpdateGalleryItem
type GalleryFormSchemaType     = CreateGallery | UpdateGallery

interface GalleryItemFormProps {
  form             : UseFormReturn<GalleryFormSchemaType>
  field            : GalleryItemFormSchemaType
  remove           : (index: number) => void
  index            : number
  isUpdate         : boolean
  galleryItems     : GalleryItemFormSchemaType[]
  handleRemoveIndex: (image: string, index: number) => void
}

const GalleryItemForm = ({ field, index, form, isUpdate, remove, galleryItems, handleRemoveIndex }: GalleryItemFormProps) => {
  const { control, register } = form
  const image                 = form.watch(`galleryItems.${index}.image` as Path<GalleryFormSchemaType>)
  const isEmptyImage          = (typeof image === 'string' && image === '') || (Array.isArray(image) && image.length === 0)

  useCleanupUnsubmittedImages(form, `galleryItems.${index}.image`, '__submitted')

  return (
    <Card key={(field as UpdateGalleryItem).id} className={'relative flex flex-col w-full p-2'}>
      {!(isUpdate && galleryItems.filter((item: UpdateGalleryItem) => !!item?.id).length === 1 && (galleryItems[index] as UpdateGalleryItem)?.id) && (
        <div className={'absolute -top-2 -right-2 md:top-0 md:-right-11'}>
          {isEmptyImage ? (
            <Button type={'button'} size={'sm'} variant={'destructive'} className={cn('text-black rounded-l-none')} onClick={() => remove(index)}>
              <X />
            </Button>
          ) : (
            <Button type={'button'} size={'sm'} variant={'destructive'} className={cn('text-black rounded-l-none')} onClick={() => handleRemoveIndex(image as string, index)}>
              <X />
            </Button>
          )}
        </div>
      )}
      <input type="hidden" {...register(`galleryItems.${index}.id` as Path<GalleryFormSchemaType>)} />
      <div className={'flex flex-col md:flex-row justify-evenly gap-2'}>
        <div className={'w-full'}>
          <RHFFormField
            control={control}
            formKey={'title'}
            {...register(`galleryItems.${index}.title` as Path<GalleryFormSchemaType>)}
            withLabel={false}
            withBorder={false}
            className={'border-b p-2 rounded w-full'}
          />
          <RHFFormField
            control={control}
            formKey={'description'}
            type={'textarea'}
            {...register(`galleryItems.${index}.description` as Path<GalleryFormSchemaType>)}
            withLabel={false}
            withBorder={false}
            className={'p-2 rounded w-full'}
          />
        </div>
        <div className={'w-full md:w-1/3'}>
          <RHFFormImageUpload<typeof GallerySchema>
            control={control}
            name={`galleryItems.${index}.image`}
            formKey={'image'}
            image={form.watch(`galleryItems.${index}.image` as Path<GalleryFormSchemaType>) as string}
            form={form}
            withLabel={false}
            folderName={'gallery'}
          />
        </div>
      </div>
    </Card>
  )
}

export default GalleryItemForm