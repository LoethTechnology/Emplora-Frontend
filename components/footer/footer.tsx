// Importing the necessary modules 
import { Fragment } from 'react'; 
import Link from 'next/link';

// Creating the footer component 
const Footer = () => {
    // Getting the current year 
    const currentYear = new Date().getFullYear(); 

    // Returning the footer component
    return(
        <Fragment> 
            {/* Changed h-[40vh] to h-auto and adjusted padding for mobile */}
            <footer className="bg-[#121B3C] text-white p-8 md:p-[50px] h-auto">
                {/* Mobile: flex-col (stacked) 
                    Desktop: md:flex-row (side-by-side) 
                */}
                <section className='flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-10 md:gap-0'>
                    
                    {/* Brand Section */}
                    <section className="max-w-md"> 
                        <div className="mb-[10px]"> 
                            <h1 className="text-[25px] font-light"> Emplora </h1>
                        </div>
                        <div> 
                            {/* Removed <br /> so text wraps naturally on small screens */}
                            <p className="text-[#B6B6B6] text-sm md:text-base"> 
                                A people focused company creating meaningful work 
                                experiences and opportunities for growth. 
                            </p>
                        </div>
                    </section>

                    {/* Links Section */}
                    <section className="w-full md:w-auto"> 
                        {/* Mobile: Vertical list for better thumb-tapping
                            Desktop: horizontal flex
                        */}
                        <ul className="flex flex-col md:flex-row gap-4 md:gap-[40px] text-[#B6B6B6] text-sm md:text-base"> 
                            <li className="hover:text-white transition-colors"> 
                                <Link href="/about"> About Us </Link> 
                            </li>
                            <li className="hover:text-white transition-colors"> 
                                <Link href="/reviews"> Company Review </Link> 
                            </li>
                            <li className="hover:text-white transition-colors"> 
                                <Link href="/contact"> Contact Us </Link> 
                            </li>
                        </ul>
                    </section> 
                </section> 

                {/* Divider Line */}
                <section> 
                    <hr className="border-t border-[#676767] my-8" />
                </section>

                {/* Copyright */}
                <section> 
                    <p className="text-center text-[#B6B6B6] text-xs md:text-sm">
                        &copy; {currentYear} Emplora. All rights reserved.
                    </p>
                </section>
            </footer>
        </Fragment>
    )
}

// Exporting the footer component 
export default Footer; 