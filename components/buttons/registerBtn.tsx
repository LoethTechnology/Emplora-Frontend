// Importing the necessary modules 
import Link from 'next/link';
import React, { Fragment } from 'react'; 

// Creating the register button 
const RegisterBtn = () => {
    // Rendering the component 
    return(
        <Fragment> 
            {/* Creating the link url */}
            <Link href="/register">
                <button className="text-white h-[50px] text-[15px] bg-[#334EAC] px-[30px] rounded-[5px] hover:bg-[#1e2e6b] transition-colors duration-1000 ease-in-out"> 
                    Register
                </button>
            </Link>
        </Fragment>
    )
}

// Exporting the register button 
export default RegisterBtn;