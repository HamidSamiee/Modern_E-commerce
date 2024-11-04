import { UploadOutlined } from '@ant-design/icons';
import { Upload ,Button} from 'antd';


const Uploader = (Props) => {
  const {formik}=Props;


  return (
    <Upload 
      listType='picture'  
      beforeUpload={(file)=>{
        formik.setFieldValue('image',file);
        return false;
      }}
      onRemove={()=>formik.setFieldValue('image',null)}
    >
    <Button icon={<UploadOutlined />}>
      بارگذاری تصویر
    </Button>
  </Upload>
  )
}

export default Uploader