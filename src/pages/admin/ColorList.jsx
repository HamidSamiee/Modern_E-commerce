import { getColors } from "@/features/ColorSlice/colorSlice";
import Spinner from "@/ui/Spinner";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { Table } from "antd";
import { useEffect } from "react";
import { FaEdit ,FaTrashAlt} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";


const columns = [
  {
    title: 'ردیف',
    dataIndex: 'key',
  },  
  {
    title: ' نام رنگ',
    dataIndex: 'name',
  },
  {
    title: ' اقدامات ',
    dataIndex: 'action',
  },
];



const ColorList = () => {

  const dispatch=useDispatch();

  useEffect(() => {
    
  dispatch(getColors());
    
  }, [dispatch])
  
  const {colors}=useSelector((state)=>state.color);

  const dataTable =[] ;
  
  colors.map((color,index)=>{
    dataTable.push({
      key: `${toPersianDigits(index + 1)}`,
      name: `${color.title}`,
      action: <div className="flex gap-2">
        <button className=""><FaEdit className="" /></button>
        <button className=""><FaTrashAlt className="text-rose-500 cursor-pointer" /></button>
      </div>
    })
  })

  const paginationConfig={
    prevIcon: '<',
    nextIcon:'>',
    pageSize: 5,
    showTotal:(total,range)=> `${toPersianDigits(range[0])} - ${toPersianDigits(range[1])}  از  ${toPersianDigits(total)}`,
    itemRender:(current, type ,orginalElement)=>{
      if(type === 'page'){
        return <a>{toPersianDigits(current)}</a>;
      }
      return orginalElement;
    },
    className:'ant-font',
  };

  return (
    <div className="my-3 font-sans w-3/4 "
      style={{
        maxHeight:'calc(100vh - 150px)',
        overflowY:"scroll",
        scrollBehavior:"smooth",
        scrollbarWidth:"none"
      }}
    >
              <h3 className="text-xl font-bold mb-8">لیست رنگ ها  </h3>    
              {
                colors ?
                <>
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
                  
                </>
                :
                <Spinner />
              }
    </div>
  )
}

export default ColorList