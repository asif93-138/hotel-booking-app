import React, { useContext, useState } from 'react';
import NavBar from './NavBar';
import { HotelContext } from './GlobalStateManager';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';


const Hotel = () => {
    const {hotels, userData, bookingData, setUpdateStatus, updateStatus} = useContext(HotelContext);
    
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname[location.pathname.length - 1];
    const hotel = hotels[id - 1];
    const [roomClass, setRoomClass] = useState('container');
    const [formClass, setFormClass] = useState('d-none');
    const [formData, setFormData] = useState();
    function showBookingForm(data) {
        if (userData?.loggedIn == 'active') {
            setRoomClass('d-none');
            setFormClass('container d-sm-flex justify-content-around align-items-center');
            setFormData(data);
        }
        else {alert('Please login first!');}
    }
    function confirmBooking(event) {
        event.preventDefault();
        const formInput = event.target;
        const checkInDate =formInput.checkIn.value; 
        const totalDays = formInput.tDays.value;
        const dataObj = {
            hotelID : id - 1,
            hotelName : hotel.name,
            place : hotel.place,
            roomType : formData.type,
            price : formData.price,
            checkInDate : checkInDate,
            totalDays : Number(totalDays),
            cost : Number(totalDays) * formData.price
        };
        if (bookingData?.length === undefined) {
            const arr = [dataObj];
            localStorage.setItem("bookings", JSON.stringify(arr));
        }
        else {
            const arr = bookingData; arr.push(dataObj);
            localStorage.setItem("bookings", JSON.stringify(arr));
        }
        setUpdateStatus(updateStatus + 1);
        alert('Booking confirmed!');
        navigate('/profile');
        // formInput.reset();
    }
    return (
        <div>
            <NavBar />
            <div className='text-center'>
                <img src={hotel?.img} className='w-100 mb-5' />
                <h2 className='mb-4'>{hotel?.name}</h2>
                <h3 className='mb-4'>{hotel?.place}</h3>
                <h4 className='mb-5'>Available Rooms</h4>
                <section className={roomClass}>
                {
                    hotel?.rooms &&
                    hotel?.rooms.map(x => (
                        <div key={x.id} className='border rounded d-sm-flex justify-content-between align-items-center my-4'>
                            <img src={x.img} className='img-rooms' />
                            <div>
                            <p className='mb-sm-0'>Room Type : {x.type}</p>
                            <p className='mb-sm-0'>Price : BDT {x.price}</p>
                            </div>
                            <button onClick={() => showBookingForm(x)} type='button' className='me-3 btn btn-outline-dark'>Book Now</button>
                        </div>
                    ))
                }
                </section>
                <section className={formClass}>
                    <img src={formData?.img} className='w-25 w-100-mobile' />
                    <form onSubmit={confirmBooking} className='text-start w-50  mt-3 w-100-mobile'>
                        <h4>Booking Form</h4>
                        <p>Room Type : {formData?.type}</p>
                        <p>Price : BDT {formData?.price}</p>
                        <label className="form-label">Check-in Date:</label>
                        <input className='form-control mb-3' type="date" name="checkIn" />
                        <label className="form-label">Staying for(Days):</label>
                        <input className='form-control mb-3' type="number" name="tDays" min="1" />
                        <button type='submit' className='btn btn-outline-dark w-100'>Submit</button>
                    </form>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default Hotel;