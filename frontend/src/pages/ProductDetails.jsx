import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import Layout from "../component/Layout/Layout";

function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="grid grid-cols-2 gap-x-0 w-full border">
        <div className="product-image p-2 m-6">
          <img
            src={`/api/v1/products/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
          />
        </div>
        <div className="p-5 flex flex-col gap-5 text-pretty text-2xl font-medium">
          <h1 className=" text-3xl font-semibold">Product Details</h1>
          <h3>Name : {product.name}</h3>
          <h3>Description : {product.description}</h3>
          <h3>
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </h3>
          <h3>Category : {product?.category?.name}</h3>
          <button
            className="bg-orange-500 p-3 border border-orange-300 rounded-lg w-1/2 hover:text-white hover:bg-orange-600"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, p]));
              toast.success("Item Added to cart");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Layout>
    // <Layout>
    //   <div className="row container product-details">
    //     <div className="col-md-6">
    //       <img
    //         src={`/api/v1/products/product-photo/${product._id}`}
    //         className="card-img-top"
    //         height={100}
    //         width={100}
    //         alt={product.name}

    //       />
    //     </div>
    //     <div className="col-md-6 product-details-info">
    //       <h1 className="text-center">Product Details</h1>
    //       <hr />
    //       <h3>Name : {product.name}</h3>
    //       <h3>Description : {product.description}</h3>
    //       <h3>
    //         Price :
    //         {product?.price?.toLocaleString("en-US", {
    //           style: "currency",
    //           currency: "INR",
    //         })}
    //       </h3>
    //       <h3>Category : {product?.category?.name}</h3>
    //       <button className="btn btn-secondary ms-1">ADD TO CART</button>
    //     </div>
    //   </div>
    //   <hr />
    //   <div className="row container similar-products"></div>
    // </Layout>
  );
}

export default ProductDetails;
