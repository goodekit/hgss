import { en } from "public/locale"
import { connect } from "lib/util"

/**
 * Navigation Config
 *
 * Module
 */
const ADMIN   = 'admin'
const USER    = 'user'

const ACCOUNT = 'account'
const CONTACT = 'contact'
const PRODUCT = 'product'
const GALLERY = 'gallery'
const ORDER   = 'order'
/**
 * Submodule
 */
const OVERVIEW = 'overview'

export const NAV_CONFIG = [
    {title: en.product.products.label, href: connect(PRODUCT), className: 'texture-8-bg' },
    {title: en.gallery.label, href: connect(GALLERY), className: 'texture-4-bg'},
    {title: en.contact_and_custom_inquiries.label, href: connect(CONTACT), className: 'texture-2-bg'},
]

export const NAV_CONFIG_USER = [
    { title: en.navigation.account.label, href: connect(USER, ACCOUNT) },
    { title: en.navigation.order.label, href: connect(USER, ORDER) },
]

export const NAV_CONFIG_ADMIN = [
    { title: en.overview.label, href: connect(ADMIN, OVERVIEW) },
    { title: en.product.label, href: connect(ADMIN, PRODUCT) },
    { title: en.order.label, href: connect(ADMIN, ORDER) },
    { title: en.user.label, href: connect(ADMIN, USER) },
]

