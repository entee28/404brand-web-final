import { Link } from "react-router-dom";
import Chart from "../Chart";
import { productData } from "../../dummyData"
import { Publish } from "@material-ui/icons";
import '../../Admin.scss';
import Topbar from '../Topbar';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productActions";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function AdminProduct({ match, history }) {
    const auth = useSelector(state => state.auth);
    const { isAuthenticated, user } = auth;
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { product } = productDetails;

    const [pStats, setPStats] = useState([]);

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        if (product && match.params.productId !== product._id) {
            dispatch(getProductDetails(match.params.productId))
        }
    }, [dispatch, product, match])

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get(`/api/orders/income/?pid=${match.params.productId}`);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ])
                );
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [match.params.productId, MONTHS]);

    return (
        <>
            {isAuthenticated && user.isAdmin ?
                (
                    <>
                        <Topbar />
                        <div className="container">
                            <Sidebar />
                            <div className="admin-product">
                                <div className="productTitleContainer">
                                    <h1 className="productTitle">Product</h1>
                                    <Link to="/adminNewproduct">
                                        <button className="productAddButton">Create</button>
                                    </Link>
                                </div>
                                <div className="productTop">
                                    <div className="productTopLeft">
                                        <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
                                    </div>
                                    <div className="productTopRight">
                                        <div className="productInfoTop">
                                            <img src={product.imageUrl} alt="" className="productInfoImg" />
                                            <span className="productName">{product.name}</span>
                                        </div>
                                        <div className="productInfoBottom">
                                            <div className="productInfoItem">
                                                <span className="productInfoKey">ID: </span>
                                                <span className="productInfoValue">{product._id}</span>
                                            </div>
                                            {/* <div className="productInfoItem">
                                                <span className="productInfoKey">sales:</span>
                                                <span className="productInfoValue">5123</span>
                                            </div>
                                            <div className="productInfoItem">
                                                <span className="productInfoKey">active:</span>
                                                <span className="productInfoValue">yes</span>
                                            </div> */}
                                            <div className="productInfoItem">
                                                <span className="productInfoKey">In Stock:</span>
                                                <span className="productInfoValue">{product.countInStock}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="productBottom">
                                    <form className="productForm">
                                        <div className="productFormLeft">
                                            <label>Product Name</label>
                                            <input type="text" placeholder={`${product.name}`} />
                                            <label>Product Description</label>
                                            <input type="text" placeholder={`${product.description}`} />
                                            <label>Product Price</label>
                                            <input type="number" placeholder={`${product.price}`} />
                                            <label>In Stock</label>
                                            <input type="number" placeholder={`${product.countInStock}`} />
                                        </div>
                                        <div className="productFormRight">
                                            <div className="productUpload">
                                                <img src={product.imageUrl} alt="" className="productUploadImg" />
                                                <label for="file">
                                                    <Publish />
                                                </label>
                                                <input type="file" id="file" style={{ display: "none" }} />
                                            </div>
                                            <button className="productButton">Update</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>You are not authorized to access this route. <Link to='/'>Go back</Link></p>
                )}
        </>
    );
}