import React, { createContext, useEffect, useState } from 'react';

export const HotelContext = createContext();

const GlobalStateManager = ({children}) => {
    const [hotels, setHotels] = useState([]);
    const [userData, setUserData] = useState();
    const [bookingData, setBookingData] = useState();
    const [updateStatus, setUpdateStatus] = useState(0);
    useEffect(() => {
      fetch('/hotelDB.json')
        .then(res => res.json())
        .then(data => setHotels(data))
    }, [])
    useEffect(() => {
        const storageData = localStorage.getItem("user");
        if (storageData) {
          const userObj = JSON.parse(storageData);
          setUserData(userObj);
        }
        setBookingData(JSON.parse(localStorage.getItem("bookings")));
    }, [updateStatus])
    const globalStateData = {
        hotels, userData, setUpdateStatus, updateStatus, bookingData
    };
    
    return (
        <HotelContext.Provider value={globalStateData}>
            {children}
        </HotelContext.Provider>
    );
};

export default GlobalStateManager;