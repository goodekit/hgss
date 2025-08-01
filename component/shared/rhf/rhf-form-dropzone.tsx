"use client"

import { useState } from 'react'
import { z, ZodSchema } from 'zod'
import { en } from 'public/locale'
import { GLOBAL } from 'hgss'
import { IMAGE } from 'hgss-design'
import { PATH_DIR } from 'hgss-dir'
import { Control, Path, PathValue, UseFormReturn } from 'react-hook-form'
import Image from 'next/image'
import { useToast } from 'hook'
import { X } from 'lucide-react'
import { FormField, FormLabel, FormMessage, FormItem, FormControl } from 'component/ui/form'
import { Card, CardContent } from 'component/ui/card'
import { deleteImage } from 'lib/action'
import { cn, transl, truncate } from 'lib/util'

type FormKeyLocale = keyof typeof en.form

interface RHFFormDropzoneProps<TSchema extends ZodSchema> {
  control    : Control<z.infer<TSchema>>
  formKey    : FormKeyLocale
  images     : string[] | string
  name       : Path<z.infer<TSchema>>
  form       : UseFormReturn<z.infer<TSchema>>
  withLabel ?: boolean
  folderName?: S3FolderName
}

const RHFFormDropzone = <TSchema extends ZodSchema>({ control, name, images, formKey, form, withLabel = true, folderName }: RHFFormDropzoneProps<TSchema>) => {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const { toast } = useToast()

  const handleUploadComplete = (res: { url: string }[]) => {
    const currentImages = form.getValues(name) as string[]
    const newUrls = res.map((r) => r.url).filter((url) => !currentImages.includes(url))
    form.setValue(name, [...currentImages, ...newUrls] as FieldName)
  };

  const handleDelete = async (index: number) => {
    const currentImages = form.getValues(name) as string[]
    const result = await deleteImage({ currentImages, index })
    if (result?.success) {
      const updatedImages = currentImages.filter((_, _i) => _i != index)
      form.setValue(name, updatedImages as PathValue<z.infer<TSchema>, Path<z.infer<TSchema>>>)
      toast({ description: en.success.file_deleted })
    } else {
      toast({ variant: 'destructive', description: en.error.unable_delete })
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const maxLimit = GLOBAL.LIMIT.MAX_UPLOAD_SIZE_GALLERY * 1024 * 1024

    const urls: { url: string }[] = []
    for (const file of files) {
      if (file.size > maxLimit) {
        toast({ variant: 'destructive', description: `File exceeds the ${GLOBAL.LIMIT.MAX_UPLOAD_SIZE_GALLERY}MB limit` })
        throw new Error(`File exceeds the ${GLOBAL.LIMIT.MAX_UPLOAD_SIZE_GALLERY}MB limit`)
      }

      const formData = new FormData()
      formData.append('file', file)

      if (folderName) {
        formData.append('folderName', folderName)
      }

      const xhr =  new XMLHttpRequest()

      xhr.upload.onprogress = (e) => {
        const percent = Math.round((e.loaded / e.total) * 100)
        setUploadProgress((prev) => ({...prev, [file.name]: percent}))
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText)
          urls.push({ url: data.url })
          setUploadProgress((prev) => {
            const copy = { ...prev }
            delete copy[file.name]
            return copy
          })
          if (urls.length) handleUploadComplete(urls)
        } else {
          toast({ variant:  'destructive', description: en.error.unable_upload })
        }
      }

      xhr.onerror = () => {
        toast({ variant: 'destructive', description: en.error.unable_upload })
      }

      xhr.open('POST', PATH_DIR.UPLOAD)
      xhr.send(formData)
    }
  }

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={'w-full'}>
          {withLabel && <FormLabel>{en.form[formKey].label}</FormLabel>}
          <Card>
            <CardContent className={'space-y-2 mt-2 min-h-32'}>
              <div className={"flex flex-col md:flex-row flex-start h-32 space-x-2"}>
                <div className={"flex-between space-x-2"}>
                  {typeof images === 'string' && (
                    <div className={'relative'}>
                      <X size={20} color={'red'} className={'absolute top-0 right-0 cursor-pointer'} onClick={() => handleDelete(0)} />
                      <Image src={images} alt={'image'} width={680} height={680} className={'w-full object-cover object-center rounded-sm'} />
                    </div>
                  )}
                  {Array.isArray(images) &&
                    images.map((image, index) => (
                      <div key={index} className={'relative'}>
                        <X size={20} color={'red'} className={'absolute top-0 right-0 cursor-pointer'} onClick={() => handleDelete(index)} />
                        <Image
                          src={image}
                          height={IMAGE.UPLOAD_THUMBNAIL_H}
                          width={IMAGE.UPLOAD_THUMBNAIL_W}
                          alt={'product-name'}
                          className={'w-20 h-20 object-cover rounded-sm'}
                        />
                      </div>
                    ))}
                </div>
                <FormControl className={'space-y-2 my-2 text-md '}>
                  <label className={"inline-block px-4 py-2 text-sm font-medium text-black hover:dark:text-white bg-punkpink cursor-pointer hover:bg-pink-500 hover:font-bold transition rounded-sm"}>
                    {transl('upload_images.label')}
                    <input type="file" accept="image/*" multiple max={4} onChange={(e) => handleUpload(e)} className={'hidden'} />
                  </label>
                </FormControl>
              </div>
              <div className={'ease-in-out transition-opacity'}>
                {Object.entries(uploadProgress).map(([filename, progress]) => (
                  <div key={filename} className={"w-full mt-2"}>
                    <div className={"text-xs"}>
                      {truncate(filename, 20)} - {progress}%
                    </div>
                    <div className={'w-full bg-gray-200 rounded-none h-2 overflow-hidden'}>
                      <div className={cn('bg-tape h-2 transition-all duration-500 ease-in-out')} style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default RHFFormDropzone
