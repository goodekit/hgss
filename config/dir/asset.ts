import { GLOBAL } from "hgss"
import { connect, connectUrl } from "lib/util/connect"

export const ASSET_DIR = {
  BG                   : connect('asset', 'image', 'bg', 'hero-bg-1.png'),
  BG_2                 : connect('asset', 'image', 'bg', 'hero-bg-2.png'),
  GALLERY_COVER_DEFAULT: connect('asset', 'image', 'default.jpg'),
  LOGO                 : connect('asset', 'logo', 'logo.svg'),
  LOGO_ALT             : connect('asset', 'logo', 'logo-alt.svg'),
  LOGO_LIGHT           : connect('image', 'svg', 'vieux-carre-white.svg'),
  LOGO_PRODUCTION      : connectUrl(GLOBAL.SERVER_URL, 'asset/logo/logo.svg'),
  LOGO_PRODUCTION_PNG  : connectUrl(GLOBAL.SERVER_URL, 'asset/logo/logo.png'),
  PROMO                : connect('image', 'promo', 'promo.png'),
  STICKER              : connect('asset', 'image', 'sticker.png')
}
