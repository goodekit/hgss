import { ASSET_DIR } from "hgss-dir"
import { User } from '@prisma/client'

export const signInDefaultValue = {
  email   : '',
  password: ''
}

export const signUpDefaultValue = {
  name           : '',
  email          : '',
  password       : '',
  confirmPassword: ''
}

export const userAccountUpdateDefaultValue = (user: User) => {
  return {
    name            : user.name || '',
    email           : user.email || '',
    address         : user?.address || null,
    formattedAddress: (user?.address as ShippingAddress)?.formattedAddress || null
  }
}

export const userUpdatePasswordDefaultValue = {
  oldPassword    : '',
  password       : '',
  confirmPassword: ''
}

export const shippingAddressDefaultValue = {
  fullName        : '',
  formattedAddress: '',
  address         : '',
  streetAddress   : '',
  city            : '',
  postalCode      : '',
  country         : '',
}

export const contactAndEnquiryDefaultValue = (user?: UserBase) => {
  return {
    name       : user && user.name || '',
    email      : user && user.email || '',
    message    : '',
    attachments: []
  }
}

export const updateUserAccountDefaultValue = {
  name: '',
  email: ''
}

export const productDefaultValue = {
  name          : '',
  slug          : '',
  category      : '',
  images        : [],
  brand         : '',
  model         : '',
  description   : '',
  specifications: [],
  price         : '0',
  stock         : 0,
  rating        : '0',
  numReviews    : 0,
  isFeatured    : false,
  banner        : null
}

export const galleryDefaultValue = {
 title       : '',
 description : '',
 cover       : ASSET_DIR.GALLERY_COVER_DEFAULT,
 galleryItems: []
}

export const galleryItemDefaultValue = {
  title      : '',
  description: '',
  image      : '',
  galleryId  : ''
}

export const reviewDefaultValue = {
  title      : '',
  description: '',
  rating     : 0
}