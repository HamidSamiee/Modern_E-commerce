import { getOrders } from "@/features/userSlice/userSlice";
import Spinner from "@/ui/Spinner";
import toLocalDate from "@/utils/toLocalDate";
import { toPersianDigits, toPersianDigitsWithComma } from "@/utils/toPersianDigits";
import { Table } from "antd";
import { useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";


const columns = [
  {
    title: 'ردیف',
    dataIndex: 'key',
  },  
  {
    title: 'نام',
    dataIndex: 'name',
  },
  {
    title: 'محصول',
    dataIndex: 'product',
    width:350,
  },
  {
    title: 'قیمت کل ',
    dataIndex: 'amount',
  },
  {
    title: 'تاریخ',
    dataIndex: 'date',
  },
  {
    title: 'عملیات',
    dataIndex: 'action',
    width: 10,
  },
];


const Orders = () => {

  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])
  
  const {orders}=useSelector(state => state.auth)
  
  console.log(orders);

  const dataTable= Array.isArray(orders) ?
  orders.map((order,index)=>({
    key: `${toPersianDigits(index + 1)}`,
    name: <div className="flex items-center text-justify">{order.orderby.firstname +" " +order.orderby.lastname}</div>,
    product:<ul className="list-disc space-y-2">
              {order.products.map(p=>
                  <li key={p.product._id} className="">{p.product.title}</li>
            )}
            </ul>, 
    amount:<ul className=" space-y-2 text-nowrap">
            {toPersianDigitsWithComma(order.paymentIntent.amount) +" تومان " }
          </ul>, 
    date:<div className="flex items-center text-justify">{toLocalDate(order.createdAt)}</div>, 
    action: (
      <div className="flex items-center justify-center gap-5">
        <label className="btn bg-white" >
          <div className="tooltip tooltip-bottom" data-tip="ویرایش"><FaEdit className="" /></div>
        </label>
        <button  className="btn bg-white">
          <div className="tooltip tooltip-bottom" data-tip="حذف"><FaTrashAlt className="text-rose-500 cursor-pointer" /></div>
        </button>
      </div>
    )
  })) : [] ;

  const paginationConfig = {
    prevIcon: '<',
    nextIcon: '>',
    pageSize: 5,
    showTotal: (total, range) => `${toPersianDigits(range[0])} - ${toPersianDigits(range[1])} از ${toPersianDigits(total)}`,
    itemRender: (current, type, orginalElement) => {
      if (type === 'page') {
        return <a>{toPersianDigits(current)}</a>;
      }
      return orginalElement;
    },
    className: 'ant-font',
  };
  return (
      <div className="my-3 font-sans w-full"
      style ={{
          maxHeight: 'calc(100vh - 150px)',
          overflowY: "scroll",
          scrollBehavior: "smooth",
          scrollbarWidth: "none"
        }}
      >
        <h3 className="text-xl font-bold mb-8"></h3>
        {
          orders ?
            <Table
              className="ant-font border-2 border-black/50 rounded-lg"
              rowClassName="ant-font"
              columns={columns}
              dataSource={dataTable}
              showSorterTooltip={{
                target: 'sorter-icon',
              }}
              pagination={paginationConfig}
            />
            :
            <Spinner />
        }
      </div>
  )
}

export default Orders