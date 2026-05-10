// Importing the necessary modules 
import Link from "next/link";
import Image from "next/image";
import React, { Fragment } from 'react';
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import searchCompanyLogo from "@/images/searchCompany/searchCompanyLogo.png";

// Creating the search company component 
const SearchCompany = () => {
    // Rendering the jsx component 
    return (
        <Fragment>
            {/* Adding the navbar */}
            <Navbar />

            {/* Adding the main div */}
            <main className="h-[100vh] w-full">
                {/* Search company hero section */}
                <div className="flex items-center justify-center relative w-full lg:h-101">
                    <Image
                        src={searchCompanyLogo}
                        alt="Search Company Hero Logo"
                        className="absolute w-full h-full object-cover"
                        priority
                    />
                    <div className="flex justify-center flex-col align-middle relative z-10 text-center px-4 sm:px-6">
                        <div>
                            <h1 className="sm:text-4xl md:text-[56px] lg:text-[56px] text-white font-bold mb-4"> Search Company </h1>
                        </div>
                        <div className="relative flex justify-center text-[white]">
                            <Link href="/" className="hover:text-gray-300 transition-colors"> Home </Link>
                            <span className="mx-2"> | </span>
                            <span> Search Company </span>
                        </div>
                    </div>
                </div>

                {/* Discover and explore companies div */}
                <div className="flex justify-center text-black mt-[40px] mb-[45px]">
                    <h2 className="text-[32px]"> Discover and explore companies </h2>
                </div>

                {/* Location, Search, and Filter div */}
                <div>

                </div>

            </main>

            {/* Adding the footer */}
            <Footer />
        </Fragment>
    )
};

// Exporting the search company component 
export default SearchCompany; 