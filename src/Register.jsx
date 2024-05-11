import React, { useCallback, useContext } from 'react';
import NavBar from './NavBar';
import { Link, useNavigate } from 'react-router-dom';
import { HotelContext } from './GlobalStateManager';
import Footer from './Footer';

const Register = () => {
    const {setUpdateStatus, updateStatus} = useContext(HotelContext);
    const navigate = useNavigate();
    function handleRegister(event) {
        event.preventDefault();
        const formData = event.target;
        const name = formData.name.value;
        const email = formData.email.value;
        const password = formData.password.value;
        const dataObj = {
            name, email, password,
            loggedIn : 'active'
        };
        localStorage.setItem("user", JSON.stringify(dataObj));
        setUpdateStatus(updateStatus + 1);
        formData.reset();
        navigate('/');
    }
    return (
        <>
            <NavBar />
            <div className='container'>
                <h2 className='text-center my-5'>Register</h2>
                <form onSubmit={handleRegister}>
                    <label className="form-label">Name:</label>
                    <input className='form-control mb-3' type="text" name="name" />
                    <label className="form-label">Email:</label>
                    <input className='form-control mb-3' type="email" name="email" />
                    <label className="form-label">Password:</label>
                    <input className='form-control mb-3' type="password" name="password" />
                    <button type='submit' className='btn btn-outline-dark w-100'>Submit</button>
                </form>
                <p className='my-4'>Already registered? <Link to="/login">Login here</Link>!</p>
            </div>
            <Footer />
        </>
    );
};

export default Register;