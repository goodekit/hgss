export const GLOBAL = {
  APP_NAME               : process.env.NEXT_PUBLIC_APP_NAME || 'Homegrown Speed Shop',
  APP_VERSION            : process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  APP_DESCRIPTION        : process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Classic car parts, accessories and requests',
  AVATAR_API             : process.env.NEXT_PUBLIC_AVATAR_API || `https://api.dicebear.com/7.x/avataaars/`,
  SERVER_URL             : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  SITE_NAME              : process.env.NEXT_PUBLIC_SITE_NAME || 'homegrownspeed.shop',
  DATABASE_URL           : process.env.DATABASE_URL || '',
  ENCRYPTION_KEY         : process.env.ENCRYPTION_KEY || '',
  GOOGLE                 : {
                            CLIENT_ID    : process.env.GOOGLE_CLIENT_ID,
                            CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
  },
  NEXTAUTH_STRATEGY      : process.env.NEXTAUTH_STRATEGY || 'jwt',
  LOCALE                 : process.env.NEXT_PUBLIC_LOCALE || 'en-NZ',
  USER_ROLES             : process.env.USER_ROLES && process.env.USER_ROLES.split(';') || ['user', 'admin'],
  LIMIT                  : {
                            ADMIN_ORDERS                : 10,
                            USER_ORDERS                 : 10,
                            PRODUCT_SPECS_MAX           : 5,
                            MAX_UPLOAD_SIZE_GALLERY     : 7,                                           // MB,
                            MAX_UPLOAD_SIZE_ENQUIRY     : 7,                                           // MB,
                            MAX_UPLOAD_SIZE_PRODUCT     : 7,                                           // MB,
                            MAX_IMAGE_ATTACHMENT_ENQUIRY: 4,
                            MAX_PHOTO_QTY_GALLERY       : 5,
                            MAX_PHOTO_QTY_PRODUCT       : 5,
                            MAX_ALLOWED_ENQUIRY         : 10,
                            WAIT_TIME_ENQUIRY           : 24 * 60 * 60 * 1000 * 7,                     // MB,
                            RESET_PASSWORD_LINK_EXPIRY  : new Date(Date.now() + 3 * 60 * 60 * 1000),   // HOUR
                            SIGNIN_TTL                  : 15 * 60,                                     //15 MIN
                            SIGNIN_ATTEMPT_MAX          : 5,
                          },
  PAGE_SIZE             : 8,
  PAGE_SIZE_GALLERY     : 8,
  PAYMENT_METHODS       : process.env.NEXT_PUBLIC_PAYMENT_METHODS,
  PAYMENT_METHOD_DEFAULT: process.env.NEXT_PUBLIC_DEFAULT_PAYMENT_METHOD || 'PayPal',
  PAYPAL                : {
                            PAYPAL_API_URL   : process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com',
                            PAYPAL_CLIENT_ID : process.env.PAYPAL_CLIENT_ID || 'sb',
                            PAYPAL_APP_SECRET: process.env.PAYPAL_APP_SECRET || '',
                          },
  STRIPE                 :{
                            STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
                            STRIPE_SECRET_KEY     : process.env.STRIPE_SECRET_KEY || '',
                            STRIPE_WEBHOOK_SECRET : process.env.STRIPE_WEBHOOK_SECRET || '',
                          },
  PROTECTED_ROUTES       : process.env.NEXT_PUBLIC_PROTECTED_ROUTES || '',
  PURCHASE_FLOW          : ['user_sign_in', 'shipping', 'payment', 'place_order'],
  TITLE_SEPARATOR        : ' | ',
  PRICES                 : {
                            CURRENCY             : process.env.NEXT_PUBLIC_CURRENCY || 'NZD',
                            CURRENCY_SYMBOL      : process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$',
                            TAX                  : process.env.NEXT_PUBLIC_TAX || 0.15,
                            PRICE_MIN            : process.env.NEXT_PUBLIC_PRICE_MIN || 0.50,
                            NO_SHIPPING_THRESHOLD: process.env.NEXT_PUBLIC_NO_SHIPPING_THRESHOLD || 100,
                            DEFAULT_SHIPPING_COST: process.env.NEXT_PUBLIC_DEFAULT_SHIPPING_COST || 10
                          },
  PROMOTION              : {
                            PROMOTION_CODE        : process.env.PROMOTION_CODE || 'PROMO',
                            PROMOTION_VALUE       : process.env.PROMOTION_VALUE || 0.1,
                            MONEY_BACK_DAYS       : process.env.MONEY_BACK_DAYS || 30,
                            HAS_PROMOTION_TAX     : process.env.HAS_PROMOTION_TAX || false,
                            HAS_PROMOTION_SHIPPING: process.env.HAS_PROMOTION_TAX || false
                          },
  REDIS                   : {
                            URL: process.env.REDIS_URL || 'redis://localhost:6379',
                            KEY: `signin:attempts:`,
                            UPSTASH: {
                              REST_URL  : process.env.UPSTASH_REDIS_REST_URL || '',
                              REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN || '',
                              URI       : `redis://default:${process.env.UPSTASH_REDIS_REST_TOKEN}@${process.env.UPSTASH_REDIS_HOST}` || ''
                            }
                          },
  RESEND                  : {
                            RESEND_API_KEY                    : process.env.RESEND_API_KEY || '',
                            SENDER_EMAIL                      : process.env.SENDER_EMAIL || 'onboarding@resend.dev',
                            CONTACT_AND_ENQUIRY_RECEIVER_EMAIL: process.env.CONTACT_AND_ENQUIRY_RECEIVER_EMAIL || '',
                            CONTACT_AND_ENQUIRY_SENDER_EMAIL  : process.env.CONTACT_AND_ENQUIRY_SENDER_EMAIL || ''
                          },
  RYBBIT                  : `https://app.rybbit.io/api/script.js`,
  AWS                   : {
                            ACCESS_KEY_ID      : process.env.AWS_ACCESS_KEY_ID || "",
                            SECRET_ACCESS_KEY  : process.env.AWS_SECRET_ACCESS_KEY || "",
                            REGION             : process.env.AWS_REGION || "",
                            S3_BUCKET_NAME     : process.env.AWS_S3_BUCKET_NAME || "",
                            S3_BUCKET_USER     : process.env.AWS_S3_BUCKET_USER || "",
                            SIGNED_URL_EXP     : Number(process.env.AWS_SIGNED_URL_EXP) || 60,
                            PUBLIC_URL         : `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`,
                            IMAGE_TYPE         : 'image/webp',
                            IMAGE_TYPES_ALLOWED: ['jpg', 'jpeg', 'png', 'gif', 'webp']
                          },
  HASH                  :{
                            SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10
                          }
}
