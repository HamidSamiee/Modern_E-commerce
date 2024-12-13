import Spinner from "@/ui/Spinner";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { Table } from "antd"
import { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './styles.css';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteCoupon, getAllCoupons } from "@/features/couponSlice/couponSlice";
import toLocalDate from "@/utils/toLocalDate";
import UpdateCoupon from "../UpdateCoupon";


const columns = [
  {
    title: 'ردیف',
    dataIndex: 'key',
    width: 10,
  },  
  {
    title: ' عنوان تخفیف ',
    dataIndex: 'name',
    width: 20,
  },
  {
    title: 'درصد تخفیف',
    dataIndex: 'discount',
    width: 20,
  },
  {
    title: 'زمان انقضاء',
    dataIndex: 'expiry',
    width: 20,
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


const CouponList = () => {

  const dispatch=useDispatch();
  const [selectedCouponId, setSelectedCouponId] = useState(null)
  const modalRef = useRef(null);

  useEffect(() => {
  dispatch(getAllCoupons());
  }, [dispatch])
  
  const {coupons}=useSelector((state)=>state.coupon);

 

  const handleOpenModal = (couponId) => {
    setSelectedCouponId(couponId);
    if (modalRef.current) {
      modalRef.current.checked = true;
    }
  };

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.checked = false;
    }
    setSelectedCouponId(null);
    dispatch(getAllCoupons());
  };


  const dataTable = Array.isArray(coupons)
  ? coupons.map((coupon, index) => ({
      key: `${toPersianDigits(index + 1)}`,
      name: <div className="flex items-center text-justify text-nowrap">{coupon.name}</div>,
      discount: <div className="flex items-center text-justify text-nowrap">{toPersianDigits(coupon.discount)}</div>,
      expiry: <div className="flex items-center text-justify text-nowrap">{toLocalDate(coupon.expiry)}</div> ,
      action: (
        <div className="flex items-center justify-center gap-5">
          <label className="btn bg-white" onClick={() => handleOpenModal(coupon._id)}>
            <div className="tooltip tooltip-bottom" data-tip="ویرایش"><FaEdit className="" /></div>
          </label>
          <button onClick={() => dispatch(deleteCoupon(coupon._id))} className="btn bg-white">
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
      <div className="my-3 font-sans  w-full "
      style={{
        maxHeight:'calc(100vh - 150px)',
        overflowY:"scroll",
        scrollBehavior:"smooth",
        scrollbarWidth:"none"
      }}
      >
              <h3 className="text-xl font-bold mb-8"> لیست تخفیف ها</h3>    
              {
                 coupons ?
                <>
                  <Table
                    key={coupons?.length || 0}
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
          {selectedCouponId && <UpdateCoupon handleCloseModal={handleCloseModal} couponId={selectedCouponId} />}
        </div>
        <label className="modal-backdrop" onClick={handleCloseModal}>Close</label>
      </div>
    </>
  )
}

export default CouponList