import { ASSET_DIR } from "hgss-dir"
import Image from 'next/image'

interface AppAuthBGProps {
 image?: string
}

const AppAuthBG = ({ image = ASSET_DIR.BG }: AppAuthBGProps) => {
  return (
    <div className={'relative col-span-3 hidden md:block'}>
      <Image src={image} alt="hgss-background" fill priority />
    </div>
  )
}


export default AppAuthBG