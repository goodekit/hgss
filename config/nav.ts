import { connect, transl } from "lib/util"

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
    {title: transl('product.products.label'), href: connect(PRODUCT), className: 'texture-8-bg' },
    {title: transl('gallery.label'), href: connect(GALLERY), className: 'texture-4-bg'},
    {title: transl('contact_and_custom_enquiries.label'), href: connect(ASK), className: 'texture-2-bg'},
]

export const NAV_CONFIG_USER = [
    { title: transl('navigation.account.label'), href: connect(USER, ACCOUNT) },
    { title: transl('navigation.order.label'), href: connect(USER, ORDER) },
]

export const NAV_CONFIG_ADMIN = [
    { title: transl('overview.label'), href: connect(ADMIN, OVERVIEW) },
    { title: transl('product.label'), href: connect(ADMIN, PRODUCT) },
    { title: transl('order.label'), href: connect(ADMIN, ORDER) },
    { title: transl('user.label'), href: connect(ADMIN, USER) },
    { title: transl('gallery.label'), href: connect(ADMIN, GALLERY) },
]

