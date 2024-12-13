import { deleteEnquiries, getEnquiries, updateEnquiries } from "@/features/enquirySlice/enquirySlice";
import Spinner from "@/ui/Spinner";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { Table } from "antd";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import UpdateEnquery from "./UpdateEnquery";
import { AiOutlineEye } from "react-icons/ai";


const columns = [
  {
    title: 'ردیف',
    dataIndex: 'key',
  },  
  {
    title: 'نام',
    dataIndex: 'name',
    width:20,
  },
  {
    title: 'ایمیل',
    dataIndex: 'email',
  },
  {
    title: 'موبایل',
    dataIndex: 'mobile',
  },
  {
    title: 'نظر',
    dataIndex: 'comment',
    width:100,
  },
  {
    title: 'وضعیت',
    dataIndex: 'status',
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


const Enquiries = () => {

  const dispatch=useDispatch();
  const [selectedEnqueryId, setSelectedEnqueryId] = useState(null)
  const modalRef = useRef(null);

  useEffect(() => {
    dispatch(getEnquiries())
  }, [dispatch])
  
  const handleOpenModal = (enqueryId) => {
    setSelectedEnqueryId(enqueryId);
    if (modalRef.current) {
      modalRef.current.checked = true;
    }
  };

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.checked = false;
    }
    setSelectedEnqueryId(null);
    dispatch(getEnquiries());
  };

  const handleSelect= useCallback(
    (id, status) => {
      dispatch(updateEnquiries({ id, data: { status } }));
      dispatch(getEnquiries());
    },
    [dispatch]
  );

  const {enquiries}=useSelector(state => state.enquiry)

  const dataTable=Array.isArray(enquiries) ?
  enquiries.map((enquiry,index)=>({
    key: `${toPersianDigits(index + 1)}`,
    name: <div className="flex items-center text-justify">{enquiry?.name}</div>,
    email:<div className="flex items-center text-justify">{enquiry?.email}</div>,
    mobile:<div className="flex items-center text-justify">{toPersianDigits(enquiry?.mobile)}</div>,
    comment:<div className="w-32 flex flex-wrap items-center  truncate">{enquiry?.comment}</div>,
    status: <select 
              className="col-span-6 select select-bordered select-sm w-full max-w-xs " 
              name="status"
              value={enquiry?.status || ''}
              onChange={(e)=>handleSelect(enquiry?._id , e.target.value)}
            >
                    <option value='0'>  وضعیت </option>
                    <option value='Submitted'> Submitted </option>
                    <option value='Contacted'> Contacted </option>
                    <option value='In Progress'> In Progress </option>
                    <option value='Resolved'> Resolved </option>
            </select>
    ,
    action: (
      <div className="flex items-center justify-center gap-5">
        <label className="btn bg-white" onClick={()=>handleOpenModal(enquiry._id)} >
          <div className="tooltip tooltip-bottom" data-tip="نمایش"><AiOutlineEye className="text-blue-500" /></div>
        </label>
        <button  className="btn bg-white" onClick={()=>dispatch(deleteEnquiries(enquiry?._id))}>
          <div className="tooltip tooltip-bottom" data-tip="حذف" ><FaTrashAlt className="text-rose-500 cursor-pointer" /></div>
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
    <>
        <div className="my-3 font-sans w-full"
          style={{
            maxHeight: 'calc(100vh - 150px)',
            overflowY: "scroll",
            scrollBehavior: "smooth",
            scrollbarWidth: "none"
          }}
        >
          <h3 className="text-xl font-bold mb-4">پشتیبانی و خدمات مشتریان</h3>
          {
            enquiries ?
              <Table
                className="ant-font border-2 border-black/50 rounded-lg overflow-x-auto"
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
            {selectedEnqueryId && <UpdateEnquery handleCloseModal={handleCloseModal} enqueryId={selectedEnqueryId} />}
          </div>
          <label className="modal-backdrop" onClick={handleCloseModal}>Close</label>
        </div>
    </>
  )
}

export default Enquiries