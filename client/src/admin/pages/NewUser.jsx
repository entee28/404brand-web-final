import '../../Admin.scss';
import Topbar from '../Topbar';
import Sidebar from '../Sidebar';
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addUser } from '../../actions/userActions';

export default function NewUser() {
    const auth = useSelector(state => state.auth);
    const { isAuthenticated, user } = auth;

    const [inputs, setInputs] = useState({});
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputs(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser(inputs));
        history.push("/adminUsers");
    }

    return (
        <>
            {isAuthenticated && user.isAdmin ?
                (
                    <>
                        <Topbar />
                        <div className="container">
                            <Sidebar />

                            <div className="newUser">
                                <h1 className="newUserTitle">New User</h1>
                                <form className="newUserForm">
                                    <div className="newUserItem">
                                        <label>First Name</label>
                                        <input type="text" name='firstname' onChange={handleChange} />
                                    </div>
                                    <div className="newUserItem">
                                        <label>Last Name</label>
                                        <input type="text" name='lastname' onChange={handleChange} />
                                    </div>
                                    <div className="newUserItem">
                                        <label>Email</label>
                                        <input type="email" name='email' onChange={handleChange} />
                                    </div>
                                    <div className="newUserItem">
                                        <label>Password</label>
                                        <input type="password" name='password' onChange={handleChange} />
                                    </div>
                                    <div className="newUserItem">
                                        <label>Admin</label>
                                        <div className="newUserAdmin">
                                            <input type="radio" name="isAdmin" id="true" value="true" onChange={handleChange} />
                                            <label for="male">True</label>
                                            <input type="radio" name="isAdmin" id="false" value="false" onChange={handleChange} />
                                            <label for="female">False</label>
                                        </div>
                                    </div>

                                    <button className="newUserButton" onClick={handleSubmit}>Create</button>
                                </form>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>You are not authorized to access this route. <Link to='/'>Go back</Link></p>
                )}
        </>
    );
}