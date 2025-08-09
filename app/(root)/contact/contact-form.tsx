/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { FC, Fragment, useTransition, useState } from 'react'
import { GLOBAL } from 'hgss'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useToast } from 'hook'
import { ContactAndEnquiriesSchema, contactAndEnquiryDefaultValue } from 'lib/schema'
import { Form } from 'component/ui/form'
import { RHFFormField, RHFFormDropzone } from 'component/shared/rhf'
import { TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'
import { transl } from 'lib'

interface ContactFormProps {
    user?: { name: string, email: string }
}

const ContactForm: FC<ContactFormProps> = ({ user }) => {
  const [isPending, startTransition] = useTransition()
  const [submitted, setSubmitted]    = useState(false)
  const form                         = useForm<CreateContactAndEnquiry>({
    resolver     : zodResolver(ContactAndEnquiriesSchema),
    defaultValues: contactAndEnquiryDefaultValue(user)
  })
  //   const router                    = useRouter()
  const { toast }                                               = useToast()
  const { control, handleSubmit, watch, formState: { errors } } = form
  const attachments                                             = watch('attachments')

  const onSubmit: SubmitHandler<CreateContactAndEnquiry> = async (data) => {
    startTransition(async () => {
      const res = await fetch('/api/contact', {
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
        toast({ variant: 'destructive', description: errorResponse.error })
        return
      }
      form.reset()
      setSubmitted(true)
      toast({ description: `Enquiry sent` })
    })
  }

  /**
  * - add a webhook to resend that checks if its been read;
  * - display the enquiries sent?
  *
 */

  return (
    <Fragment>
      <div className={'max-w-md mx-auto space-y-4'}>
        <h1 className={'h2-bold mt-4'}>{transl('contact_and_custom_enquiries.label')}</h1>
        <p className={'text-sm text-muted-foreground special-elite'}>{transl('contact_and_custom_enquiries.description')}</p>
        {errors.attachments && <p className="text-red-500 text-sm">{String(errors.attachments.message)}</p>}
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className={'space-y-4 special-elite'}>
            <RHFFormField control={control} name={'name'} formKey={'name'} disabled={user && true} />
            <RHFFormField control={control} name={'email'} formKey={'email'} disabled={user && true} />
            <RHFFormField control={control} name={'message'} formKey={'message'} type={'textarea'} />
            <RHFFormDropzone
              control={control}
              name={'attachments'}
              formKey={'attachments'}
              images={attachments}
              form={form}
              folderName={'contact-and-enquiry'}
              maxLimit={GLOBAL.LIMIT.MAX_IMAGE_ATTACHMENT_ENQUIRY}
            />
            <TapeBtn label={isPending ? <EllipsisLoader /> : transl('send_message.label')} className={'w-full texture-4-bg'} disabled={submitted} />
          </form>
        </FormProvider>
      </div>
    </Fragment>
  )
}

export default ContactForm