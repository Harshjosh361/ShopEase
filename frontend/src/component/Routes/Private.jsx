import React from 'react'
import { useState,useEffect } from 'react'
import { useAuth } from '../../context/auth';
import axios from 'axios'
// for nested routing
import { Outlet } from 'react-router-dom';
import { API_URL } from '../../config';
import Spinner from './Spinner';

function Private() {
  const [ok,setOk] = useState(false);
  const [auth,setAuth] = useAuth();

  useEffect(()=>{
    const authCheck =async() =>{
      const res = await axios.get(`${API_URL}api/v1/auth/user-auth`,
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

export default Private

// // n other words, it's a placeholder where the child routes will render. If your Private component is part of a nested route configuration, <Outlet/> will be replaced by the component of the route that matches the current URL.

// For example, if you have the following route configuration:

// When you navigate to /app/dashboard, <Outlet/> in the Private component will be replaced by the Dashboard component. Similarly, if you navigate to /app/settings, <Outlet/> will be replaced by the Settings component.

