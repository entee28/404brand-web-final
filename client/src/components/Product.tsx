import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAddCartMutation, useProductQuery } from "../generated/graphql";
import dash from "../res/dash.svg";
import plus from "../res/plus.svg";
import Footer from "./Footer";
import Loader from "./Loader";
import Navbar from "./Navbar";

const Product = ({ match }: any) => {
  const history = useHistory();

  const [qty, setQty] = useState(1);

  const [{ data, fetching }] = useProductQuery({
    variables: {
      id: parseInt(match.params.id),
    },
  });

  const handleQuantity = (type: "dec" | "inc") => {
    if (type === "dec") {
      qty > 1 && setQty(qty - 1);
    } else {
      qty < data!.product!.countInStock && setQty(qty + 1);
    }
  };

  const [, getCart] = useAddCartMutation();

  const handleAddCart = async () => {
    const cart = await getCart({
      productId: parseInt(match.params.id),
      qty,
    });

    if (!cart) {
      console.error("add cart failed!");
    } else {
      history.push("/cart");
    }
  };

  if (!data?.product) {
    return (
      <div>
        <Navbar />
        <div className="product-wrapper">
          <div>could not find product</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {!data && fetching ? (
        <Loader />
      ) : (
        <div className="product-wrapper">
          <div className="img-container">
            <img src={data?.product.imageUrl} alt={data?.product.name} />
          </div>
          <div className="info-container">
            <h2>{data?.product.name}</h2>
            <p>{data?.product.description}</p>
            <p className="price">${data?.product.price}</p>

            <div className="add-container">
              <div className="amount-container">
                <button
                  onClick={() => handleQuantity("dec")}
                  className="plus-dash"
                >
                  <img src={dash} alt="dash" />
                </button>
                <span className="amount">{qty}</span>
                <button
                  onClick={() => handleQuantity("inc")}
                  className="plus-dash"
                >
                  <img src={plus} alt="plus" />
                </button>
              </div>
            </div>
            {data?.product.countInStock > 0 ? (
              <button className="btn btn-feature" onClick={handleAddCart}>
                Add To Cart
              </button>
            ) : (
              <button className="btn btn-disabled">Out Of Stock</button>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Product;
