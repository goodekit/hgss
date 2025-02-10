'use server'

import { en } from 'public/locale'
import { signIn, signOut } from 'auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { hash } from 'lib/encrypt'
import { prisma } from 'db/prisma'
import { SignInSchema, SignUpSchema } from 'lib/schema'
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

/**
 * Signs up a new user with the provided form data.
 *
 * @param prevState - The previous state, which is not used in this function.
 * @param formData - The form data containing user information.
 * @returns A promise that resolves to a system logger response indicating the result of the sign-up process.
 * @throws Will throw an error if the sign-up process encounters a redirect error.
 */
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = SignUpSchema.parse({
      name           : formData.get('name'),
      email          : formData.get('email'),
      password       : formData.get('password'),
      confirmPassword: formData.get('confirmPassword')
    })
    const unhashedPassword = user.password
    user.password = await hash(user.password)
    await prisma.user.create({ data: { name: user.name, email: user.email, password: user.password } })
    await signIn('credentials', { email: user.email, password: unhashedPassword })
    return SystemLogger.response(en.success.user_signed_up, CODE.CREATED, TAG)
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

