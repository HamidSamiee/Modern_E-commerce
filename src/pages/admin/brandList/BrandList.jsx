import { getAllbrands } from "@/features/BrandSlice/brandSlice";
import Spinner from "@/ui/Spinner";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { Table } from "antd"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './styles.css';


const columns = [
  {
    title: 'ردیف',
    dataIndex: 'key',
  },  
  {
    title: ' نام برند',
    dataIndex: 'name',
  },
];


const BrandList = () => {

  const dispatch=useDispatch();

  useEffect(() => {
    
  dispatch(getAllbrands());
    
  }, [dispatch])
  
  const {brands}=useSelector((state)=>state.brand);

  const dataTable =[] ;

  brands.map((brand,index)=>
    dataTable.push({
      key: `${toPersianDigits(index + 1)}`,
      name: `${brand.title}`,
    })
  )

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
    <div className="my-3 font-sans  w-3/4 "
      style={{
        maxHeight:'calc(100vh - 150px)',
        overflowY:"scroll",
        scrollBehavior:"smooth",
        scrollbarWidth:"none"
      }}
    >
              <h3 className="text-xl font-bold mb-8"> لیست برند ها</h3>    
              {
                brands ?
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

export default BrandList