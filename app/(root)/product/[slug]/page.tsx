import { FC, Fragment } from 'react'
import { en } from 'public/locale'
import { GLOBAL } from 'hgss'
import { notFound } from 'next/navigation'
import { getProductBySlug, getMyBag } from 'lib/action'
import { cn } from 'lib/util'
import { Card, CardContent, Badge } from 'component/ui'
import { ProductImage, ProductPrice } from 'component/module'
import { AddToBag, BackBtn } from 'component/shared'

interface ProductViewPageProps {
  params: Promise<{ slug: string }>
}
const ProductViewPage: FC<ProductViewPageProps> = async ({ params }) => {
  const { slug } = await params
  const product  = await getProductBySlug(slug)
  if (!product) return notFound()
  const bag    = await getMyBag()

  const bagProduct           = { productId: product.id, name: product.name, slug: product.slug, price: product.price, qty: 1, image: product.images![0] }
  const productStatus        = product.stock > 0 ? <Badge variant="outline" className={'bg-tape text-black'}>{en.in_stock.label}</Badge> : <Badge variant="destructive">{en.out_of_stock.label}</Badge>
  const renderAddToBagButton = product.stock > 0 ? <AddToBag bag={bag} item={bagProduct} /> : null


  return (
    <Fragment>
      <div className="mb-12">
        <BackBtn />
      </div>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-7 special-elite">
          <div className="col-span-4">
            <ProductImage images={product.images} />
          </div>
          <div className="col-span-3 p-5">
            <div className="flex flex-col gap-5">
              <p>
                {product.brand} {product.category}
              </p>
              <h1 className="h3-bold">{product.name}</h1>
              <div className="mt-10 text-lg special-elite">
                <p>{product.description}</p>
              </div>
              {(product.specifications && product.specifications?.length < GLOBAL.LIMIT.PRODUCT_SPECS_MAX)&& (
                <div className="mt-10 text-sm special-elite">
                  {product.specifications.map((_spec: string, index: number) =>  <p key={index}>{_spec}</p> )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className={'sticky bottom-0 z-50 md:static'}>
          <Card className={"rounded-sm shadow-none border-t-2 border-b-2 border-x-0 special-elite"}>
            <CardContent className={"p-4 grid grid-cols-1 md:grid-cols-7 space-x-4"}>
            <div className={"col-span-1 md:col-span-2"}>&nbsp;</div>
              <div className={'grid col-span-1 md:col-span-2'}>
                <div className="mb-2 flex justify-between">
                  <div>{en.price.label}</div>
                  <div>
                    <ProductPrice value={Number(product.price)} />
                  </div>
                </div>
                <div className={cn("mb-2 flex justify-between")}>
                  <div>{en.status.label}</div>
                  {productStatus}
                </div>
              </div>
              <div className={cn("col-span-1 md:col-span-3 flex items-center justify-center")}>{renderAddToBagButton}</div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Fragment>
  )
}

export default ProductViewPage
