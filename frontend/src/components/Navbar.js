import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './contextreducer';
export default function Navbar() {
 let data = useCart();  
 const [cartview,setCartView] = useState(false)
 const Navigate = useNavigate();
 const handlelogout = ()=>{
  localStorage.removeItem("authToken");
  Navigate("/login")
 }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 fst-italic" to="/">eatit</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto " >
              <li className="nav-item">
                <Link className="nav-link active fs-5 " aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className='nav-item'>
                  <Link className='nav-link active fs-5' aria-current="page" to="/MyOrder">My Orders</Link>
                </li> : ""
              }

            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>

                <Link className="btn bg-white text-warning mx-1" to="/Login">Login</Link>
                <Link className="btn bg-white text-warning mx-1" to="/createuser">SignUp</Link>
              </div>
              : <div>
                <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>
                <div className='d-flex'>
                  My Cart 
                  <div className='mx-2 '>
                  { <Badge pill bg="success ">{data.length}</Badge>}
                  </div>
                  </div>
                  </div >
                  {cartview? <Modal onClose={()=>setCartView(false)}><Cart></Cart></Modal>:null}
                  <div className='btn bg-white text-danger mx-2' onClick={handlelogout}>
                    Logout
                    </div >
                    </div >
        }
                    </div >
                  </div>
                </nav>
              </div>
  );
}
