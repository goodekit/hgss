
"use client"

import { Fragment, useState } from 'react'
import { en } from 'public/locale'
import Image from 'next/image'
import { z, ZodSchema } from 'zod'
import { UseFormReturn } from 'react-hook-form'
import { X } from 'lucide-react'
import { useToast } from 'hook'
import { cn } from 'lib'
import { deleteProductImage } from 'lib/action'
import { Card, CardContent, FormLabel, FormControl } from 'component/ui'
import { PATH_DIR } from 'config/dir'

interface CoverUploadFieldProps<TSchema extends ZodSchema> {
    cover      : string
    form       : UseFormReturn<z.infer<TSchema>>
    folderName?: S3FolderName
}
const CoverUploadField = <TSchema extends ZodSchema>({ cover, form, folderName }: CoverUploadFieldProps<TSchema>) => {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const { toast } = useToast()

  const handleUploadComplete = (res: { url: string }) => {
    form.setValue('cover' as FieldName, res.url as SetFieldName)
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
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
        toast({ variant: 'destructive', description: en.error.unable_upload })
      }
    }

    xhr.onerror = () => {
      toast({ variant: 'destructive', description: en.error.unable_upload })
    }

    xhr.open('POST', PATH_DIR.UPLOAD)
    xhr.send(formData)
  }

  const handleDelete = async () => {
    const currentImage = form.getValues('banner' as FieldName)
    const result = await deleteProductImage({ currentImages: currentImage })
    if (result?.success) {
      form.setValue('banner' as FieldName, '' as SetFieldName)
      toast({ description: en.success.file_deleted })
    } else {
      toast({ variant: 'destructive', description: en.error.failed_delete_file })
    }
  }
  return (
    <Fragment>
      <FormLabel>{en.form.cover.label}</FormLabel>
      <Card className={cn('mt-2')}>
        <CardContent className={'space-y-2 mt-5 h-auto'}>
          {cover && (
            <div className={'relative'}>
              <X size={20} color={'red'} className={'absolute top-0 right-0 cursor-pointer'} onClick={() => handleDelete()} />
              <Image src={cover} alt={'cover-image'} width={1920} height={680} className={'w-full object-cover object-center rounded-sm'} />
            </div>
          )}
          {!cover && (
            <Fragment>
              <FormControl>
                <label className="inline-block px-4 py-2 text-sm font-medium text-black bg-punkpink cursor-pointer hover:bg-punk-dark transition rounded-sm">
                  {en.upload_cover.label}
                  <input type="file" accept="image/*" multiple max={4} onChange={(e) => handleUpload(e)} className={'hidden'} />
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
            </Fragment>
          )}
        </CardContent>
      </Card>
    </Fragment>
  )
}

export default CoverUploadField