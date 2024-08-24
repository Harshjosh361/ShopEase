import React from 'react'
import { useState,useEffect } from 'react'
import { useAuth } from '../../context/auth';
import axios from 'axios'
// for nested routing
import { Outlet } from 'react-router-dom';
import { API_URL } from '../../config';
import Spinner from './Spinner';
function AdminRoute() {
  const [ok,setOk] = useState(false);
  const [auth,setAuth] = useAuth();

  useEffect(()=>{
    const authCheck =async() =>{
      const res = await axios.get(`${API_URL}api/v1/auth/admin-auth`,
      {
        headers:{
          "Authorization": auth?.token
        }
      })
      if(res.data.ok){
        setOk(true);
      }
      else{
        setOk(false);
      }
    }
    if(auth?.token) authCheck();
  },[auth?.token])

  return (
    ok? <Outlet/> : <Spinner/>
  )
}

export default AdminRoute
