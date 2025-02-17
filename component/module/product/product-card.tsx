import { FC } from 'react'
import { PATH_DIR } from 'hgss-dir'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardHeader, CardContent } from 'component/ui'
import ProductPrice from './product-price'
import ProductRating from './product-rating'

interface ProductCardProps {
  product: Product
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className={"w-full max-w-sm sm:max-w-screen-sm align-middle m-auto border-2 rounded-md cursor-pointer -rotate-1 hover:rotate-0 transform transition-all duration-300 shadow"}>
      <CardHeader className="p-0 items-center">
        <Link href={PATH_DIR.PRODUCT_VIEW(product.slug)}>
          <Image src={product.images[0]} alt={product.name} height={300} width={300} priority />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className="text-xs text-tape">{product.brand}</div>
        <Link href={PATH_DIR.PRODUCT_VIEW(product.slug)}>
          <h2 className="text-sm font-medium">{product.name}</h2>
        </Link>
        <div className="flex-between gap-4">
          <ProductRating value={Number(product.rating)}/>
          {product.stock > 0 ? <ProductPrice value={Number(product.price)} /> : <p className="text-destructive">{'Out of Stock'}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
