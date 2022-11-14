import { Link, useHistory } from "react-router-dom";
import Chart from "../Chart";
import { Publish } from "@material-ui/icons";
import "../../Admin.scss";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productActions";
import React, { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateProduct } from "../../actions/productActions";

type OrderIncome = {
  _id: number;
  total: number;
};

type PStats = {
  name: string;
  Sales: number;
}[];

export default function AdminProduct({ match }: any) {
  //@ts-ignore
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;
  const dispatch = useDispatch();

  //@ts-ignore
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  const [pStats, setPStats] = useState<PStats>([]);

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
      dispatch(getProductDetails(match.params.productId));
    }
  }, [dispatch, product, match]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get(
          `/api/orders/income/?pid=${match.params.productId}`
        );
        const list = res.data.sort((a: OrderIncome, b: OrderIncome) => {
          return a._id - b._id;
        });
        list.map((item: OrderIncome) =>
          setPStats((prev: PStats) => [
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

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState<File | undefined>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const history = useHistory();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (file) {
      const fileName = new Date().getTime() + file.name;

      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              const product = { ...inputs, imageUrl: downloadURL };
              dispatch(updateProduct(product, match.params.productId));
            })
            .then(() => history.push("/admin/products"));
        }
      );
    } else {
      dispatch(updateProduct(inputs, match.params.productId));
      history.push("/admin/products");
    }
  };

  return (
    <>
      {isAuthenticated && user.isAdmin ? (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <div className="admin-product">
              <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
              </div>
              <div className="productTop">
                <div className="productTopLeft">
                  <Chart
                    data={pStats}
                    dataKey="Sales"
                    title="Sales Performance"
                    grid={null}
                  />
                </div>
                <div className="productTopRight">
                  <div className="productInfoTop">
                    <img
                      src={product.imageUrl}
                      alt=""
                      className="productInfoImg"
                    />
                    <span className="productName">{product.name}</span>
                  </div>
                  <div className="productInfoBottom">
                    <div className="productInfoItem">
                      <span className="productInfoKey">ID:&nbsp;</span>
                      <span className="productInfoValue">{product._id}</span>
                    </div>
                    <div className="productInfoItem">
                      <span className="productInfoKey">Seller ID:</span>
                      <span className="productInfoValue">{product.seller}</span>
                    </div>
                    <div className="productInfoItem">
                      <span className="productInfoKey">Author:</span>
                      <span className="productInfoValue">{product.author}</span>
                    </div>
                    <div className="productInfoItem">
                      <span className="productInfoKey">Genre:</span>
                      <span className="productInfoValue">{product.genre}</span>
                    </div>

                    <div className="productInfoItem">
                      <span className="productInfoKey">In Stock:</span>
                      <span className="productInfoValue">
                        {product.countInStock}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="productBottom">
                <form className="productForm">
                  <div className="productFormLeft">
                    <label>Product Name</label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      placeholder={`${product.name}`}
                    />
                    <label>Product Description</label>
                    <input
                      type="text"
                      name="description"
                      onChange={handleChange}
                      placeholder={`${product.description}`}
                    />
                    <label>Product Price</label>
                    <input
                      type="number"
                      name="price"
                      onChange={handleChange}
                      placeholder={`${product.price}`}
                    />
                    <label>In Stock</label>
                    <input
                      type="number"
                      name="countInStock"
                      onChange={handleChange}
                      placeholder={`${product.countInStock}`}
                    />
                    <label>Author</label>
                    <input
                      type="text"
                      name="author"
                      onChange={handleChange}
                      placeholder={`${product.author}`}
                    />
                    <label>Genre</label>
                    <input
                      type="text"
                      name="genre"
                      onChange={handleChange}
                      placeholder={`${product.genre || ""}`}
                    />
                  </div>
                  <div className="productFormRight">
                    <div className="productUpload">
                      <img
                        src={product.imageUrl}
                        alt=""
                        className="productUploadImg"
                      />
                      <label>
                        <Publish />
                      </label>
                      <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files?.[0])}
                      />
                    </div>
                    <button className="productButton" onClick={handleSubmit}>
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>
          You are not authorized to access this route.{" "}
          <Link to="/">Go back</Link>
        </p>
      )}
    </>
  );
}
