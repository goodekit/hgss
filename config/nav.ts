import { combine, transl } from "lib/util"

/**
 * Navigation Config
 *
 * Module
 */
const ADMIN   = 'admin'
const USER    = 'user'

const ACCOUNT = 'account'
const ASK     = 'ask'
const PRODUCT = 'product'
const GALLERY = 'gallery'
const ORDER   = 'order'
/**
 * Submodule
 */
const OVERVIEW = 'overview'

export const NAV_CONFIG = [
    {title: transl('product.products.label'), href: combine(PRODUCT), className: 'texture-8-bg' },
    {title: transl('gallery.label'), href: combine(GALLERY), className: 'texture-4-bg'},
    {title: transl('contact_and_custom_enquiries.label'), href: combine(ASK), className: 'texture-2-bg'},
]

export const NAV_CONFIG_USER = [
    { title: transl('navigation.account.label'), href: combine(USER, ACCOUNT) },
    { title: transl('navigation.order.label'), href: combine(USER, ORDER) },
]

export const NAV_CONFIG_ADMIN = [
    { title: transl('overview.label'), href: combine(ADMIN, OVERVIEW) },
    { title: transl('product.label'), href: combine(ADMIN, PRODUCT) },
    { title: transl('order.label'), href: combine(ADMIN, ORDER) },
    { title: transl('user.label'), href: combine(ADMIN, USER) },
    { title: transl('gallery.label'), href: combine(ADMIN, GALLERY) },
]

