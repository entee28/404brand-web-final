import "../../Admin.scss";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { addUser } from "../../actions/userActions";

export default function NewUser() {
  //@ts-ignore
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;

  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();

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
    dispatch(addUser(inputs));
    history.push("/admin/users");
  };

  return (
    <>
      {isAuthenticated && user.isAdmin ? (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />

            <div className="newUser">
              <h1 className="newUserTitle">New User</h1>
              <form className="newUserForm">
                <div className="newUserItem">
                  <label>First Name</label>
                  <input type="text" name="firstname" onChange={handleChange} />
                </div>
                <div className="newUserItem">
                  <label>Last Name</label>
                  <input type="text" name="lastname" onChange={handleChange} />
                </div>
                <div className="newUserItem">
                  <label>Email</label>
                  <input type="email" name="email" onChange={handleChange} />
                </div>
                <div className="newUserItem">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <div className="newUserItem">
                  <label>Admin</label>
                  <div className="newUserAdmin">
                    <input
                      type="radio"
                      name="isAdmin"
                      id="true"
                      value="true"
                      onChange={handleChange}
                    />
                    <label>True</label>
                    <input
                      type="radio"
                      name="isAdmin"
                      id="false"
                      value="false"
                      onChange={handleChange}
                    />
                    <label>False</label>
                  </div>
                </div>
                <div className="newUserItem">
                  <label>Type</label>
                  <div className="newUserAdmin">
                    <input
                      type="radio"
                      name="type"
                      id="buyer"
                      value="Buyer"
                      onChange={handleChange}
                    />
                    <label>Buyer</label>
                    <input
                      type="radio"
                      name="type"
                      id="seller"
                      value="Seller"
                      onChange={handleChange}
                    />
                    <label>Seller</label>
                  </div>
                </div>

                <button className="newUserButton" onClick={handleSubmit}>
                  Create
                </button>
              </form>
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
