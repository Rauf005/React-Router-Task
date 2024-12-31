import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { useState } from 'react'
function AdminDetail () {
    let [book,setBook]=useState({})
    let {id}=useParams()
    let navigate=useNavigate()
    async function GetProduct(){
        let result=await  axios.get(`http://localhost:3000/books/${id}`)
        setBook(result.data)
    }
    useEffect( ()=>{
       GetProduct()
    },[id])   
  return (
   <>
   <div style={{width:"80vh",}}>
   <img src={book.image} alt="" />

   <h1 > <strong style={{color:"red"}}>Name:</strong>{book.title}</h1>
   <h1><strong  style={{color:"red"}}>About Book:</strong>{book.description}</h1>
   <h2><strong style={{color:"red"}}>Language:</strong>{book.language}</h2>
   <h2><strong style={{color:"red"}}>Year:</strong>{book.publishedYear}</h2>
   <h2><strong style={{color:"red"}}>Price:</strong>{book.price}</h2>

    <button onClick={()=>navigate("/admin/books")}>Go Back</button>
    
     

    </div>
   </>
  )
}

export default AdminDetail