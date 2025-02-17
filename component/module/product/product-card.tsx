"use client"

import { FC } from 'react'
import { PATH_DIR } from 'hgss-dir'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Card, CardHeader, CardContent } from 'component/ui'
import { cn, KEY } from 'lib'
import ProductPrice from './product-price'
import ProductRating from './product-rating'

interface ProductCardProps {
  product: Product
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { theme, systemTheme } = useTheme()
  const _HL =  theme === KEY.LIGHT ? 'text-black' : theme === KEY.DARK ?  ' text-tape' : systemTheme === KEY.DARK ? 'text-tape' : 'text-black'

  return (
    <Card className={"w-full max-w-sm sm:max-w-screen-sm align-middle m-auto border-2 rounded-md cursor-pointer -rotate-1 hover:rotate-0 transform transition-all duration-300 shadow"}>
      <CardHeader className="p-0 items-center">
        <Link href={PATH_DIR.PRODUCT_VIEW(product.slug)}>
          <Image src={product.images[0]} alt={product.name} height={300} width={300} priority />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className={cn("text-xs", _HL)}>{product.brand}</div>
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
