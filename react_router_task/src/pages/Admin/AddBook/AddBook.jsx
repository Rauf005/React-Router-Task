import React from 'react'
import { useFormik } from 'formik';
import axios from "axios"
import * as Yup from 'yup';
function AddBook() {

    const formik = useFormik({
        initialValues: {
          title: '',
          description:"",
          author: "",
          publishedYear:"",
          price:"",
          language:""
        },
        validationSchema: Yup.object({
            title: Yup.string()
              .max(50, 'Must be 50 characters or less')
              .min(3, 'Must be 3 characters more')
              .required('Required'),
            description: Yup.string()
            .max(50, 'Must be 50 characters or less')
            .min(20, 'Must be 20 characters more')
            .required('Required'),
            author: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .min(3, 'Must be 3 characters more')
            .required('Required'),
            publishedYear: Yup.string()
            .required('Required'),
            price: Yup.string()
            .max(100, 'Must be 100 characters or less')
            .min(3, 'Must be 3 characters more')
            .required('Required'),
            language: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .min(3, 'Must be 3 characters more')
            .required('Required'),
          }),
        onSubmit: values => {
          axios.post("http://localhost:3000/books",values)
          .then(()=>console.log("result: " + values)  );
          formik.resetForm();
        },
      });
      return (
        <div style={{width:"100%",minHeight:"600px",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <form id='addform' onSubmit={formik.handleSubmit}>
          <label htmlFor="description">Description </label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
         <div>{formik.errors.description}</div>
       ) : null}
        
           <label htmlFor="title">Title </label>
          
             <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
             {formik.touched.title && formik.errors.title ? (
         <div style={{color:"red"}}>{formik.errors.title}</div>
       ) : null}
    
    <label htmlFor="author"> Author </label>
          
             <input
            id="author"
            name="author"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.author}
          />
             {formik.touched.author && formik.errors.author ? (
         <div style={{color:"red"}}>{formik.errors.author}</div>
       ) : null}
      
           <label htmlFor="publishedYear">publishedYear </label>
          
             <input
            id="publishedYear"
            name="publishedYear"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.publishedYear}
          />
             {formik.touched.publishedYear && formik.errors.publishedYear ? (
         <div style={{color:"red"}}>{formik.errors.publishedYear}</div>
       ) : null}
       
       <label htmlFor="price">price </label>
          
          <input
         id="price"
         name="price"
         type="number"
         onChange={formik.handleChange}
         value={formik.values.price}
       />
          {formik.touched.price && formik.errors.price ? (
      <div style={{color:"red"}}>{formik.errors.price}</div>
    ) : null}
    
    <label htmlFor="language">language </label>
          
             <input
            id="language"
            name="language"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.language}
          />
             {formik.touched.language && formik.errors.language ? (
         <div style={{color:"red"}}>{formik.errors.language}</div>
       ) : null}
          <button type="submit">Submit</button>
          
        </form>
        
        </div>
      );
  
}

export default AddBook