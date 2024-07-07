import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Spinner() {
  const [count, setCount] = useState(3);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(( ) => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000); 
    count === 0 && navigate("/login",{
      state: location.pathname
    });
    return () => clearInterval(interval);
  }, [count,navigate,location]);
  return (
    <div className="justify-center">
  <div className="spinner-border center" role="status">
    
  </div>
  <span className="sr-only">Loading...</span>
  <h1>Redirecting in {count}</h1>
</div>

  );
}

export default Spinner;
