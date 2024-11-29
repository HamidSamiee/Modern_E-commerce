// import Spinner from "@/ui/Spinner";
// import { toPersianDigits } from "@/utils/toPersianDigits";
// import { Table } from "antd";
// import { useEffect, useState, useRef, forwardRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import './styles.css';
// import { deleteProduct, getAllProducts } from "@/features/ProductsSlice/productSlice";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";
// import UpdateProduct from "../UpdateProduct";

// const columns = [
//   {
//     title: 'ردیف',
//     dataIndex: 'key',
//     width: 10,
//   },
//   {
//     title: 'نام محصول',
//     dataIndex: 'name',
//     width: 500,
//   },
//   {
//     title: 'عملیات',
//     dataIndex: 'action',
//     width: 10,
//   },
// ];

// // اضافه کردن نام نمایشی برای forwardRef
// const ModalInput = forwardRef((props, ref) => (
//   <input type="checkbox" id="my_modal_7" className="modal-toggle" ref={ref} />
// ));
// ModalInput.displayName = 'ModalInput'; // اضافه کردن نام نمایشی

const Orders = () => {
  
//   const dispatch = useDispatch();
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const modalRef = useRef(null);

//   useEffect(() => {
//     dispatch(getAllProducts());
//   }, [dispatch]);

//   const { products } = useSelector((state) => state.product);

//   const handleOpenModal = (productId) => {
//     setSelectedProductId(productId);
//     if (modalRef.current) {
//       modalRef.current.checked = true;
//     }
//   };

//   const handleCloseModal = () => {
//     if (modalRef.current) {
//       modalRef.current.checked = false;
//     }
//   };

//   const dataTable = products.map((product, index) => ({
//     key: `${toPersianDigits(index + 1)}`,
//     name: <div className="flex items-center text-justify">{product.title}</div>,
//     action: (
//       <div className="flex items-center justify-center gap-5">
//         <label className="btn bg-white" onClick={() => handleOpenModal(product._id)}>
//           <div className="tooltip tooltip-bottom" data-tip="ویرایش"><FaEdit className="" /></div>
//         </label>
//         <button onClick={() => dispatch(deleteProduct(product._id))} className="btn bg-white">
//           <div className="tooltip tooltip-bottom" data-tip="حذف"><FaTrashAlt className="text-rose-500 cursor-pointer" /></div>
//         </button>
//       </div>
//     )
//   }));

//   const paginationConfig = {
//     prevIcon: '<',
//     nextIcon: '>',
//     pageSize: 5,
//     showTotal: (total, range) => `${toPersianDigits(range[0])} - ${toPersianDigits(range[1])} از ${toPersianDigits(total)}`,
//     itemRender: (current, type, orginalElement) => {
//       if (type === 'page') {
//         return <a>{toPersianDigits(current)}</a>;
//       }
//       return orginalElement;
//     },
//     className: 'ant-font',
//   };

  return (
    <>
    orders
  
    </>
  );
};

export default Orders;

