import { FC } from 'react'
import { PATH_DIR } from 'hgss-dir'
import { en } from 'public/locale'
import { Metadata } from 'next'
import Link from 'next/link'
import { getAllProducts, deleteProduct } from 'lib/action'
import { FilePenLine, ListMinus, SquareArrowOutUpRight, Ellipsis } from 'lucide-react'
import { Button, Table } from 'component/ui'
import { Pagination, DeleteDialg, TooltpGoBadge, Tooltp, NoResult } from 'component/shared'
import { TblHead, TblBody } from 'component/shared/tbl'
import { DDMenu } from 'component/shared/dd-menu'
import { AdminPageTitle } from 'component/admin/title'
import { formatCurrency, formatId, generateTitle, transl } from 'lib'

export const metadata: Metadata = { title: generateTitle(transl('product.products.label'), transl('admin.label')) }

interface AdminProductsPageProps {
    searchParams: Promise<AppProductsPage<string>>
}
const AdminProductsPage: FC<AdminProductsPageProps> = async ({ searchParams }) => {
    const { page, query, category } = await searchParams
    const products                  = await getAllProducts({ query, page: Number(page) || 1, category })

    const MENU_ITEMS = (item: Product) =>  {
       return ([
            { label: en.view.label, icon: <SquareArrowOutUpRight />, href: PATH_DIR.ADMIN.PRODUCT_VIEW(item.id.toString()) },
            { label: en.edit.label, icon: <FilePenLine />, href: PATH_DIR.ADMIN.PRODUCT_VIEW(item.id.toString()) },
            { label: <DeleteDialg id={item.id.toString()} action={deleteProduct}><p className={'text-sm'}>{en.delete.label}</p></DeleteDialg>, icon: <ListMinus />, href: PATH_DIR.ADMIN.PRODUCT }
        ])
    }

    type SevenCellType = TblCells<7>
    const HEAD: SevenCellType = {
        cells: [
            { id: 'productId',  value: 'Product Id', align: 'left' },
            { id: 'name',  value: 'Name', align: 'left' },
            { id: 'price',  value: 'Price', align: 'left' },
            { id: 'category',  value: 'Category', align: 'center' },
            { id: 'stock',  value: 'Stock', align: 'center' },
            { id: 'rating',  value: 'Rating', align: 'center' },
            { id: 'action',  value: '', align: 'right w-[100px]' },
        ]
    }

    const BODY = (item: Product): SevenCellType => ({
        cells: [
            { id: 'productId',  value: <TooltpGoBadge trigger={formatId(item.id.toString())} href={PATH_DIR.PRODUCT_VIEW(item.slug.toString())} content={`${en.go_to.label} this Product`} />, align: 'left', className: '' },
            { id: 'name',  value: item.name, align: 'left', className: '' },
            { id: 'price',  value: formatCurrency(item.price), align: 'left', className: '' },
            { id: 'category',  value: item.category, align: 'center', className: '' },
            { id: 'stock',  value: <p className={`${item.stock <= 0 ? 'text-red-500' : item.stock <= 3 ? 'text-red-500' : '' }` }>{item.stock}</p>, align: 'center' },
            { id: 'rating',  value: item.rating, align: 'center' },
            { id: 'action',  value: (<Tooltp content={en.action.label}><DDMenu title={<Ellipsis size={10} />} menuItems={MENU_ITEMS(item)}/></Tooltp>), align: 'right', className: '' }
        ]
    })

    return (
    <div className={'space-y-2'} suppressHydrationWarning>
        <div className={'flex-between'}>
            <AdminPageTitle query={query} title={en.product.products.label} href={PATH_DIR.ADMIN.PRODUCT} />
            <Button asChild className={'bg-punkpink text-black hover:bg-pink-500 hover:font-bold'}>
                <Link href={PATH_DIR.ADMIN.PRODUCT_CREATE}>{transl('create_product.label')}</Link>
            </Button>
        </div>
        <Table>
            <TblHead cells={HEAD.cells} />
            <TblBody cells={BODY} items={products.data as unknown as Product[]}/>
        </Table>
        <NoResult data={products.totalPages} />
        {products.totalPages > 1 && (
            <div className="mt-5 flex justify-end">
                <Pagination page={Number(page) || 1} totalPages={products.totalPages}/>
            </div>
        )}
    </div>
    );
}

export default AdminProductsPage