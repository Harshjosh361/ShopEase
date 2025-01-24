'use client'

import { NavLink } from "react-router-dom"
import { useAuth } from "../../context/auth"
import { toast } from "react-hot-toast"
import { useCart } from "../../context/cart"

function Header() {
  const [auth, setAuth] = useAuth()
  const [cart] = useCart()
  
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
          <h2 className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Shop Ease
        </h2>
        </div>
        <div className="flex p-2 gap-3">
          <NavLink 
            to="/" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-lg"
          >
            Home
          </NavLink>
          {!auth.user ? (
            <>
              <NavLink 
                to="/register" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-lg"
              >
                Register
              </NavLink>
              <NavLink 
                to="/login" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-lg"
              >
                Login
              </NavLink>
            </>
          ) : (
            <>
              {auth.user.role === 1 && (
                <NavLink
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  Dashboard
                </NavLink>
              )}
              <NavLink
                to="/login"
                onClick={logout}
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
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

