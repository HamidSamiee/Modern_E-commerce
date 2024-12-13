import Spinner from "@/ui/Spinner";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { Table } from "antd"
import { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './styles.css';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteBlog, getBlogs } from "@/features/BlogsSlice/blogSlice";
import { getBlogCategories } from "@/features/bCategorySlice/bCategorySlice";
import UpdateBlog from "../UpdateBlog";


const columns = [
  {
    title: 'ردیف',
    dataIndex: 'key',
  },  
  {
    title: '  عنوان بلاگ',
    dataIndex: 'title',
    width: 20,
  },
  {
    title: '  دسته بندی',
    dataIndex: 'category',
  },
  {
    title: ' متن بلاگ',
    dataIndex: 'description',
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


const BlogList = () => {

  const dispatch=useDispatch();
  const [selectedBlogId, setSelectedBlogId] = useState(null)
  const modalRef = useRef(null);

  useEffect(() => {
  dispatch(getBlogs());
  dispatch(getBlogCategories())
  }, [dispatch])
  
  const {blogs}=useSelector((state)=>state.blog);
  const {bCategories}=useSelector((state)=>state.bCategory);
  // console.log(brands)
  

  const handleOpenModal = (blogId) => {
    setSelectedBlogId(blogId);
    if (modalRef.current) {
      modalRef.current.checked = true;
    }
  };

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.checked = false;
    }
    setSelectedBlogId(null);
    dispatch(getBlogs());
  };

  const dataTable = Array.isArray(blogs)
  ? blogs.map((blog, index) => ({
      key: `${toPersianDigits(index + 1)}`,
      title:<div className="w-32 flex items-center" >{blog.title}</div>,
      category:<div className="flex items-center" >{bCategories.filter(bCategory => bCategory._id == blog.category)[0]?.title}</div>,
      description:<div className="max-h-24 flex items-center overflow-scroll " >{renderDescription(blog.description)}</div>,
      action: (
        <div className="flex items-center justify-center gap-5">
          <label className="btn bg-white" onClick={() => handleOpenModal(blog._id)}>
            <div className="tooltip tooltip-bottom" data-tip="ویرایش"><FaEdit className="" /></div>
          </label>
          <button onClick={() => dispatch(deleteBlog(blog._id))} className="btn bg-white">
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
              <h3 className="text-xl font-bold mb-8"> لیست بلاگ ها</h3>    
              {
                 blogs ?
                <>
                  <Table
                    key={blogs?.length || 0}
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
          {selectedBlogId && <UpdateBlog blogId={selectedBlogId} />}
        </div>
        <label className="modal-backdrop" onClick={handleCloseModal}>Close</label>
      </div>
    </>
  )
}

export default BlogList




const renderDescription = (description) => {
  try {
    // Parse the description from JSON
    const parsedDescription = JSON.parse(description);

    // Render Slate content
    return parsedDescription.map((node, index) => {
      if (node.type === 'paragraph') {
        return (
          <p key={index}>
            {node.children.map((child, childIndex) => (
              <span
                key={childIndex}
                style={{
                  fontWeight: child.bold ? 'bold' : 'normal',
                  fontStyle: child.italic ? 'italic' : 'normal',
                }}
              >
                {child.text}
              </span>
            ))}
          </p>
        );
      }
      return null;
    });
  } catch (error) {
    console.error('Error parsing description:', error);
    return <span>محتوا نامعتبر است</span>;
  }
};
