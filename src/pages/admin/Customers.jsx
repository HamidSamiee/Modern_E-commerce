import { getAllUsers } from "@/features/userSlice/userSlice";
import Spinner from "@/ui/Spinner";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const columns = [
  {
    title: 'ردیف',
    dataIndex: 'key',
  },  
  {
    title: 'نام',
    dataIndex: 'name',
    sorter : (a,b) => a.name.length - b.name.length ,
  },
  {
    title: 'ایمیل',
    dataIndex: 'email',
  },
  {
    title: 'موبایل',
    dataIndex: 'mobile',
  },
];


const Customers = () => {

  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])
  

  const {customers}=useSelector(state => state.auth)
  // console.log(customers)

  const dataTable = Array.isArray(customers)
  ? customers
      .filter(customer => customer?.role !== "Admin") // فیلتر کردن نقش Admin
      .map((customer, index) => ({
        key: `${toPersianDigits(index + 1)}`,
        name: (
          <div className="flex items-center text-justify">
            {customer?.firstname + " " + customer?.lastname}
          </div>
        ),
        email: (
          <div className="flex items-center text-justify">{customer?.email}</div>
        ),
        mobile: (
          <div className="flex items-center text-justify">{toPersianDigits(customer?.mobile)}</div>
        ),
      }))
  : [];


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
    
      <div className="my-3 font-sans w-full xl:w-3/4"
        style={{
          maxHeight: 'calc(100vh - 150px)',
          overflowY: "scroll",
          scrollBehavior: "smooth",
          scrollbarWidth: "none"
        }}
      >
        <h3 className="text-xl font-bold mb-8"></h3>
        {
          customers ?
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

export default Customers