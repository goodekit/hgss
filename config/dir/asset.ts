import { GLOBAL } from "hgss"
import { connect, connectUrl } from "lib/util/connect"



export const ASSET_DIR = {
  BG                 : connect('asset', 'image', 'bg', 'hero-bg-1.jpeg'),
  BG_2               : connect('asset', 'image', 'bg', 'hero-bg-2.jpeg'),
  LOGO               : connect('asset', 'logo', 'logo.svg'),
  LOGO_ALT           : connect('asset', 'logo', 'logo-alt.svg'),
  LOGO_LIGHT         : connect('image', 'svg', 'vieux-carre-white.svg'),
  LOGO_PRODUCTION    : connectUrl(GLOBAL.SERVER_URL, 'asset/logo/logo.svg'),
  LOGO_PRODUCTION_PNG: connectUrl(GLOBAL.SERVER_URL, 'asset/logo/logo.png'),
  PROMO              : connect('image', 'promo', 'promo.png'),
}
