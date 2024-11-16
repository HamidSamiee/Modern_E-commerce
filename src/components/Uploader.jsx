import { deleteImages, uploadImages } from '@/features/uploadSlice/uploadSlice';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Uploader = (Props) => {
  const { formik } = Props;
  const dispatch = useDispatch();
  const { imgs } = useSelector((state) => state.upload);

  useEffect(() => {
    // Update formik values with the uploaded images' public_id and url
    if (imgs.length > 0) {
      const newImages = formik.values.images.map(img => {
        const uploadedImg = imgs.find(u => u.name === img.name);
        if (uploadedImg) {
          return {
            ...img,
            public_id: uploadedImg.public_id,
            url: uploadedImg.url,
          };
        }
        return img;
      });
      formik.setFieldValue('images', newImages);
    }
  }, [imgs]);

  return (
    <Upload 
      listType='picture'
      beforeUpload={(file) => {
        const newImages = [...formik.values.images, file];
        formik.setFieldValue('images', newImages);
        dispatch(uploadImages([file]));
        return false; // Prevent automatic upload by Upload component
      }}
      onRemove={(file) => {
        const newImages = formik.values.images.filter((img) => img.uid !== file.uid);
        formik.setFieldValue('images', newImages);
        console.log(file)
        if (file.public_id) {
          dispatch(deleteImages(file.public_id)); // ارسال public_id برای حذف تصویر
        } else {
          console.error('File does not have a public_id:', file);
        }
      }}
    >
      <Button icon={<UploadOutlined />}>
        بارگذاری تصویر
      </Button>
    </Upload>
  );
};

export default Uploader;
