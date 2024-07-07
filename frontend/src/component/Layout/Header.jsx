import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import { useCart } from "../../context/cart";

function Header() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    try {
      toast.success("Logout successfully");
    } catch {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <div>
      <nav className=" flex justify-between items-center p-1 bg-yellow-500">
        <div className="flex p-2 justify-center items-center">
          <div>
            <lord-icon
              src="https://cdn.lordicon.com/pbrgppbb.json"
              trigger="hover"
              style={{ width: "50px", height: "50px" }}
            ></lord-icon>
          </div>
          <div
            className="text-3xl font-bold text-white 
            "
          >
            Shop-Ease
          </div>
        </div>
        <div className="flex p-2 gap-3">
          <NavLink to="/" className="hover:text-white text-lg">
            Home
          </NavLink>
          {!auth.user ? (
            <>
              <NavLink to="/register" className="hover:text-white text-lg">
                Register
              </NavLink>
              <NavLink to="/login" className="hover:text-white text-lg">Login</NavLink>
            </>
          ) : (
            <>
            {auth.user.role === 1 && (<NavLink
                to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                className="hover:text-white text-lg"
              >
                Dashboard
              </NavLink>)}
              
              <NavLink
                to="/login"
                onClick={logout}
                className="hover:text-white text-lg"
              >
                Logout
              </NavLink>
            {auth.user.role === 0 && <NavLink to="/cart" className="hover:text-white text-lg">
                Cart ({cart.length})
              </NavLink>}
              
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
