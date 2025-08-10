/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { FC, Fragment, useTransition, useState } from 'react'
import { GLOBAL } from 'hgss'
import { PATH_DIR } from 'hgss-dir'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useToast, useCleanupUnsubmittedImages } from 'hook'
import { deleteImage } from 'lib/action'
import { ContactAndEnquiriesSchema, contactAndEnquiryDefaultValue } from 'lib/schema'
import { RHFFormField, RHFFormDropzone } from 'component/shared/rhf'
import { TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'
import { transl } from 'lib'

interface AskFormProps {
    user?: { name: string, email: string }
}

const AskForm: FC<AskFormProps> = ({ user }) => {
  const [isPending, startTransition] = useTransition()
  const [submitted, setSubmitted]    = useState(false)
  const form                         = useForm<CreateContactAndEnquiry>({
    resolver     : zodResolver(ContactAndEnquiriesSchema),
    defaultValues: contactAndEnquiryDefaultValue(user)
  })
  const { toast }                        = useToast()
  const { control, handleSubmit, watch } = form
  const attachments                      = watch('attachments')

  useCleanupUnsubmittedImages(form, 'attachments', '__submitted')

  const onSubmit: SubmitHandler<CreateContactAndEnquiry> = async (data) => {
    startTransition(async () => {
      const res = await fetch(PATH_DIR.API.ASK, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(data)
      })

      if (!res.ok) {
        let errorResponse
        try {
          errorResponse = await res.json()
        } catch (error) {
          errorResponse = { error: transl('error.unknown_error') }
        }
        const currentAttachments = form.getValues('attachments')

        if (currentAttachments && Array.isArray(currentAttachments)) {
          for (let index = 0; index < currentAttachments.length; index++) {
            await deleteImage({ currentImages: currentAttachments, index })
          }
        } else if (typeof currentAttachments === 'string') {
          await deleteImage({ currentImages: currentAttachments })
        }

        toast({ variant: 'destructive', description: errorResponse.error })
        return
      }
      form.reset()
      setSubmitted(true)
      form.setValue('__submitted', true)
      toast({ description: transl('success.enquiry_sent') })
    })
  }

  return (
    <Fragment>
      <div className={'mx-auto space-y-4'}>
        <h1 className={'h2-bold mt-4'}>{transl('contact_and_custom_enquiries.label')}</h1>
        <p className={'text-sm text-muted-foreground special-elite'}>{transl('contact_and_custom_enquiries.description')}</p>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className={'grid grid-cols-1 md:grid-cols-4 gap-6 special-elite mx-auto py-5'}>
            <div className={'space-y-4 md:col-span-1'}>
              <RHFFormField control={control} name={'name'} formKey={'name'} disabled={user && true} />
              <RHFFormField control={control} name={'email'} formKey={'email'} disabled={user && true} />
            </div>
            <div className={'space-y-4 md:col-span-3'}>
              <RHFFormField control={control} name={'message'} formKey={'message'} type={'textarea'} />
              <RHFFormDropzone control={control} name={'attachments'} formKey={'attachments'} images={attachments} form={form} folderName={'contact-and-enquiry'} maxLimit={GLOBAL.LIMIT.MAX_IMAGE_ATTACHMENT_ENQUIRY} />
              <div className={'flex justify-end'}>
                <TapeBtn label={isPending ? <EllipsisLoader /> : transl('send_message.label')} className={'w-full md:w-[300px] texture-4-bg'} disabled={submitted} />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </Fragment>
  )
}

export default AskForm