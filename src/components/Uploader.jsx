// import { deleteImages, uploadImages, resetUploadImages } from '@/features/uploadSlice/uploadSlice';
// import { UploadOutlined } from '@ant-design/icons';
// import { Upload, Button } from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';

// const Uploader = (Props) => {
//   const { formik } = Props;
//   const dispatch = useDispatch();
//   const { imgs } = useSelector((state) => state.upload);
//   const [fileList, setFileList] = useState(null);

//   useEffect(() => {
//     if (imgs.length > 0) {
//       const newImages = formik.values.images.map(img => {
//         const uploadedImg = imgs.find(u => u.name === img.name && u.size === img.size);
//         if (uploadedImg) {
//           return {
//             ...img,
//             public_id: uploadedImg.public_id,
//             url: uploadedImg.url,
//           };
//         }
//         return img;
//       });
//       formik.setFieldValue('images', [newImages]);
//       setFileList(newImages.map((file, index) => ({ ...file, uid: index })));
//     }
//   }, [imgs, formik]);

//   useEffect(() => {
//     if (formik.values.images.length === 0) {
//       setFileList([]);
//       dispatch(resetUploadImages());
//     }
//   }, [formik.values.images]);

//   const addFileToImages = (file) => {
//     const newFile = { ...file, uid: fileList.length };
//     const newImages = [...formik.values.images, newFile];
//     formik.setFieldValue('images', [newImages]);
//     setFileList([newImages]);
//   };

//   const removeFileFromImages = (file) => {
//     const newImages = formik.values.images.filter((img) => img.uid !== file.uid);
//     formik.setFieldValue('images', [newImages]);
//     setFileList([newImages]);
//     const imageToDelete = imgs.find(img => img.name === file.name && img.size === file.size);
//     if (imageToDelete && imageToDelete.public_id) {
//       dispatch(deleteImages(imageToDelete.public_id));
//     } else {
//       console.error('File does not have a public_id:', file);
//     }
//   };

//   return (
//     <Upload
//       className=" mb-11"
//       listType='picture'
//       fileList={fileList}
//       beforeUpload={(file) => {
//         addFileToImages(file);
//         dispatch(uploadImages([file]));
//         return false;
//       }}
//       onRemove={(file) => {
//         removeFileFromImages(file);
//       }}
      
//     >
//       <Button type='primary' icon={<UploadOutlined />}>
//         بارگذاری تصویر
//       </Button>
//     </Upload>
//   );
// };

// export default Uploader;


// // import { cloudinaryDeleteImage, uploadImages } from '@/features/uploadSlice/uploadSlice';
// // import { UploadOutlined } from '@ant-design/icons';
// // import { Upload ,Button} from 'antd';
// // import { useEffect, useState } from 'react';
// // import { useDispatch } from 'react-redux';


// // const Uploader = (Props) => {

// //   const {formik}=Props;
// //   const dispatch=useDispatch();
// //   const [fileList, setFileList] = useState([]);

// //   useEffect(() => {
// //     // همگام‌سازی fileList با تصاویر موجود در formik
// //     setFileList(
// //       formik.values.images.map((file, index) => ({
// //         ...file,
// //         uid: index,
// //       }))
// //     );
// //   }, [formik.values.images]);

// //   return (
// //     <Upload 
// //       listType='picture' 
// //       fileList={fileList} 
// //       beforeUpload={(file) => {
// //         console.log(file)
// //         const newFile = { ...file, uid: fileList.length };
// //         formik.setFieldValue('images', [...formik.values.images, newFile]);
// //         dispatch(uploadImages([file]));
// //         return false;
// //       }}
// //       onRemove={(file) => {
// //         const newImages = formik.values.images.filter((img) => img.uid !== file.uid);
// //         formik.setFieldValue('images', newImages);
// //         dispatch(cloudinaryDeleteImage(file.uid));
// //       }}
     
// //     >
// //     <Button icon={<UploadOutlined />}>
// //       بارگذاری تصویر
// //     </Button>
// //   </Upload>
// //   )
// // }

// // export default Uploader

import { uploadImages, resetUploadImages, deleteImages } from '@/features/uploadSlice/uploadSlice';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Uploader = (Props) => {

  const { formik } = Props;
  const dispatch = useDispatch();
  const { imgs } = useSelector((state) => state.upload);
  const [fileList, setFileList] = useState([]);


  useEffect(() => {
    if (imgs.length > 0) {
      const newImages = formik.values.images.map(img => {
        const uploadedImg = imgs.find(u => u.name === img.name && u.size === img.size);
        if (uploadedImg) {
          return {
            ...img,
            public_id: uploadedImg.public_id,
            url: uploadedImg.url,
          };
        }
        return img;
      });
      formik.setFieldValue('images', [...newImages]);
      setFileList(newImages.map((file, index) => ({ ...file, uid: index })));
    }
  }, [imgs]);

  useEffect(() => {
    if (formik.values.images.length === 0) {
      setFileList([]);
      dispatch(resetUploadImages());
    }
  }, [formik.values.images]);

  const addFileToImages = async (file) => {
    const response = await dispatch(uploadImages([file])).unwrap();
    const uploadedFile = response[0];

    // هماهنگ‌سازی ساختار تصویر جدید با تصاویر موجود
    const newFile = {
      public_id: uploadedFile.public_id,
      url: uploadedFile.url,
      // _id: uploadedFile.public_id || uploadedFile.asset_id , // استفاده از `public_id` به عنوان `_id` برای هماهنگی
    };

    const newImages = [...formik.values.images, newFile];
    console.log(newImages)
    formik.setFieldValue('images', newImages);
    setFileList(newImages.map((file, index) => ({ ...file, uid: index })));
  };

//   const removeFileFromImages = async (file) => {
//     await dispatch(deleteImages(file.public_id)).unwrap();
//     const newImages = formik.values.images.filter((img) => img.uid !== file.uid);
//     formik.setFieldValue('images', [...newImages]);
//     setFileList([...newImages]);
//   };
const removeFileFromImages = async (file) => {
    try {
      const response = await dispatch(deleteImages({ id: file.public_id })).unwrap(); // ارسال productId و public_id
      if (response.message === 'Deleted from Cloudinary and database') {
        console.log(formik.values.images)
        const newImages = formik.values.images.filter((img) => img.public_id !== file.public_id);
        console.log(newImages)
        formik.setFieldValue('images', newImages);
        setFileList(newImages.map((file, index) => ({ ...file, uid: index })));
        
      } else {
        console.error('Error deleting image from database:', response.message);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };
  
  


  return (
    <Upload
      listType='picture'
      fileList={fileList}
      beforeUpload={(file) => {
        addFileToImages(file);
        return false;
      }}
      onRemove={(file) => {
        removeFileFromImages(file);
      }}
    >
      <Button type='primary' icon={<UploadOutlined />}>
        بارگذاری تصویر
      </Button>
    </Upload>
  );
};

export default Uploader;
