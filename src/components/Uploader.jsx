import { uploadImages } from '@/features/uploadSlice/uploadSlice';
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
        formik.setFieldValue('images',file);
        dispatch(uploadImages(file));
        return false;
      }}
      onRemove={()=>formik.setFieldValue('images',null)}
    >
    <Button icon={<UploadOutlined />}>
      بارگذاری تصویر
    </Button>
  </Upload>
  )
}

export default Uploader