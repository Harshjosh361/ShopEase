import React from 'react'
import { useNavigate } from 'react-router-dom'



function Pagenotfound() {
  const navigate = useNavigate();
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
    <div className='text-center font-bold text-3xl '>
      <h1>404</h1>
      <h2>Page not found</h2>
      <button onClick={()=>navigate('/')}
        className=' bg-orange-600 text-white p-2 text-lg rounded w-1/2 mt-2 hover:bg-orange-700'>Home</button>
    </div>
  </div>
  
  )
}

export default Pagenotfound
