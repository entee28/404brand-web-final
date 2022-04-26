import { useState } from "react";
import { Link } from "react-router-dom";
import trash from "../res/trash.svg";
import plus from "../res/plus.svg";
import dash from "../res/dash.svg";

const CartItem = ({ item, removeFromCartHandler }) => {
  const [qty, setQty] = useState(item.qty);

  //   const handleQuantity = (type) => {
  //     if (type === "dec") {
  //       qty > 1 && qtyChangeHandler(item.product, qty, type);
  //       qty > 1 && setQty(qty - 1);
  //     } else {
  //       qty < item.countInStock && qtyChangeHandler(item.product, qty, type);
  //       qty < item.countInStock && setQty(qty + 1);
  //     }
  //   };

  return (
    <div className="cartitem">
      <div className="cartitem_image">
        <img src={item.imageUrl} alt={item.name} />
      </div>

      <Link to={`/product/${item.product}`} className="cartitem_name">
        <p>{item.name}</p>
      </Link>

      <p className="cartitem_price">${item.price}</p>

      <div className="amount-container">
        <button className="plus-dash">
          <img src={dash} alt="dash" />
        </button>
        <span className="amount">{qty}</span>
        <button className="plus-dash">
          <img src={plus} alt="plus" />
        </button>
      </div>

      <button className="cartitem_deleteBtn">
        <img src={trash} alt="trash" className="icon" />
      </button>
    </div>
  );
};

export default CartItem;
