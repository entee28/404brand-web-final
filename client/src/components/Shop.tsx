import React from "react";
import { Link } from "react-router-dom";
import { useProductsQuery } from "src/generated/graphql";
import Footer from "./Footer";
import Loader from "./Loader";
import Navbar from "./Navbar";

const Shop = () => {
  const [{ data, fetching }] = useProductsQuery();

  return (
    <>
      <Navbar />
      {!data && fetching ? (
        <Loader />
      ) : (
        <div className="shop">
          <div className="shop-grid">
            {data?.products.map((products) => (
              <Link to={`/product/${products.id}`} key={products.id}>
                <div className="product">
                  <img src={products.imageUrl} alt={products.name} />
                  <h2>{products.name}</h2>
                  <p>${products.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Shop;
