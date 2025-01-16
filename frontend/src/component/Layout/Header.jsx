'use client'

import { NavLink } from "react-router-dom"
import { useAuth } from "../../context/auth"
import { toast } from "react-hot-toast"
import { useCart } from "../../context/cart"

function Header() {
  const [auth, setAuth] = useAuth()
  const [cart, setCart] = useCart()
  
  const logout = () => {
    setAuth({ ...auth, user: null, token: "" })
    localStorage.removeItem("auth")
    try {
      toast.success("Logout successfully")
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
  }

  return (
    <div className="shadow-md">
      <nav className="flex justify-between items-center p-1 bg-gradient-to-r from-blue-200 to-purple-200 backdrop-blur-sm bg-opacity-90">
        <div className="flex p-2 justify-center items-center">
          <div>
            <lord-icon
              src="https://cdn.lordicon.com/pbrgppbb.json"
              trigger="hover"
              style={{ width: "50px", height: "50px" }}
            ></lord-icon>
          </div>
          <div className="text-3xl font-bold text-gray-800 transition-colors hover:text-gray-900">
            Shop-Ease
          </div>
        </div>
        <div className="flex p-2 gap-3">
          <NavLink 
            to="/" 
            className="text-gray-700 hover:text-gray-900 text-lg font-medium transition-colors"
          >
            Home
          </NavLink>
          {!auth.user ? (
            <>
              <NavLink 
                to="/register" 
                className="text-gray-700 hover:text-gray-900 text-lg font-medium transition-colors"
              >
                Register
              </NavLink>
              <NavLink 
                to="/login" 
                className="text-gray-700 hover:text-gray-900 text-lg font-medium transition-colors"
              >
                Login
              </NavLink>
            </>
          ) : (
            <>
              {auth.user.role === 1 && (
                <NavLink
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  className="text-gray-700 hover:text-gray-900 text-lg font-medium transition-colors"
                >
                  Dashboard
                </NavLink>
              )}
              <NavLink
                to="/login"
                onClick={logout}
                className="text-gray-700 hover:text-gray-900 text-lg font-medium transition-colors"
              >
                Logout
              </NavLink>
              {auth.user.role === 0 && (
                <NavLink 
                  to="/cart" 
                  className="text-gray-700 hover:text-gray-900 text-lg font-medium transition-colors"
                >
                  Cart ({cart.length})
                </NavLink>
              )}
            </>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Header

