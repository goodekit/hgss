import { Fragment } from 'react'
import { auth } from 'auth'
import { BackBtn } from 'component/shared'
import ContactForm from './ask-form'

const ContactPage = async () => {
  const session = await auth()
  const user    = session && session?.user

  return (
    <Fragment>
      <div className={"mb-12"}>
        <BackBtn />
      </div>
      <ContactForm user={user as UserBase} />
    </Fragment>
  )
}

export default ContactPage
