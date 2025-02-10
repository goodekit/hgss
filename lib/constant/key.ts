import { SORT } from './sort'

const LOCALE = {
  EN        : 'en',
  ENGLISH   : 'en-NZ',
  VIETNAMESE: 'vi-VN'
}

export const BUTTON_TYPE = {
  SUBMIT: 'submit',
  BUTTON: 'button'
}

export const VARIANT = {
  GHOST: 'ghost'
}

export const PAYMENT_METHOD = {
  PAYPAL          : 'PayPal',
  STRIPE          : 'Stripe',
  CASH_ON_DELIVERY: 'CashOnDelivery'
}

export const METHOD = {
  GET   : 'get',
  POST  : 'post',
  PATCH : 'patch',
  PUT   : 'put',
  DELETE: 'delete',
  OPTION: 'option'
}

export const FORM = {
  EMAIL           : 'email',
  CONFIRM_PASSWORD: 'confirmPassword',
  NAME            : 'name',
  PASSWORD        : 'password'
}

export const ROLE = {
  USER : 'user',
  ADMIN: 'admin'
}

export const KEY = {
  ALL           : 'all',
  BAG           : 'bag',
  CALLBACK_URL  : 'callbackUrl',
  DARK          : 'dark',
  LIGHT         : 'light',
  SESSION_BAG_ID: 'sessionBagId',
  SYSTEM        : 'system',
  TEXT          : 'text',
  ...SORT,
  ...BUTTON_TYPE,
  ...FORM,
  ...LOCALE,
  ...METHOD,
  ...PAYMENT_METHOD,
  ...ROLE,
  ...VARIANT
}
