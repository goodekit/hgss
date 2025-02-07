import { Fragment } from 'react'
// import { GLOBAL } from 'hgss'
import Image from 'next/image'
import { ASSET_DIR } from 'hgss-dir'
import { NAV_CONFIG } from 'hgss-nav'
// import { getLatestProducts, getAllFeaturedProducts } from 'lib'
import { getRandomTextureClass, delay } from 'lib/util'

const Homepage = async () => {
//   const latestProducts   = await getLatestProducts()
//   const featuredProducts = await getAllFeaturedProducts()

const randomizedClasses = NAV_CONFIG.map(() => getRandomTextureClass())
  return (
    <Fragment>
    <div className="p-4 flex flex-col items-center relative justify-between">
        <div className="w-full max-w-4xl mt-20">
          <div className="w-full rounded-lg pb-10 p-5 relative mb-24">
            <Image src={ASSET_DIR.LOGO} priority alt="Homegrown Logo" width={800} height={300} className="m-auto p-12 " />
          </div>

          <nav className="permanent-marker-regular ">
            {NAV_CONFIG.map(({ title, href }, index) => (
              <button key={index} className={`w-full  text-4xl xs:text-xl permanent-marker-regular ${randomizedClasses[index]} text-black font-bold transform -rotate-1 hover:rotate-0 transition-transform`}>
                <a href={href}>{title}</a>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </Fragment>
  )
}

export default Homepage
