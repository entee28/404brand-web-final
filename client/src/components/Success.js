import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { userRequest } from "../requestMethods";

const Success = () => {
    const location = useLocation();
    const data = location.state.stripeData;
    const cartItems = location.state.products;
    const amount = location.state.amount;
    const currentUser = useSelector((state) => state.auth.user);
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await userRequest.post("/api/orders", {
                    userId: currentUser._id,
                    products: cartItems.map((item) => ({
                        productId: item.product,
                        quantity: item.qty,
                    })),
                    amount,
                    address: data.billing_details.address,
                });
                setOrderId(res.data._id);
            } catch (err) {
                console.log(err);
            }
        };
        data && createOrder();
    }, [cartItems, data, currentUser, amount]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {orderId
                ? `Order has been created successfully. Your order number is ${orderId}`
                : `Successfull. Your order is being prepared...`}
            <Link to='/'>
                <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
            </Link>
        </div>
    );
};

export default Success;