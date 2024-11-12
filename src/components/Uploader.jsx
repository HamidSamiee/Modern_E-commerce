import { deleteImages, uploadImages } from '@/features/uploadSlice/uploadSlice';
import { UploadOutlined } from '@ant-design/icons';
import { Upload ,Button} from 'antd';
import { useDispatch } from 'react-redux';


const Uploader = (Props) => {

  const {formik}=Props;
  const dispatch=useDispatch();

  return (
    <Upload 
      listType='picture'  
      beforeUpload={(file)=>{
        formik.setFieldValue('images',[...formik.values.images,file]);
        dispatch(uploadImages([...formik.values.images,file]));
        return false;
      }}
      onRemove={(file)=>{
        const newImages = formik.values.images.filter((img) => img.uid !== file.uid);
        formik.setFieldValue('images',newImages);
        dispatch(deleteImages(file));
      }}
     
    >
    <Button icon={<UploadOutlined />}>
      بارگذاری تصویر
    </Button>
  </Upload>
  )
}

export default Uploader