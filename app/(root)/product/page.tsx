import { FC, Fragment } from 'react'
import { _mockData } from '_mock'
import { KEY } from 'lib'
import { getAllProducts } from 'lib/action'
import { NoResult, Pagination } from 'component/shared'
import { ProductCard } from 'component/module/product'

const DEFAULT_QUERY = 'all'
interface SearchPageProps {
  searchParams: Promise<AppSearchPage<string>>
}

const ProductPage: FC<SearchPageProps> = async ({ searchParams }) => {
  const { query = DEFAULT_QUERY, category = DEFAULT_QUERY, price = DEFAULT_QUERY, rating = DEFAULT_QUERY, sort = KEY.NEWEST, page = '1' } = await searchParams
  const products   = await getAllProducts({ query, category, price, rating, sort, page: Number(page) })

  return (
    <Fragment>
      <div className="grid md:grid-cols-5 md:gap-5">
        <div className="md:col-span-5 space-y-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {products.data.length <= 0  && <NoResult data={_mockData.products.length} />}
                {products.data.map((_product, index) => (
                    <ProductCard key={index} product={_product} />
                ))}
            </div>
               {products.totalPages > 1 && (<div className={'mt-5 flex justify-end'}><Pagination page={Number(page) || 1} totalPages={products?.totalPages}/></div>)}
        </div>
      </div>
    </Fragment>
  )
}

export default ProductPage
