import { Fragment } from 'react'
import { auth } from 'auth'
import { BackBtn } from 'component/shared'
import { revalidate } from 'lib/util'
import ContactForm from './contact-form'

const ContactPage = async () => {
  const session = await auth()
  const user  = session?.user

  if (!user) {
    revalidate('/contact')
  }

  return (
    <Fragment>
      <div className="grid md:grid-cols-5 md:gap-5">
        <div className="md:col-span-5 space-y-4">
          <div className="flex-between flex-col md:flex-row my-4">
            <BackBtn />
          </div>
          <ContactForm user={user as UserBase} />
        </div>
      </div>
    </Fragment>
  )
}

export default ContactPage
