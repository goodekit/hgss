'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { cn } from 'lib'

interface ProductImageProps {
  images: string[]
}

const ProductImage: FC<ProductImageProps> = ({ images }) => {
  const [current, setCurrent] = useState(0)

  return (
    <div className="grid grid-cols-2 md:grid-cols-7 gap-4 h-[500px]">
        <div className="col-span-1">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={cn('cursor-pointer hover:opacity-50 ease-in-out transition', index !== 0 && 'mt-2')}>
              <Image src={image} alt={'product-image'} width={80} height={80} className={cn(current !== index && 'scale-75')} />
            </div>
          ))}
        </div>
        <div className={'col-span-1 md:col-span-6 flex justify-center items-center'}>
          <div className={"w-[480px] h-[480px] relative overflow-hidden"}>
            <Image src={images[current]} alt={'product-image'} fill className="object-cover object-center" priority />
          </div>
      </div>
    </div>
  )
}

export default ProductImage
