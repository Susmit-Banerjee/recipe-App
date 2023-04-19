import React from 'react';
import error404 from '../assets/404 error.webp';

const NotFound = ()=>{
    return(
        <div style={{width:'80%', margin:'auto'}}>
            <img style={{ width:'100%',objectFit: 'stretch', marginBottom:'2rem'}} src={error404} alt="error 404 ...Page not found... " />
        </div>
    );
}
export default NotFound;