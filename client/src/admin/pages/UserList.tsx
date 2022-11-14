import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "../../actions/userActions";
import "../../Admin.scss";
import { RootState } from "../../reducers";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

export default function UserList() {
  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "firstname",
      headerName: "User",
      width: 150,
      renderCell: (params: any) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              alt=""
            />
            {params.row.firstname}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 120,
    },
    {
      field: "type",
      headerName: "Type",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params: any) => {
        return (
          <>
            <Link to={"/admin/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  const auth = useSelector((state: RootState) => state.auth);
  const { isAuthenticated, user } = auth;
  const userList = useSelector((state: RootState) => state.users);
  const { users } = userList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <>
      {isAuthenticated && user.isAdmin ? (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <div className="userList">
              <div className="userTitleContainer">
                <Link to="/admin/newUser">
                  <button className="userAddButton">Create</button>
                </Link>
              </div>
              <DataGrid
                rows={users}
                disableSelectionOnClick
                columns={columns}
                rowsPerPageOptions={[5, 10, 20]}
                pageSize={10}
                getRowId={(row) => row._id}
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
