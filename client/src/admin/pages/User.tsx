import {
  AccountBox,
  CalendarToday,
  MailOutline,
  SupervisedUserCircle,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getUserDetails, updateUser } from "../../actions/userActions";
import "../../Admin.scss";
import { RootState } from "../../reducers";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

type UserInputs = {
  firstname: string;
  lastname: string;
  email: string;
  isAdmin: boolean;
  type: "Buyer" | "Seller";
};

export default function User({ match }: any) {
  const auth = useSelector((state: RootState) => state.auth);
  const { isAuthenticated, user } = auth;

  const userDetails = useSelector((state: RootState) => state.userDetails);
  const info = userDetails.user;

  const dispatch = useDispatch();
  useEffect(() => {
    if (info && match.params.userId !== info._id) {
      dispatch(getUserDetails(match.params.userId));
    }
  }, [dispatch, info, match]);

  const [inputs, setInputs] = useState<UserInputs | undefined>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: any) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const history = useHistory();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateUser(inputs, match.params.userId));
    history.push("/admin/users");
  };

  return (
    <>
      {isAuthenticated && user.isAdmin ? (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <div className="user">
              <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/admin/newUser">
                  <button className="userAddButton">Create</button>
                </Link>
              </div>
              <div className="userContainer">
                <div className="userShow">
                  <div className="userShowTop">
                    {/* <img
                                                src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                                alt=""
                                                className="userShowImg"
                                            /> */}
                    <div className="userShowTopTitle">
                      <span className="userShowUsername">{`${info.firstname} ${info.lastname}`}</span>
                    </div>
                  </div>
                  <div className="userShowBottom">
                    <span className="userShowTitle">Account Details</span>
                    <div className="userShowInfo">
                      <MailOutline className="userShowIcon" />
                      <span className="userShowInfoTitle">{info.email}</span>
                    </div>
                    <div className="userShowInfo">
                      <SupervisedUserCircle className="userShowIcon" />
                      <span className="userShowInfoTitle">{info.type}</span>
                    </div>
                    <div className="userShowInfo">
                      <CalendarToday className="userShowIcon" />
                      <span className="userShowInfoTitle">
                        {info.createdAt}
                      </span>
                    </div>
                    {info.isAdmin ? (
                      <div className="userShowInfo">
                        <AccountBox className="userShowIcon" />
                        <span className="userShowInfoTitle">Admin</span>
                      </div>
                    ) : null}

                    {/* <div className="userShowInfo">
                                                <PermIdentity className="userShowIcon" />
                                                <span className="userShowInfoTitle">annabeck99</span>
                                            </div>
                                            <div className="userShowInfo">
                                                <CalendarToday className="userShowIcon" />
                                                <span className="userShowInfoTitle">10.12.1999</span>
                                            </div>
                                            <span className="userShowTitle">Contact Details</span>
                                            <div className="userShowInfo">
                                                <PhoneAndroid className="userShowIcon" />
                                                <span className="userShowInfoTitle">+1 123 456 67</span>
                                            </div>
                                            <div className="userShowInfo">
                                                <MailOutline className="userShowIcon" />
                                                <span className="userShowInfoTitle">annabeck99@gmail.com</span>
                                            </div>
                                            <div className="userShowInfo">
                                                <LocationSearching className="userShowIcon" />
                                                <span className="userShowInfoTitle">New York | USA</span>
                                            </div> */}
                  </div>
                </div>
                <div className="userUpdate">
                  <span className="userUpdateTitle">Edit</span>
                  <form className="userUpdateForm">
                    <div className="userUpdateLeft">
                      <div className="userUpdateItem">
                        <label>First Name</label>
                        <input
                          type="text"
                          placeholder={info.firstname}
                          className="userUpdateInput"
                          name="firstname"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Last Name</label>
                        <input
                          type="text"
                          placeholder={info.lastname}
                          className="userUpdateInput"
                          name="lastname"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Email</label>
                        <input
                          type="text"
                          placeholder={info.email}
                          className="userUpdateInput"
                          name="email"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="userUpdateItem">
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
                          <br />
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
                      <div className="userUpdateItem">
                        <label>User Type</label>
                        <div className="newUserAdmin">
                          <input
                            type="radio"
                            name="type"
                            id="buyer"
                            value="Buyer"
                            onChange={handleChange}
                          />
                          <label>Buyer</label>
                          <br />
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
                      {/* <div className="userUpdateItem">
                                                    <label>Phone</label>
                                                    <input
                                                        type="text"
                                                        placeholder="+1 123 456 67"
                                                        className="userUpdateInput"
                                                    />
                                                </div>
                                                <div className="userUpdateItem">
                                                    <label>Address</label>
                                                    <input
                                                        type="text"
                                                        placeholder="New York | USA"
                                                        className="userUpdateInput"
                                                    />
                                                </div> */}
                    </div>
                    <div className="userUpdateRight">
                      <div className="userUpdateUpload">
                        {/* <img
                                                        className="userUpdateImg"
                                                        src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                                        alt=""
                                                    />
                                                    <label htmlFor="file">
                                                        <Publish className="userUpdateIcon" />
                                                    </label>
                                                    <input type="file" id="file" style={{ display: "none" }} /> */}
                        <button
                          className="userUpdateButton"
                          onClick={handleSubmit}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
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
