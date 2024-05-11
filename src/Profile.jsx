import React, { useContext } from 'react';
import NavBar from './NavBar';
import { HotelContext } from './GlobalStateManager';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';


const Profile = () => {
    const navigate = useNavigate();
    const { userData, setUpdateStatus, updateStatus, bookingData } = useContext(HotelContext);

    function handleLogOut() {
        userData.loggedIn = 'inactive';
        localStorage.setItem("user", JSON.stringify(userData));
        setUpdateStatus(updateStatus + 1);
        navigate("/");
    }
    function handleCancelling(data) {
        const arr = [];
        bookingData.forEach(element => {
            if (element != data) {arr.push(element);}
        });
        localStorage.setItem("bookings", JSON.stringify(arr));
        alert('Booking cancelled!');
        setUpdateStatus(updateStatus + 1);
    }
    if (userData?.loggedIn != 'active') { return navigate("/");}
    return (
        <div>
            <NavBar />
            <div className='container text-center mt-4'>
                <h2>User Profile</h2>
                <p><b>Name : </b>{userData?.name}</p>
                <p><b>Email : </b>{userData?.email}</p>
                <article className='border border-dark p-3 w-50 mb-4 mx-auto'>
                    <h5>Want to log out?</h5>
                    <button onClick={handleLogOut} type='button' className='btn btn-outline-dark mt-2'>Log out</button>
                </article>
                <h3>Manage your bookings!</h3>
                {
                    Array.isArray(bookingData) == true ?
                    <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Hotel</th>
                                <th>Place</th>
                                <th>Room</th>
                                <th>Price</th>
                                <th>Check&nbsp;in(Date)</th>
                                <th>Staying(Days)</th>
                                <th>Cost</th>
                                <th>Cancel(Booking)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookingData.map(x => (
                                    <tr key={bookingData.indexOf(x)}>
                                        <td>{bookingData.indexOf(x) + 1}</td>
                                        <td>{x.hotelName}</td>
                                        <td>{x.place}</td>
                                        <td>{x.roomType}</td>
                                        <td>{x.price}</td>
                                        <td>{x.checkInDate}</td>
                                        <td>{x.totalDays}</td>
                                        <td>{x.cost}</td>
                                        <td><button onClick={() => handleCancelling(x)} type='button' className='btn btn-outline-dark'>Cancel</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                :
                <p>Your booking list is empty!</p>
                }
            </div>
            <Footer />
        </div>
    );
};

export default Profile;