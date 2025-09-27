import { combine, combineUrl } from 'lib/util/combine'
import { GLOBAL } from 'hgss'

const protect = () => {
  const routesArray = GLOBAL.PROTECTED_ROUTES.split(';') || ""
  return routesArray.map((route: string) => new RegExp(combine(route)))
}

export const PROTECTED_ROUTES = protect()

const _API  = 'api'
const _USER = 'user'

export const PATH_DIR = {
  ADMIN           : {
                      GALLERY       : combine('admin', 'gallery'),
                      GALLERY_CREATE: combine('admin', 'gallery', 'create'),
                      GALLERY_VIEW  : (galleryId: string) => combine('admin', 'gallery', galleryId),
                      ORDER         : combine('admin', 'order'),
                      OVERVIEW      : combine('admin', 'overview'),
                      PRODUCT       : combine('admin', 'product'),
                      PRODUCT_CREATE: combine('admin', 'product', 'create'),
                      PRODUCT_VIEW  : (productId: string) =>  combine('admin', 'product', productId),
                      USER          : combine('admin', 'user'),
                      USER_VIEW     : (userId: string) => combine('combine', 'user', userId)
                    },
  API             : {
                      ASK   : combine(_API, 'ask'),
                      UPLOAD: combine(_API, 'upload')
                    },
  ASK             : combine('ask'),
  BAG             : combine('bag'),
  CHECKOUT        : combine('order', 'checkout'),
  CONTACT         : combine('contact'),
  EMAIL_IMAGE     : (img: string) => combineUrl(GLOBAL.SERVER_URL, img),
  GOOGLE_CALLBACK : combineUrl(GLOBAL.SERVER_URL, 'api', 'auth', 'callback', 'credentials'),
  MOCK            : combine('__mock', 'sample-data.ts'),
  ORDER           : combine('order'),
  ORDER_VIEW      : (id: string) => combine('order', id),
  PASSWORD_FORGOT : combine('forgot-password'),
  PASSWORD_RESET  : (token: string) => combineUrl(GLOBAL.SERVER_URL, `reset-password?token=${token}`),
  PAYMENT         : combine('payment'),
  PRODUCT         : combine('product'),
  PRODUCT_VIEW    : (slug: string) => combine('product', slug),
  PRODUCT_CALLBACK: (slug: string) => combine('sign-in?callbackUrl=/product', slug),
  ROOT            : '/',
  SEARCH          : combine('search'),
  SEARCH_QUERY    : (params: string) => combine(`search?${params}`),
  SEARCH_CATEGORY : (category: string) => combine(`search?category=${category}`),
  SHIPPING        : combine('shipping'),
  SIGN_IN         : combine('sign-in'),
  SIGN_UP         : combine('sign-up'),
  STRIPE_CALLBACK : (id: string) => combineUrl(GLOBAL.SERVER_URL, 'order', id, 'stripe-payment-success'),
  UPLOAD          : combine('api', 'upload'),
  UPLOAD_GENERIC  : (folder: string) => combine('api', 'upload', folder),
  USER            : {
                      ACCOUNT: combine(_USER, 'account'),
                      ORDER  : combine(_USER, 'order'),
  }
}
