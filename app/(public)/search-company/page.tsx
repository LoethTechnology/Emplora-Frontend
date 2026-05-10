// Importing the necessary modules 
import React, { Fragment } from 'react';
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";

// Creating the search company component 
const SearchCompany = () => {
    // Rendering the jsx component 
    return (
        <Fragment>
            {/* Adding the navbar */}
            <Navbar />


            <p> Search Company </p>


            {/* Adding the footer */}
            <Footer />
        </Fragment>
    )
};

// Exporting the search company component 
export default SearchCompany; 