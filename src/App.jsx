import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './NavBar';
import { HotelContext } from './GlobalStateManager';
import Footer from './Footer';

function App() {
  const {hotels} = useContext(HotelContext);
  
  return (
    <>
      <NavBar />

      <header className='text-center py-5 text-bg-secondary mb-5'>
        <h3><b>Modern</b></h3>
        <h1><b>Hotel Booking<br />Solution</b></h1>
      </header>

      <main className='text-center container'>
        <h2>Our Hotels</h2>
        <div className='grid-container'>
        {
          hotels.map(x => (
            <div className="card m-4" style={{maxWidth: "400px"}} key={x.id}>
              <img className="card-img-top" src={x.img} alt="Card image" />
                <div className="card-body">
                  <h4 className="card-title">{x.name}</h4>
                  <p className="card-text">{x.place}</p>
                </div>
                <Link to={`/hotel/${x.id}`}><button type='button' className="btn btn-outline-dark w-100 rounded-top-0">View Details</button></Link>
            </div>
          ))
        }
        </div>
      </main>


      <Footer />
    </>
  )
}

export default App
