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
    <div className="grid grid-cols-1 md:grid-cols-7 spacing-1 gap-4 h-[600px] md:h-[500px]">
      <div className="flex md:flex-col gap-2 order-2 md:order-1 items-center justify-start">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={cn('w-[80px] h-[80px] overflow-hidden cursor-pointer hover:opacity-50 ease-in-out transition')}>
            <Image src={image} alt={'product-image'} width={80} height={80} className={cn("object-cover object-center", current !== index ? 'scale-90' : 'opacity-25')} />
          </div>
        ))}
      </div>
      <div className={'flex justify-center items-center order-1 md:order-2 md:col-span-6'}>
        <div className={"w-[480px] h-[480px] relative overflow-hidden"}>
          <Image src={images[current]} alt={'product-image'} className={"object-cover object-center"} priority fill/>
        </div>
      </div>
    </div>
  )
}

export default ProductImage
