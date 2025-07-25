import { ASSET_DIR } from "config/dir"

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

export const shippingAddressDefaultValue = {
  fullName     : '',
  streetAddress: '',
  city         : '',
  postalCode   : '',
  country      : '',
}

export const contactMessageDefaultValue = (user?: UserBase) => {
  return {
    name   : user && user.name || '',
    email  : user && user.email || '',
    message: ''
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