import React, { useContext } from 'react';
import NavBar from './NavBar';
import { Link, useNavigate } from 'react-router-dom';
import { HotelContext } from './GlobalStateManager';
import Footer from './Footer';


const LogIn = () => {
    const {userData, setUpdateStatus, updateStatus} = useContext(HotelContext);
    const navigate = useNavigate();
    function handleLogIn(event) {
        event.preventDefault();
        const formData = event.target;
        const email = formData.email.value;
        const password = formData.password.value;
        if (userData) {
            if (userData.email == email && userData.password == password) {
                userData.loggedIn = 'active';
                localStorage.setItem("user", JSON.stringify(userData));
                setUpdateStatus(updateStatus + 1);
                formData.reset();
                navigate('/');
            }
            else {alert("Credentials didn't match!!");}
        }
        else {alert('You are not registered!');}
    }
    return (
        <>
            <NavBar />
            <div className='container'>
                <h2 className='text-center my-5'>Log In</h2>
                <form onSubmit={handleLogIn}>
                    <label className="form-label">Email:</label>
                    <input className='form-control mb-3' type="email" name="email" />
                    <label className="form-label">Password:</label>
                    <input className='form-control mb-3' type="password" name="password" />
                    <button type='submit' className='btn btn-outline-dark w-100'>Submit</button>
                </form>
                <p className='my-4'>Don't have an account? <Link to="/register">Register here</Link>!</p>
            </div>
            <Footer />
        </>
    );
};

export default LogIn;