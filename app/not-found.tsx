import Image from 'next/image'
import { en } from 'public/locale'
import { ASSET_DIR, PATH_DIR } from 'hgss-dir'
import { HTTP_RESPONSE } from 'lib/constant'
import { CODE } from 'lib/constant'
import { TapeBtn } from 'component/shared/btn'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen shadow-none">
      <Image src={ASSET_DIR.LOGO_ALT} width={60} height={60} alt="logo" priority />
      <div className="p-6 w-1/3 rounded-sm text-center">
        <h4 className="text-4xl mt-2 covered-by-your-grace-regular">{CODE.NOT_FOUND}</h4>
        <h1 className="text-3xl font-bold mb-4">{HTTP_RESPONSE[404].title}</h1>
        <h6 className="mt-8 covered-by-your-grace-regular">{HTTP_RESPONSE[404].description}</h6>
        <TapeBtn label={en.go_back} href={PATH_DIR.ROOT} type={'button'} isLink />
      </div>
    </div>
  )
}

export default NotFoundPage
