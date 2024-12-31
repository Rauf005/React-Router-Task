import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
function AdminBooks() {
  const [books, setBooks] = useState([]);

  
  useEffect(() => {
    axios.get('http://localhost:3000/books') 
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error("Kitablar yüklənərkən xəta baş verdi:", error);
      });
  }, []);

  
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/books/${id}`)
      .then(() => {
        setBooks(books.filter(book => book.id !== id));
      })}

  return (
    <Container>


      <div style={{ width: "100%", minHeight: "600px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column" }}>
      <button style={{marginBottom:"30px", display: "flex",}} className="btn btn-success">
      <NavLink
                                        style={{ textDecoration: "none", color: "white" }}
                                        to={`/admin/addbook`}
                                      >
                                        Add Book
                                      </NavLink>
      </button>
        <table className="border" style={{ width: "800px", border: "1px solid black" }}>
          <thead>
            <tr>
              <th className="border text-center">Title</th>
              <th className="border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td className="border text-center">{book.title}</td>
                <td className="border text-center">
                  <button className="btn btn-primary mx-3">
                    <NavLink
                                        style={{ textDecoration: "none", color: "white" }}
                                        to={`/admin/books/${book.id}`}
                                      >
                                        Info
                                      </NavLink>
                  </button>
                  <button className='btn btn-warning mx-3'>
                  <NavLink
                                        style={{ textDecoration: "none", color: "white" }}
                                        to={`/admin/edit-book/${book.id}`}
                                      >
                                        Edit
                                      </NavLink>
                  </button>
                  <button 
                    className='btn btn-danger mx-3' 
                    onClick={() => handleDelete(book.id)} 
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default AdminBooks;
