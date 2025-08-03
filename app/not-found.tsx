import Image from 'next/image'
import { ASSET_DIR, PATH_DIR } from 'hgss-dir'
import { HTTP_RESPONSE } from 'lib/constant'
import { CODE } from 'lib/constant'
import { TapeBtn } from 'component/shared/btn'
import { transl } from 'lib'

const NotFoundPage = () => {
  return (
    <div className={"flex flex-col items-center h-[90vh] justify-center shadow-none special-elite"}>
        <Image src={ASSET_DIR.STICKER} width={100} height={100} alt="logo" priority className={'rotate-6'} />
        <div className={"p-6 w-1/2 md:w-1/3 rounded-sm text-center"}>
          <h4 className={"text-4xl mt-2 covered-by-your-grace-regular"}>{CODE.NOT_FOUND}</h4>
          <h1 className={"text-3xl font-bold mb-4"}>{HTTP_RESPONSE[404].title}</h1>
          <h6 className={"mt-8 covered-by-your-grace-regular"}>{HTTP_RESPONSE[404].description}</h6>
        </div>
        <div className={'w-1/3 md:w-1/4 text-center'}>
          <TapeBtn label={transl('go_back')} href={PATH_DIR.ROOT} type={'button'} isLink className={'texture-bg'} />
        </div>
    </div>
  )
}

export default NotFoundPage
