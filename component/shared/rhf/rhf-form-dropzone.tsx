"use client"

import { z, ZodSchema } from 'zod'
import { en } from 'public/locale'
import { IMAGE } from 'hgss-design'
import { Control, Path, PathValue, UseFormReturn } from 'react-hook-form'
import Image from 'next/image'
import { useToast } from 'hook'
import { X } from 'lucide-react'
import { deleteProductImage } from 'lib/action'
import { FormField, FormLabel, FormMessage, FormItem, FormControl } from 'component/ui/form'
import { Card, CardContent } from 'component/ui/card'
import { UploadButton } from 'lib/uploadthing'

type FormKeyLocale = keyof typeof en.form

interface RHFFormDropzoneProps<TSchema extends ZodSchema> {
  control: Control<z.infer<TSchema>>
  formKey: FormKeyLocale
  images : string[]
  name   : Path<z.infer<TSchema>>
  form   : UseFormReturn<z.infer<TSchema>>
}

const RHFFormDropzone = <TSchema extends ZodSchema>({ control, name, images, formKey, form }: RHFFormDropzoneProps<TSchema>) => {
  const { toast } = useToast()
  const handleUploadComplete = (res: { url: string }[]) => {
    const currentImages = form.getValues(name) as string[]
    form.setValue(name, [...currentImages, res[0].url] as PathValue<z.infer<TSchema>, Path<z.infer<TSchema>>>)
  };

  const handleDelete = async (index: number) => {
    const currentImages = form.getValues(name) as string[]
    const result = await deleteProductImage(currentImages, index)
    if (result?.success) {
      const updatedImages = currentImages.filter((_, _i) => _i != index)
      form.setValue(name, updatedImages as PathValue<z.infer<TSchema>, Path<z.infer<TSchema>>>)
      toast({ description: "File deleted successfully" })
    } else {
      toast({ variant: 'destructive', description: "Failed to delete file from server" })
    }
  }
  return (
    <FormField
        control={control}
        name={name}
        render={() => (
        <FormItem className={"w-full"}>
            <FormLabel>{en.form[formKey].label}</FormLabel>
                <Card>
                    <CardContent className={'space-y-2 mt-2 items-center min-h-48'}>
                        <div className="flex-start space-x-2">
                            {images.map((image, index) => (
                              <div key={index} className={'relative'}>
                                <X size={20} color={'red'} className={'absolute top-0 right-0 cursor-pointer'} onClick={() => handleDelete(index)}/>
                                <Image  src={image} height={IMAGE.UPLOAD_THUMBNAIL_H} width={IMAGE.UPLOAD_THUMBNAIL_W} alt={'product-name'} className={'w-20 h-20 object-cover rounded-sm'}  />
                              </div>
                            ))}
                            <FormControl>
                              <UploadButton endpoint={'imageUploader'} onClientUploadComplete={handleUploadComplete} onUploadError={(error: Error) => { toast({ variant: 'destructive', description: error.message })}} className={'border-none'} appearance={{  button: 'px-2 bg-transparent', container: 'm-auto' }} />
                            </FormControl>
                        </div>
                    </CardContent>
                </Card>
            <FormMessage />
        </FormItem>
    )}/>
  )
}

export default RHFFormDropzone
