import { Fragment } from 'react'
import Image from 'next/image'
import { ASSET_DIR } from 'hgss-dir'
import { NAV_CONFIG } from 'hgss-nav'
import { TapeBtn } from 'component/shared'

const Homepage = async () => {
  return (
    <Fragment>
    <div className={"p-4 flex flex-col items-center relative justify-between"}>
        <div className={"max-w-4xl mt-20"}>
          <div className={"w-full h-auto rounded-lg pb-10 p-5 relative mb-24"}>
            <Image src={ASSET_DIR.LOGO} priority alt="Homegrown Logo" width={800} height={300} className={"m-auto p-12 pointer-events-none"} />
          </div>
          <nav className={"special-elite"}>
            {NAV_CONFIG.map(({ title, href, className }, index) => (
              <TapeBtn key={index} label={title} href={href} index={index} isLink className={className} />
            ))}
          </nav>

        </div>
      </div>
    </Fragment>
  )
}

export default Homepage
