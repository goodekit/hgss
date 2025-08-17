"use client"

import { useState } from 'react'
import { GLOBAL } from 'hgss'
import { PATH_DIR } from 'hgss-dir'
import Image from 'next/image'
import { z, ZodSchema } from 'zod'
import { Control, Path, UseFormReturn } from 'react-hook-form'
import { useToast } from 'hook'
import { X, ImageUp } from 'lucide-react'
import { deleteImage } from 'lib/action'
import { cn, transl } from 'lib'
import { FormField, FormLabel, FormMessage, FormItem, FormControl } from 'component/ui/form'
import { Card, CardContent } from 'component/ui/card'

type FormKeyLocale = keyof AppLocale['form']

interface RHFFormImageUploadProps<TSchema extends ZodSchema> {
  control    : Control<z.infer<TSchema>>
  formKey    : FormKeyLocale
  image      : string
  name       : Path<z.infer<TSchema>>
  form       : UseFormReturn<z.infer<TSchema>>
  withLabel ?: boolean
  folderName?: S3FolderName
}

const RHFFormImageUpload = <TSchema extends ZodSchema>({ control, name, image, formKey, form, withLabel = true, folderName }: RHFFormImageUploadProps<TSchema>) => {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const { toast }                           = useToast()

  const handleUploadComplete = (res: { url: string }) => {
    form.setValue(name, res.url as SetFieldName)
  }

  const handleDelete = async () => {
    const currentImage = form.getValues(name)
    const result       = await deleteImage({ currentImages: currentImage })
    if (result?.success) {
      form.setValue(name, '' as SetFieldName)
      toast({ description: transl('success.file_deleted') })
    } else {
      toast({ variant: 'destructive', description: transl('error.unable_delete') })
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const maxFileSizeLimit = GLOBAL.LIMIT.MAX_UPLOAD_SIZE_GALLERY * 1024 * 1024

    if (file.size > maxFileSizeLimit) {
      toast({ variant: 'destructive', description: `File exceeds the ${maxFileSizeLimit}MB limit` })
      throw new Error(`File exceeds the ${maxFileSizeLimit}MB limit`)
    }

    const formData = new FormData()
    formData.append('file', file)

    if (folderName) {
      formData.append('folderName', folderName)
    }

    const xhr = new XMLHttpRequest()

    xhr.upload.onprogress = (e) => {
      const percent = Math.round((e.loaded / e.total) * 100)
      setUploadProgress((prev) => ({ ...prev, [file.name]: percent }))
    }

    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText)
        handleUploadComplete({ url: data.url })
        setUploadProgress((prev) => {
          const copy = { ...prev }
          delete copy[file.name]
          return copy
        })
      } else {
        toast({ variant: 'destructive', description: transl('error.unable_upload') })
      }
    }

    xhr.onerror = () => {
      toast({ variant: 'destructive', description: transl('error.unable_upload') })
    }

    xhr.open('POST', PATH_DIR.UPLOAD)
    xhr.send(formData)
  }

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={'w-full'}>
          {withLabel && <FormLabel>{transl(`form.${formKey}.label`)}</FormLabel>}
          <Card>
            <CardContent className={'space-y-2 mt-2 '}>
                  {image && (
                    <div className={'relative'}>
                      <X size={20} color={'red'} className={'absolute top-0 right-0 bg-gray-400 cursor-pointer'} onClick={() => handleDelete()} />
                      <Image src={image} alt={'image'} width={100} height={100} className={'object-cover w-full object-center rounded-sm'} />
                    </div>
                  )}
                <FormControl className={'space-y-2 my-2 text-md'}>
                  <label className={cn("inline-block px-4 py-2 text-sm font-medium text-black cursor-pointer hover:bg-punk-dark transition rounded-sm w-full",
                      image
                        ? 'pointer-events-none text-muted-foreground dark:text-white'
                        : 'text-muted-foreground flex flex-col items-center justify-center text-center gap-2 min-h-32'
                    )}>
                    {!image && (
                      <div className="flex flex-col items-center justify-center">
                        <ImageUp size={40} />
                        {transl('upload.description')}
                      </div>
                    )}
                    <input disabled={image !== ''} type="file" accept="image/*" onChange={(e) => handleUpload(e)} className={'hidden'} />
                  </label>
                </FormControl>

              <div className={'ease-in-out transition-opacity'}>
                {Object.entries(uploadProgress).map(([filename, progress]) => (
                  <div key={filename} className="w-full mt-2">
                    <div className="text-xs">
                      {filename} - {progress}%
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

export default RHFFormImageUpload
