import React from 'react'
import { NavLink } from 'react-router-dom';
function AdminNavbar() {
  return (
    <div style={{backgroundColor:"#1976D2", width:"100%",height:"100px",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <ul>
<NavLink style={{color:"white",marginLeft:"20px",textDecoration:"none"}} to={"/admin/books"} color="inherit">AdminBooks</NavLink>
      </ul>
    </div>
  )
}

export default AdminNavbar
