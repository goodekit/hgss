/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { FC, Fragment, useTransition } from 'react'
import { en } from 'public/locale'
import { PATH_DIR } from 'hgss-dir'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ContactMessageSchema, contactMessageDefaultValue } from 'lib/schema'
import { Form } from 'component/ui/form'
import { RHFFormField } from 'component/shared/rhf'
import { TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'

interface ContactFormProps {
    user?: { name: string, email: string }
}

const ContactForm: FC<ContactFormProps> = ({ user }) => {
  const [isPending, startTransition] = useTransition()
  const form                         = useForm<ContactMessage>({
    resolver     : zodResolver(ContactMessageSchema),
    defaultValues: contactMessageDefaultValue(user)
  })
//   const router                    = useRouter()
//   const { toast }                 = useToast()
  const { control, handleSubmit } = form

  const onSubmit: SubmitHandler<ContactMessage> = async (data) => {
    // startTransition(async () => {
    // //   const response = await updateUserAddress(data)
    // //   if (!response.success) {
    // //     toast({variant: 'destructive', description: response.message})
    // //     return
    // //   }
    //   router.push(PATH_DIR.PAYMENT)
    // })
  }

  return (
    <Fragment>
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="h2-bold mt-4">{en.contact_and_custom_inquiries.label}</h1>
        <p className="text-sm text-muted-foreground special-elite">{en.contact.description}</p>
        <Form {...form}>
          <form method={'post'} onSubmit={handleSubmit(onSubmit)} className="space-y-4 special-elite">
            <RHFFormField control={control} name={'name'} formKey={'name'} disabled={user && true} />
            <RHFFormField control={control} name={'email'} formKey={'email'} disabled={user && true} />
            <RHFFormField control={control} name={'message'} formKey={'message'} type={'textarea'} />
            <TapeBtn label={isPending ? <EllipsisLoader /> : en.send_message.label} className={'w-full'} />
          </form>
        </Form>
      </div>
    </Fragment>
  )
}

export default ContactForm
