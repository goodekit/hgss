import { Metadata } from 'next'
import { PATH_DIR } from 'hgss-dir'
import { deleteOrder, getMyOrders } from 'lib/action'
import { Table, Badge } from 'component/ui'
import { TblHead, TblBody } from 'component/shared/tbl'
import { TooltpGoBadge } from 'component/shared/tooltp'
import { Pagination, DeleteDialg, BackBtn, NoResult } from 'component/shared'
import { formatCurrency, formatDateTime, formatId, transl } from 'lib/util'

export const metadata: Metadata = { title: 'My Orders' }

interface UserOrdersPageProps {
  searchParams: Promise<{ page: string }>
}

const UserOrdersPage = async ({ searchParams }: UserOrdersPageProps) => {
  const { page } = await searchParams
  const orders   = await getMyOrders({ page: Number(page) || 1 })

  type FiveCellType = TblCells<6>
  const HEADER: FiveCellType = {
    cells: [
      { id: 'id', value: 'Order id', align: 'left' },
      { id: 'date', value: 'Date', align: 'center' },
      { id: 'total', value: 'Total', align: 'left' },
      { id: 'paid', value: 'Paid', align: 'center' },
      { id: 'delivered', value: 'Delivered', align: 'center' },
      { id: 'action', value: '', align: 'center' },
    ]
  }

  const BODY = (item: Order): FiveCellType => ({
    cells: [
      {
        id: 'id',
        value: (
          <div className={'flex flex-row items-center'}>
            <TooltpGoBadge trigger={formatId(item.id)} href={PATH_DIR.ORDER_VIEW(item.id)} content={`${transl('go_to.label')} this order`} />
          </div>
        ),
        align: 'left'
      },
      { id: 'date', value: formatDateTime(item.createdAt).dateTime, align: 'center' },
      { id: 'total', value: formatCurrency(item.totalPrice), align: 'left' },
      {
        id: 'paid',
        value: <Badge variant={item.isPaid ? 'outline' : 'destructive'}>{item.isPaid ? formatDateTime(item.paidAt!).dateTime : 'Not paid'}</Badge>,
        align: 'center'
      },
      {
        id: 'delivered',
        value: (
          <Badge variant={item.isDelivered ? 'outline' : 'destructive'}>
            {item.isDelivered ? formatDateTime(item.deliveredAt!).dateTime : 'Not delivered'}
          </Badge>
        ),
        align: 'center'
      },
      {
        id: 'action',
        value: <DeleteDialg id={item.id} action={deleteOrder} />,
        align: 'center'
      }
    ]
  })

  return (
    <div className={'space-y-2'}>
      <BackBtn />
      <h2 className="h2-bold">{transl('order.orders.label')}</h2>
      <div className="overflow-x-auto">
        <Table>
          <TblHead cells={HEADER.cells} />
          <TblBody cells={BODY} items={orders.orders as unknown as Order[]} />
        </Table>
        <NoResult data={orders.totalPages} />
        {orders.totalPages > 1 && (<div className={'mt-5 flex justify-end'}><Pagination page={Number(page) || 1} totalPages={orders?.totalPages}/></div>)}
      </div>
    </div>
  )
}

export default UserOrdersPage
