import Layout from "../component/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { API_URL } from "../config";
import { toast } from "react-hot-toast"

function CartPage() {
  const [auth,] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [instance, setInstance] = useState("");
  const [clientToken, setClientToken] = useState("");
  const [,setLoading] = useState(false);

  // TOTAL PRICE
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  // get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${API_URL}api/v1/products/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);
  // HANDLE PAYMENT
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${API_URL}api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // DELETE CART ITEM
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="cart-page bg-gradient-to-r from-blue-200 to-purple-200 backdrop-blur-sm bg-opacity-90">
        <div className="row">
          <div className="col-md-12 m-1 p-3 text-pretty">
            <h1 className="text-center bg-light p-4 mb-2">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row m-4 p-1" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`${API_URL}api/v1/products/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price: ₹{p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger m-2"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary p-5 flex flex-col ">
              <h2 className="text-xl font-bold">Cart Summary</h2>
              <hr />
              <h4 className="text-lg font-medium">Total : {totalPrice()} </h4>
              <>
                <div className="mb-3 text-lg font-medium">
                  <span>Current Address: </span>
                  <span> {auth?.user?.address}</span>
                  <div className="mt-2">
                    <div>
                      {clientToken && (
                        <DropIn
                          options={{
                            authorization: clientToken,
                            paypal: {
                              flow: "vault",
                            },
                          }}
                          onInstance={(instance) => setInstance(instance)}
                        />
                      )}
                      <button
                        onClick={handlePayment}
                        className="btn btn-primary"
                      >
                        Make Payment
                      </button>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
