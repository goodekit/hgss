
import { Metadata } from 'next'
import { getMyBag } from "lib/action"
import { transl } from 'lib/util'
import BagTable from "./bag-table"

export const metadata: Metadata = { title: transl('your_bag.label') }

const BagPage = async () => {
    const bag = await getMyBag()
    return (
      <div>
        <BagTable bag={bag} />
      </div>
    )
}

export default BagPage;