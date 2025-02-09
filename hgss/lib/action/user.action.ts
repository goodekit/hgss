'use server'

import { en } from 'public/locale'
import { signIn, signOut } from 'auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { SignInSchema } from 'lib/schema'
import { SystemLogger } from 'lib/app-logger'
import { CODE } from 'lib/constant'

const TAG = 'USER.ACTION'

/**
 * Signs in a user with the provided credentials.
 *
 * @param prevState - The previous state, which is currently not used.
 * @param formData - The form data containing the user's email and password.
 * @returns A promise that resolves to a success response if the sign-in is successful,
 * or an error response if the credentials are invalid.
 * @throws Will throw an error if a redirect error occurs.
 */
export async function signInBasic(prevState: unknown, formData: FormData) {
  try {
    const user = SignInSchema.parse({
      email   : formData.get('email'),
      password: formData.get('password')
    })
    await signIn('credentials', user)
    return SystemLogger.response(en.success.user_signed_in, CODE.OK, TAG)
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return SystemLogger.errorMessage(en.error.invalid_credentials, CODE.BAD_REQUEST, TAG)
  }
}


/**
 * Signs out the current user by calling the `signOut` function.
 *
 * @returns {Promise<void>} A promise that resolves when the sign-out process is complete.
 */
export async function signOutBasic() {
    await signOut()
}
