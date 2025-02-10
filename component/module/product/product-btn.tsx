import Link from 'next/link'
import { en } from 'public/locale'
import { PATH_DIR } from 'hgss-dir'
import { Button } from 'component/ui'

const ProductBtn = () => {
  return (
    <div className={'flex justify-center items-center my-8'}>
      <Button asChild variant={'ghost'} className={'px-8 py-4 text-lg font-semibold'}>
        <Link href={PATH_DIR.SEARCH}>{en.view_all_products.label}</Link>
      </Button>
    </div>
  )
}

export default ProductBtn
