// Importing the necessary modules 
import Link from 'next/link';
import React, { Fragment } from 'react';
import { usePathname } from 'next/navigation';

// Creating the register button 
const SignInBtn = () => {
    const pathname = usePathname();
    // Rendering the component 
    return(
        <Fragment> 
            {/* Creating the link url for signIn */}
            <Link href={`/signin?redirect=${encodeURIComponent(pathname)}`}>
                <button className="h-[50px] text-[15px] text-[#334EAC] border-[1px] border-[#334EAC] pl-[30px] pr-[30px] rounded-[5px]"> 
                    Sign In
                </button>
            </Link>
        </Fragment>
    )
}

// Exporting the register button 
export default SignInBtn; 
