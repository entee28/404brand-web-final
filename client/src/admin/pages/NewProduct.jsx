import '../../Admin.scss';
import Topbar from '../Topbar';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { addProduct } from '../../actions/productActions';


export default function NewProduct() {
    const auth = useSelector(state => state.auth);
    const { isAuthenticated, user } = auth;

    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
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
        const fileName = new Date().getTime() + file.name;

        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const product = { ...inputs, imageUrl: downloadURL };
                    dispatch(addProduct(product));
                }).then(history.push("/admin/products"));
            }
        );
    }

    return (
        <>
            {isAuthenticated && user.isAdmin ?
                (
                    <>
                        <Topbar />
                        <div className="container">
                            <Sidebar />
                            <div className="newProduct">
                                <h1 className="addProductTitle">New Product</h1>
                                <form className="addProductForm">
                                    <div className="addProductItem">
                                        <label>Image</label>
                                        <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
                                    </div>
                                    <div className="addProductItem">
                                        <label>Name</label>
                                        <input type="text" name='name' onChange={handleChange} />
                                    </div>
                                    <div className="addProductItem">
                                        <label>Stock</label>
                                        <input type="number" name='countInStock' onChange={handleChange} />
                                    </div>
                                    <div className="addProductItem">
                                        <label>Price</label>
                                        <input type="number" name='price' onChange={handleChange} />
                                    </div>
                                    <div className="addProductItem">
                                        <label>Description</label>
                                        <input type="text" name='description' onChange={handleChange} />
                                    </div>
                                    <button className="addProductButton" onClick={handleSubmit}>Create</button>
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