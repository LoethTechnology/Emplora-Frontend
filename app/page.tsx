// Importing the necessary modules 
import Navbar from '@/components/navbar/navbar';
import React, { Fragment } from 'react'; 

const Home = () => {
  return (
    <Fragment> 
      {/* Adding the Navbar */}
      <Navbar /> 


      <p>  Home Page </p>
    </Fragment>
  );
}

// Exporting the home page 
export default Home; 
