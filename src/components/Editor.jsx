
import{ useState,useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css' 

const Editor = (Props) => {

    const { name,formik }=Props;
    const [editorContent, setEditorContent] = useState('');
    const quillRef = useRef(null);
    
    const handleEditorChange = (content) => {
       setEditorContent(content);
       formik.setFieldValue(name, content);
    };

  return (  
    <ReactQuill 
      ref={quillRef}
      value={editorContent}
      onChange={handleEditorChange}
      modules={{ toolbar: [ 
        [ { 'header': '1' }, { 'header': '2' },{ 'font': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline'],
        ['link', 'image'], 
        ['clean'] ] }
      }
      className='bg-white'
    />  
  );  
};  

export default Editor;  