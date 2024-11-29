
// import{ useState,useRef, useEffect } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css' 

import React from "react";

// const Editor = (Props) => {

//     const { name,formik }=Props;
//     const [editorContent, setEditorContent] = useState('');
//     const quillRef = useRef(null);
    
//     useEffect(() => {
//        setEditorContent(formik.values[name]); 
//     }, [formik.values[name]]);

//     const handleEditorChange = (content) => {
//        setEditorContent(content);
//        formik.setFieldValue(name, content);
//     };

//   return (  
//     <ReactQuill 
//       ref={quillRef}
//       value={editorContent}
//       onChange={handleEditorChange}
//       modules={{ toolbar: [ 
//         [ { 'header': '1' }, { 'header': '2' },{ 'font': [] }],
//         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//         ['bold', 'italic', 'underline'],
//         ['link', 'image'], 
//         ['clean'] ] }
//       }
//       className='bg-white'
//       style={{direction:'rtl'}}
//     />  
//   );  
// };  

// export default Editor;  
// ---------------------------------------------------------
// import { useRef, useEffect } from 'react';
// import Quill from 'quill';
// import 'quill/dist/quill.snow.css';

// const Editor = (Props) => {
//   const { name, formik } = Props;
//   const quillRef = useRef(null);

//   useEffect(() => {
//     if (quillRef.current) {
//       const quillInstance = new Quill(quillRef.current, {
//         theme: 'snow',
//         modules: {
//           toolbar: [
//             [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
//             [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//             ['bold', 'italic', 'underline'],
//             ['link', 'image'],
//             ['clean']
//           ],
//         },
//       });

//       const observerCallback = () => {
//         const content = quillInstance.root.innerHTML;
//         formik.setFieldValue(name, content);
//       };

//       const observer = new MutationObserver(observerCallback);
//       observer.observe(quillInstance.root, {
//         childList: true,
//         subtree: true,
//         characterData: true
//       });

//       // Set initial content from formik
//       quillInstance.clipboard.dangerouslyPasteHTML(formik.values[name]);

//       // Cleanup function to disconnect observer
//       return () => {
//         observer.disconnect();
//       };
//     }
//   }, [formik.values[name], name]);

//   return (
//     <div ref={quillRef} className='bg-white' style={{ direction: 'rtl' }} />
//   );
// };

// export default Editor;
// -------------------------------------------------------

// import React, { useRef, useEffect } from 'react';
// import Quill from 'quill';
// import 'quill/dist/quill.snow.css';

// const Editor =React.memo ((Props) => {
//   const { name, formik } = Props;
//   // console.log(name);
//   const quillRef = useRef(null);
//   const quillInstanceRef = useRef(null);

//   useEffect(() => {
//     if (!quillInstanceRef.current && quillRef.current) {
//       quillInstanceRef.current = new Quill(quillRef.current, {
//         theme: 'snow',
//         name:{name},
//         modules: {
//           toolbar: [
//             [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
//             [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//             ['bold', 'italic', 'underline'],
//             ['link', 'image'],
//             ['clean'],
//           ],
//         },
//       });

//       const observerCallback = () => {
//         const content = quillInstanceRef.current.root.innerHTML;
//         console.log(content)
//         formik.setFieldValue(name, content); // ثبت محتوای HTML در formik
//       };

//       const observer = new MutationObserver(observerCallback);
//       observer.observe(quillInstanceRef.current.root, {
//         childList: true,
//         subtree: true,
//         characterData: true,
//       });

//       quillInstanceRef.current.clipboard.dangerouslyPasteHTML(formik.values.description); // بارگذاری محتوا

//       return () => {
//         observer.disconnect();
//       };
//     }
//   }, [formik.values.description, name]);

//   return (
//     <div ref={quillRef} name={name} id={name} className='bg-white' style={{ direction: 'rtl' }} />
//   );
// });

// Editor.displayName = "Editor";

// export default Editor;


  const Editor =React.memo((Props) => {
      const { name, value, onChange } = Props;
  return (
    <textarea
      value={value}
      name={name}
      onChange={(e) => onChange(e.target.value)}
      placeholder="توضیحات محصول"
      className="w-full p-1 bg-white border rounded-lg border-secondary-900  focus:ring-secondary-900"
    />
  );
});

Editor.displayName = "Editor";

export default Editor;