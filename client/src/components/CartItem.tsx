import React from "react";
import { Link } from "react-router-dom";
import { useQtyCartMutation } from "../generated/graphql";
import dash from "../res/dash.svg";
import plus from "../res/plus.svg";
import trash from "../res/trash.svg";

interface Props {
  item: {
    __typename?: "Product" | undefined;
    id: number;
    name: string;
    price: number;
    countInStock: number;
    imageUrl: string;
  };
  Qty: number;
}

const CartItem = ({ item, Qty }: Props) => {
  // const [qty, setQty] = useState(Qty);

  const [, qtyCart] = useQtyCartMutation();

  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "dec") {
      qtyCart({ productId: item.id, type });
    } else {
      qtyCart({ productId: item.id, type });
    }
  };

  return (
    <div className="cartitem">
      <div className="cartitem_image">
        <img src={item.imageUrl} alt={item.name} />
      </div>

      <Link to={`/product/${item.id}`} className="cartitem_name">
        <p>{item.name}</p>
      </Link>

      <p className="cartitem_price">${item.price}</p>

      <div className="amount-container">
        <button className="plus-dash" onClick={() => handleQuantity("dec")}>
          <img src={dash} alt="dash" />
        </button>
        <span className="amount">{Qty}</span>
        <button className="plus-dash" onClick={() => handleQuantity("inc")}>
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
