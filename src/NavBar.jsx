import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HotelContext } from './GlobalStateManager';

const NavBar = () => {
  const {userData} = useContext(HotelContext);
  
    return (
        <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Hotel Booking</Link>
          {
            userData?.loggedIn == 'active' ? 
            <Link to="/profile"><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJEDYbLFuHbAGTk8INjc970kiu_Z16Tk-vZny2w4xvaA&s' className='user-img rounded-circle' /></Link>
            :
            <Link to="/login"><button className="btn btn-light" type="button">Login</button></Link>
          }
        </div>
      </nav>
    );
};

export default NavBar;