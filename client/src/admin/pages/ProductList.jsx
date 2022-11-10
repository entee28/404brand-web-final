import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import "../../Admin.scss";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProduct, getProducts } from "../../actions/productActions";

export default function ProductList() {
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 280,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.imageUrl} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "countInStock", headerName: "Stock", width: 120 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;

  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const { products } = product;

  return (
    <>
      {isAuthenticated && user.isAdmin ? (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />

            <div className="productList">
              <div className="productTitleContainer">
                <Link to="/admin/newProduct">
                  <button className="productAddButton">Create</button>
                </Link>
              </div>
              <DataGrid
                rows={products}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row._id}
                rowsPerPageOptions={[5, 10, 20]}
                pageSize={10}
                checkboxSelection
              />
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
