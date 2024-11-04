import { BarChart, Bar, Rectangle, XAxis, 
  YAxis, CartesianGrid, Tooltip, Legend,
   ResponsiveContainer } from 'recharts';
import { BsArrowDownRight} from 'react-icons/bs';
import { Table } from "antd";

const data = [
  {
    name: 'فروردین',
    درآمد: 4000,
    amt: 2400,
  },
  {
    name: 'اردیبهشت',
    درآمد: 3000,
    amt: 2210,
  },
  {
    name: 'خرداد',
    درآمد: 2000,
    amt: 2290,
  },
  {
    name: 'تیر',
    درآمد: 2780,
    amt: 2000,
  },
  {
    name: 'مرداد',
    درآمد: 1890,
    amt: 2181,
  },
  {
    name: 'شهریور',
    درآمد: 2390,
    amt: 2500,
  },
  {
    name: 'مهر',
    درآمد: 3490,
    amt: 2100,
  },{
    name: 'آبان',
    درآمد: 3490,
    amt: 2100,
  },
  {
    name: 'آذر',
    درآمد: 3490,
    amt: 2100,
  },
  {
    name: 'دی ',
    درآمد: 3490,
    amt: 2100,
  },
  {
    name: 'بهمن',
    درآمد: 3490,
    amt: 2100,
  },
  {
    name: 'اسفند',
    درآمد: 3490,
    amt: 2100,
  },
];

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

const Dashboard = () => {
return (
  <div className='font-sans h-full overflow-y-scroll ' style={{
    scrollbarWidth:"thin",
    scrollBehavior:"smooth",
  }}>
      <h3 className="mb-5 font-extrabold text-4xl ">داشبورد</h3>
      <div className="flex items-center justify-between gap-10">
        <div className="flex flex-grow items-center justify-between bg-white p-3 rounded-xl">
          <div className="space-y-2">
            <p className="">Total</p>
            <h4 className="font-bold">$ 1100</h4>
          </div>
          <div className="space-y-2">
            <div className=" flex flex-row-reverse items-center gap-1 text-red-500">
              <BsArrowDownRight />
              <h6 className="">32%</h6>
            </div>
            <p className="">Compaered in April 2022</p>
          </div>
        </div>
        <div className="flex flex-grow items-center justify-between bg-white p-3 rounded-xl">
          <div className="space-y-2">
            <p className="">Total</p>
            <h4 className="font-bold">$ 1100</h4>
          </div>
          <div className="space-y-2">
            <div className=" flex flex-row-reverse items-center gap-1 text-green-500">
              <BsArrowDownRight />
              <h6 className="">32%</h6>
            </div>
            <p className="">Compaered in April 2022</p>
          </div>
        </div>
        <div className="flex flex-grow items-center justify-between bg-white p-3 rounded-xl">
          <div className="space-y-2">
            <p className="">Total</p>
            <h4 className="font-bold">$ 1100</h4>
          </div>
          <div className="space-y-2">
            <div className="flex flex-row-reverse items-center gap-1 text-red-500" >
              <BsArrowDownRight />
              <h6 className="">32%</h6>
            </div>
            <p className="">Compaered with in April 2022</p>
          </div>
        </div>
      </div>
      <div className="flex ">
          <div className="flex-1">
            <h3 className="text-xl font-bold mt-4 mb-2">آمار درآمد</h3>
            <div className=""  style={{ width: '100%', height: 400  }}>
                <ResponsiveContainer  >
                  <BarChart
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" reversed={true}/>
                    <YAxis  />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="درآمد" fill="#ffd333" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                  </BarChart>
                </ResponsiveContainer>
            </div>
            
          </div>
          <div className="my-4">
              <h3 className="text-xl font-bold mb-4">بازدیدهای اخیر</h3>    
              <Table
                columns={columns}
                dataSource={dataTable}
                showSorterTooltip={{
                  target: 'sorter-icon',
                }}
                
              />
          </div>  
      </div>
      
      <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">سفارشات اخیر</h3>    
          <Table
            columns={columns}
            dataSource={dataTable}
            showSorterTooltip={{
              target: 'sorter-icon',
            }}
          />
      </div>
  </div>
  )
}

export default Dashboard

