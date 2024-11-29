import { deleteBrand, getAllbrands } from "@/features/BrandSlice/brandSlice";
import Spinner from "@/ui/Spinner";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { Table } from "antd"
import { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './styles.css';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import UpdateBrand from "../UpdateBrand";


const columns = [
  {
    title: 'ردیف',
    dataIndex: 'key',
  },  
  {
    title: ' نام برند',
    dataIndex: 'name',
  },
  {
    title: 'عملیات',
    dataIndex: 'action',
    width: 10,
  },
];

const ModalInput = forwardRef((props, ref) => (
  <input type="checkbox" id="my_modal_7" className="modal-toggle" ref={ref} />
));
ModalInput.displayName = 'ModalInput'; // اضافه کردن نام نمایشی


const BrandList = () => {

  const dispatch=useDispatch();
  const [selectedBrandId, setSelectedBrandId] = useState(null)
  const modalRef = useRef(null);

  useEffect(() => {
  dispatch(getAllbrands());
  }, [dispatch])
  
  const {brands}=useSelector((state)=>state.brand);

  // console.log(brands)
  
  useEffect(() => {
    console.log('Brands updated:', brands); // بررسی به‌روزرسانی brands
  }, [brands]);

  const handleOpenModal = (brandId) => {
    setSelectedBrandId(brandId);
    if (modalRef.current) {
      modalRef.current.checked = true;
    }
  };

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.checked = false;
    }
    setSelectedBrandId(null);
    dispatch(getAllbrands());
  };


  const dataTable = Array.isArray(brands)
  ? brands.map((brand, index) => ({
      key: `${toPersianDigits(index + 1)}`,
      name: `${brand.title}`,
      action: (
        <div className="flex items-center justify-center gap-5">
          <label className="btn bg-white" onClick={() => handleOpenModal(brand._id)}>
            <div className="tooltip tooltip-bottom" data-tip="ویرایش"><FaEdit className="" /></div>
          </label>
          <button onClick={() => dispatch(deleteBrand(brand._id))} className="btn bg-white">
            <div className="tooltip tooltip-bottom" data-tip="حذف"><FaTrashAlt className="text-rose-500 cursor-pointer" /></div>
          </button>
        </div>
      )
    }))
  : [];


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
    <>
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
                    key={brands?.length || 0}
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
      {/* Modal part */}
      <ModalInput ref={modalRef} />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <button 
            className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2 z-50" 
            onClick={handleCloseModal}
          >
            ✕
          </button>     
          {selectedBrandId && <UpdateBrand brandId={selectedBrandId} />}
        </div>
        <label className="modal-backdrop" onClick={handleCloseModal}>Close</label>
      </div>
    </>
  )
}

export default BrandList