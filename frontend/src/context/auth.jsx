import axios from 'axios';
import React from 'react';
import {useState, createContext, useContext, useEffect} from 'react';

// 1.CREATE A CONTEXT
const AuthContext = createContext();

// 2. CREATING CONTEXT PROVIDER AND WRAP IT ALSO
const AuthProvider = ({children})=>{
  const [auth,setAuth] = useState({
    user:null,
    token:""  
  });
  //default axios
  axios.defaults.headers.common['Authorization'] = auth?.token;
  useEffect(()=>{
    const data = localStorage.getItem('auth');
    if (data){
      const parseData = JSON.parse(data);
      setAuth({...auth,user:parseData.user,token:parseData.token});
    }
  },[])
  return(
    // if i pass it as array -> const [auth,setAuth] = useContext(AuthContext) OR useAuth()
    // if i pass it as obj -> const {auth,setAuth} = useContext(AuthContext) OR useAuth()
    <AuthContext.Provider value={[auth,setAuth]}>
      {children}
    </AuthContext.Provider>
  )
}


// custom hook-> JUST TO MAKE IT EASIER SYNTAX EASY PEASY
const useAuth = ()=> useContext(AuthContext);
export {useAuth,AuthProvider}
