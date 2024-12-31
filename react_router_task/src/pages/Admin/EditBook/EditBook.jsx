import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

function EditBook() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [book, setBook] = useState(null); 

  
  useEffect(() => {
    axios.get(`http://localhost:3000/books/${id}`)
      .then(response => {
        setBook(response.data);
      })
    
  }, [id]);

  
  const formik = useFormik({
    enableReinitialize: true, 
    initialValues: {
      title: book?.title || '',
      description: book?.description || '',
      author: book?.author || '',
      publishedYear: book?.publishedYear || '',
      price: book?.price || '',
      language: book?.language || '',
      image: book?.image || ''

    },
    validationSchema: Yup.object({
      title: Yup.string().max(50, 'Must be 50 characters or less').min(3, 'Must be 3 characters or more').required('Required'),
      description: Yup.string().max(50, 'Must be 50 characters or less').min(20, 'Must be 20 characters or more').required('Required'),
      author: Yup.string().max(15, 'Must be 15 characters or less').min(3, 'Must be 3 characters or more').required('Required'),
      publishedYear: Yup.string().required('Required'),
      price: Yup.number().required('Required').min(1, 'Price must be positive'),
      language: Yup.string().max(20, 'Must be 20 characters or less').min(3, 'Must be 3 characters or more').required('Required'),
      image: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.put(`http://localhost:3000/books/${id}`, values);
        console.log('Book updated successfully:', response.data);
        navigate('/admin/books'); 
      } catch (error) {
        console.error('Error updating book:', error.response ? error.response.data : error.message);
      }
    }
  });

  if (!book) {
    return <div>Loading...</div>; 
  }

  return (
    <div style={{ width: "100%", minHeight: "600px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form id='editform' onSubmit={formik.handleSubmit}>
        <label htmlFor="title">Title </label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
          <div style={{ color: "red" }}>{formik.errors.title}</div>
        ) : null}
        

        <label htmlFor="description">Description </label>
        <input
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div style={{ color: "red" }}>{formik.errors.description}</div>
        ) : null}
        

        <label htmlFor="author">Author </label>
        <input
          id="author"
          name="author"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.author}
        />
        {formik.touched.author && formik.errors.author ? (
          <div style={{ color: "red" }}>{formik.errors.author}</div>
        ) : null}
        

        <label htmlFor="publishedYear">Published Year </label>
        <input
          id="publishedYear"
          name="publishedYear"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.publishedYear}
        />
        {formik.touched.publishedYear && formik.errors.publishedYear ? (
          <div style={{ color: "red" }}>{formik.errors.publishedYear}</div>
        ) : null}
        

        <label htmlFor="price">Price </label>
        <input
          id="price"
          name="price"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.price}
        />
        {formik.touched.price && formik.errors.price ? (
          <div style={{ color: "red" }}>{formik.errors.price}</div>
        ) : null}
        

        <label htmlFor="language">Language </label>
        <input
          id="language"
          name="language"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.language}
        />
        {formik.touched.image && formik.errors.image ? (
          <div style={{ color: "red" }}>{formik.errors.image}</div>
        ) : null}
        
        <label htmlFor="image">Image </label>
        <input
          id="image"
          name="image"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.image}
        />
        {formik.touched.image && formik.errors.image ? (
          <div style={{ color: "red" }}>{formik.errors.image}</div>
        ) : null}
       


        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}

export default EditBook;
