import { FC, Fragment } from 'react'
import { PATH_DIR } from 'hgss-dir'
import { _mockData } from '_mock'
import { KEY } from 'lib'
import { NoResult, BackBtn } from 'component/shared'
import { ProductCard } from 'component/module/product'

const DEFAULT_QUERY = 'all'
interface SearchPageProps {
  searchParams: Promise<AppSearchPage<string>>
}

const ProductPage: FC<SearchPageProps> = async ({ searchParams }) => {
  const { query = DEFAULT_QUERY, category = DEFAULT_QUERY, price = DEFAULT_QUERY, rating = DEFAULT_QUERY, sort = KEY.NEWEST, page = '1' } = await searchParams

  const getFilterUrl = ({ _category , _price, _rating, _sort, _page }:{ _category?: string, _price?: string, _rating?: string, _sort?: string, _page?: string})  => {
    const params = { query, category, price, rating, sort, page }
    if (_category) params.category = _category
    if (_price) params.price       = _price
    if (_rating) params.rating     = _rating
    if (_sort) params.sort         = _sort
    if (_page) params.page         = _page

    return PATH_DIR.SEARCH_QUERY(new URLSearchParams(params).toString())
  }

//   const products   = await getAllProducts({ query, category, price, rating, sort, page: Number(page) })
//   const categories = await getAllCategories()

  return (
    <Fragment>
      <div className="grid md:grid-cols-5 md:gap-5">
        <div className="md:col-span-5 space-y-4">
            <div className="flex-between flex-col md:flex-row my-4">
                <BackBtn/>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {_mockData.products.length <= 0  && <NoResult data={_mockData.products.length} />}
                {_mockData.products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ProductPage
