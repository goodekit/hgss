import { GLOBAL } from "hgss"
import { connect, connectUrl } from "lib/util/connect"



export const ASSET_DIR = {
  LOGO               : connect('asset', 'logo', 'logo.svg'),
  LOGO_LIGHT          : connect('image', 'svg', 'vieux-carre-white.svg'),
  LOGO_PRODUCTION    : connectUrl(GLOBAL.SERVER_URL, 'image/svg/vieux-carre-red.svg'),
  LOGO_PRODUCTION_PNG: connectUrl(GLOBAL.SERVER_URL, 'image/png/vieux-carre-red.png'),
  PROMO              : connect('image', 'promo', 'promo.png'),
}
