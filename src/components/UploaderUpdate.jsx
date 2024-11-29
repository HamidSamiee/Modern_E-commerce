import { uploadImages, resetUploadImages, deleteImages } from '@/features/uploadSlice/uploadSlice';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const UploaderUpdate = (Props) => {

  const { formik , initialImages , productId , setImages } = Props;
  const dispatch = useDispatch();
  const { imgs } = useSelector((state) => state.upload);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (initialImages) {
      setFileList(initialImages.map((file, index) => ({ ...file, uid: index })));
    } else {
      setFileList([]);
    }
  }, [initialImages]);
  

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
    setImages(newImages);
  };

//   const removeFileFromImages = async (file) => {
//     await dispatch(deleteImages(file.public_id)).unwrap();
//     const newImages = formik.values.images.filter((img) => img.uid !== file.uid);
//     formik.setFieldValue('images', [...newImages]);
//     setFileList([...newImages]);
//   };
const removeFileFromImages = async (file) => {
    try {
      const response = await dispatch(deleteImages({ productId, id: file.public_id })).unwrap(); // ارسال productId و public_id
      if (response.message === 'Deleted from Cloudinary and database') {
        console.log(formik.values.images)
        const newImages = formik.values.images.filter((img) => img.public_id !== file.public_id);
        console.log(newImages)
        formik.setFieldValue('images', newImages);
        setFileList(newImages.map((file, index) => ({ ...file, uid: index })));
        setImages(newImages);
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

export default UploaderUpdate;
