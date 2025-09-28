import { GLOBAL } from "hgss"
import { combineUrl, combine } from "lib/util/combine"

export const ASSET_DIR = {
  BG                   : combine('asset', 'image', 'bg', 'hero-bg-1.png'),
  BG_2                 : combine('asset', 'image', 'bg', 'hero-bg-2.png'),
  GALLERY_COVER_DEFAULT: combine('asset', 'image', 'default.jpg'),
  LOGO                 : combine('asset', 'logo', 'logo.svg'),
  LOGO_ALT             : combine('asset', 'logo', 'logo-alt.svg'),
  LOGO_LIGHT           : combine('image', 'svg', 'vieux-carre-white.svg'),
  LOGO_PRODUCTION      : combineUrl(GLOBAL.SERVER_URL, 'asset/logo/logo.svg'),
  LOGO_PRODUCTION_PNG  : combineUrl(GLOBAL.SERVER_URL, 'asset/logo/logo.png'),
  MONO                 : combineUrl(GLOBAL.SERVER_URL, 'asset', 'image', 'mono.png'),
  PROMO                : combine('image', 'promo', 'promo.png'),
  STICKER              : combine('asset', 'image', 'sticker.png')
}
