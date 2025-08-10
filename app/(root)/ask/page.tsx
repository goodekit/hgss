import { Fragment } from 'react'
import { PATH_DIR } from 'hgss-dir'
import { auth } from 'auth'
import { BackBtn } from 'component/shared'
import { revalidate } from 'lib/util'
import ContactForm from './ask-form'

const ContactPage = async () => {
  const session = await auth()
  const user  = session?.user

  if (!user) {
    revalidate(PATH_DIR.ASK)
  }

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
