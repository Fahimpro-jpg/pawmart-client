import React from 'react';
import errorImage from "../../assets/App-Error.png"
const ErrorPage = () => {
    return (
        <div>
            <img className='mx-auto' src={errorImage} alt="" />
            <p className='text-center mt-4'>The page you are looking for is not available.</p>
        </div>
    );
};

export default ErrorPage;