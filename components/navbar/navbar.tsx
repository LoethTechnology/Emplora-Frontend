// Importing the necessary modules 
import { Fragment } from "react";
import RegisterBtn from "../buttons/registerBtn";
import SignInBtn from "../buttons/signInBtn";

// Creating the navbar 
const Navbar = () => {
    return(
        <Fragment> 
            <nav className="border-b border-b-[#f3f3f3] border-mil-border sticky top-0 z-50 bg-[white]"> 
                <nav className="mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo and header */}
                    <div> 
                        <a href="/" className="grid text-[#000000bd] items-center justify-center gap-3 text-[30px] md:text-[30px]"> 
                            Emplora 
                        </a>
                    </div>

                    {/* Links and routes pages - Hidden on mobile, flex on medium screens and up */}
                    <div className="hidden w-[40%] md:flex md:flex-1 md:max-w-[40%] content-center items-center justify-evenly"> 
                        <a href="/" className="text-[#000000bd] hover:text-[#334EAC] whitespace-nowrap"> Home </a>
                        <a href="/about" className="text-[#000000bd] hover:text-[#334EAC] whitespace-nowrap">  About Us </a>
                        <a href="/companyReviews" className="text-[#000000bd] hover:text-[#334EAC] whitespace-nowrap"> Company Reviews </a>
                        <a href="/contact" className="text-[#000000bd] hover:text-[#334EAC] whitespace-nowrap"> Contact Us </a>
                    </div>

                    {/* Register and Sign In Buttons - Hidden on small screens, flex on medium */}
                    <div className="hidden md:flex items-center"> 
                        <RegisterBtn />   
                        <SignInBtn />           
                    </div>

                    {/* Mobile Menu Icon (Optional placeholder for a hamburger menu) */}
                    <div className="md:hidden text-2xl">
                        <button>☰</button>
                    </div>
                </nav>
            </nav>
        </Fragment>
    )
}

// Exporting the navbar 
export default Navbar;