import  { useState, useEffect } from "react";
import Layout from "../component/Layout/Layout";
import { Checkbox, Radio } from "antd";
import axios from "axios";
import { useCart } from '../context/cart';
import { useNavigate } from "react-router-dom";
import { Prices } from "../component/Prices";
import { toast } from "react-hot-toast";
import {API_URL} from "../config"
import { useAuth } from "@/context/auth";

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [, setLoading] = useState(false);
  const [checked, setChecked] = useState([]); // categories
  const [radio, setRadio] = useState(0); // price range
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  

  //get all categories
  const getAllCategory = async () => {
    try {
      // destructuring data from response object
      const { data } = await axios.get(`${API_URL}api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    const filterProduct = async () => {
      try {
        const { data } = await axios.post(`${API_URL}api/v1/products/product-filters`, { checked, radio });
        setProducts(data?.products);
      } catch (error) {
        console.log(error);
      }
    };

    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  useEffect(() => {
    getAllCategory();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}api/v1/products/get-products`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    // not a good practise to use state variable directly
    // so we are using spread operator to create a new array
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
    console.log(all);
  };

  const handleResetFilter = () => {
    setChecked([]);
    setRadio(0);
    getAllProducts();
  }


  return (
    <Layout className="w-full  bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="container-fluid row home-page  bg-gradient-to-r from-blue-100 to-purple-100 w-full -mr-10">
        <div className="col-md-3 filters">
          <h4 className="text-center text-lg font-bold">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                className="text-md font-semibold p-1 m-1"
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4 text-lg font-bold mb-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array} className="font-semibold p-1 m-1">{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger mt-4"
              onClick={handleResetFilter}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center font-bold m-3 text-2xl">All Products</h1>
          <div className="row">
            {products?.map((p) => (
              <div className="col-md-3 mb-2" key={p._id}>
                <div className="card m-2">
                  <img
                    src={`${API_URL}api/v1/products/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title text-lg font-bold">{p.name}</h5>
                      <h5 className="card-title card-price text-red-600 text-xl mt-2">
                        {p.price.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </h5>
                    </div>
                    <p className="card-text mb-3">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="card-name-price flex gap-2">
                     {auth.token &&  <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      &&
                      <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem("cart", JSON.stringify([...cart, p]));
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                      }
                      
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
