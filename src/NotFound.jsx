import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='text-center mt-5'>
            <h2>404</h2>
            <h4>Page not found!</h4>
            <Link to="/">Home</Link>            
        </div>
    );
};

export default NotFound;