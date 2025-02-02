import Spinner from "@/ui/Spinner";
import { toPersianDigits, toPersianDigitsWithComma } from "@/utils/toPersianDigits";
import { Table } from "antd";
import { useEffect, useState, useRef, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import './styles.css';
import { deleteProduct, getAllProducts } from "@/features/ProductsSlice/productSlice";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import UpdateProduct from "../UpdateProduct";
import { getAllbrands } from "@/features/BrandSlice/brandSlice";
import { getProductsCategory } from "@/features/pCategorySlice/pCategorySlice";

const columns = [
  {
    title: 'ردیف',
    dataIndex: 'key',
    width: 10,
  },
  {
    title: 'نام محصول',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: 'برند',
    dataIndex: 'brand',
    width: 10,
  },
  {
    title: 'دسته بندی ',
    dataIndex: 'category',
    width: 20,
  },
  {
    title: 'رنگ',
    dataIndex: 'color',
    width: 20,
  },
  {
    title: 'قیمت',
    dataIndex: 'price',
    width: 20,
  },
  {
    title: 'عملیات',
    dataIndex: 'action',
    width: 10,
  },
];

// اضافه کردن نام نمایشی برای forwardRef
const ModalInput = forwardRef((props, ref) => (
  <input type="checkbox" id="my_modal_7" className="modal-toggle" ref={ref} />
));
ModalInput.displayName = 'ModalInput'; // اضافه کردن نام نمایشی

const ProductList = () => {
  
  const dispatch = useDispatch();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllbrands())
    dispatch(getProductsCategory())
  }, [dispatch]);

  const { products=[] } = useSelector((state) => state.product);
  const {brands}=useSelector((state)=>state.brand);
  const {pCategories}=useSelector((state)=>state.pCategory);
  
  const handleOpenModal = (productId) => {
    setSelectedProductId(productId);
    if (modalRef.current) {
      modalRef.current.checked = true;
    }
  };

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.checked = false;
    }
  };

  const handleDeleteProduct = async (productId) => {
    await dispatch(deleteProduct(productId));
    dispatch(getAllProducts());
  };

  const dataTable = Array.isArray(products) ? products.map((product, index) => ({
    key: `${toPersianDigits(index + 1)}`,
    name: <div className="flex items-center text-justify">{product.title}</div>,
    brand: <div className="flex items-center text-justify">{brands.filter(brand =>brand._id === product.brand)[0]?.title}</div>,
    category: <div className="flex items-center text-nowrap">{pCategories.filter(pCategory =>pCategory._id === product.category)[0]?.title}</div>,
    color: <div className="w-20 flex  flex-wrap items-center gap-1 ">{product.color.map((color , index)=><div key={index} className={`px-0.5 border border-gray-400 rounded-md } `} >{color}</div>)}</div>,
    price: <div className="flex items-center text-justify">{toPersianDigitsWithComma(product.price)}</div>,
    action: (
      <div className="flex items-center justify-center gap-5">
        <label className="btn bg-white" onClick={() => handleOpenModal(product._id)}>
          <div className="tooltip tooltip-bottom" data-tip="ویرایش"><FaEdit className="" /></div>
        </label>
        <button onClick={() => handleDeleteProduct(product._id)} className="btn bg-white">
          <div className="tooltip tooltip-bottom" data-tip="حذف"><FaTrashAlt className="text-rose-500 cursor-pointer" /></div>
        </button>
      </div>
    )
  })) : [];

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
        <h3 className="text-xl font-bold mb-8">لیست محصولات</h3>
        {
          Array.isArray(products) && products ?
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
          {selectedProductId && <UpdateProduct productId={selectedProductId} handleCloseModal={handleCloseModal} />}
        </div>
        <label className="modal-backdrop" onClick={handleCloseModal}>Close</label>
      </div>
    </>
  );
};

export default ProductList;
