import { Table } from "antd";


const columns = [
  {
    title: 'شماره سفارش',
    dataIndex: 'key',
  },  
  {
    title: 'نام',
    dataIndex: 'name',
  },
  {
    title: 'محصول',
    dataIndex: 'product',
  },
  {
    title: 'وضعیت',
    dataIndex: 'status',
  },
];
const dataTable = [
  {
    key: '1',
    name: 'John Brown',
    product: 32,
    status: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    product: 42,
    status: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    product: 32,
    status: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    product: 32,
    status: 'London No. 2 Lake Park',
  },
];

const Enquiries = () => {
  return (
    <div>
       <h3 className="text-2xl font-bold mt-4 mb-2">پرسشگران</h3> 
       <Table
        columns={columns}
        dataSource={dataTable}
        showSorterTooltip={{
          target: 'sorter-icon',
        }}
      />
    </div>
  )
}

export default Enquiries