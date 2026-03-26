// Importing the necessary modules 
import React, { Fragment } from 'react'; 

// Creating the register button 
const SignInBtn = () => {
    // Rendering the component 
    return(
        <Fragment> 
            <button className="ml-[20px] h-[50px] text-[15px] text-[#334EAC] border-[1px] border-[#334EAC] pl-[30px] pr-[30px] rounded-[5px]"> 
                Sign In
            </button>
        </Fragment>
    )
}

// Exporting the register button 
export default SignInBtn; 