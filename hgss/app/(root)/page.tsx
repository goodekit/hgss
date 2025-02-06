import { Fragment } from 'react'
// import { GLOBAL } from 'hgss'
import Image from 'next/image'
import { ASSET_DIR } from 'hgss-dir'
// import { getLatestProducts, getAllFeaturedProducts } from 'lib'
import { LinkBtn } from 'component/shared/btn'
import { DealCountdown } from 'component/shared/promo'
import { ServiceCard } from 'component/shared/card'
import { getRandomTextureClass } from 'lib/util'

const Homepage = async () => {
//   const latestProducts   = await getLatestProducts()
//   const featuredProducts = await getAllFeaturedProducts()
const randomizedClasses = Object.values(TAB).map(() => getRandomTextureClass())
  return (
    <Fragment>
    <div className="min-h-screen p-4 flex flex-col items-center relative justify-between">
        <div className="w-full max-w-4xl mt-20">
          <div className="w-full rounded-lg pb-10 p-5 relative mb-24">
            <Image src={ASSET_DIR.LOGO} priority alt="Homegrown Logo" width={800} height={300} className="m-auto p-12 bg-blend-hard-light" />
          </div>

          <nav className="space-y-4 permanent-marker-regular">
            {Object.values(TAB).map((item, index) => (
              <LinkBtn
                key={index}
                className={`w-full text-4xl xs:text-xl permanent-marker-regular ${randomizedClasses[index]} text-black font-bold rounded transform -rotate-1 hover:rotate-0 transition-transform shadow shadow-md`}
                href={`/${item}`}>
                {item}
              </LinkBtn>
            ))}
          </nav>
        </div>
      </div>
    </Fragment>
  )
}

export default Homepage
