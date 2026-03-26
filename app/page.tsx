// Importing the necessary modules 
import Image from "next/image";
import searchLogo from "@/images/home/search-logo.png"; 
import textLogo from "@/images/home/home-text-logo.jpg"; 
import Navbar from '@/components/navbar/navbar';
import React, { Fragment } from 'react'; 

// Creating the home component
const Home = () => {
  return (
    <Fragment> 
      {/* Adding the Navbar */}
      <Navbar /> 

      <main className="min-h-screen bg-white p-4 md:p-[30px]"> 
        {/* Header Div */}
        <header className="grid justify-center content-center items-center text-center mt-12 md:mt-[80px]"> 
          <div> 
            {/* Reduced text size for mobile (text-4xl) and scaled up for desktop (text-[62px]) */}
            <h2 className="text-4xl md:text-[62px] font-bold leading-tight md:leading-[70px]"> 
              <div className="flex flex-wrap items-center justify-center w-full gap-1 md:gap-2"> 
                <span> Discover </span> 
                <span className="inline-block align-middle"> 
                  <Image src={textLogo} alt="text-logo" className="md:w-auto h-[60px]" /> 
                </span> 
                <span> What It is Really </span>
              </div>
              <div>
                Like to <span className="text-[#334EAC]"> Work Anywhere </span>
              </div>
            </h2>
          </div>
          
          <div className="mt-6 md:mt-[10px]"> 
            {/* Adjusted paragraph size and removed hard <br /> for better mobile flow */}
            <p className="text-[#727272] text-[20px] md:text-[20px] leading-relaxed md:leading-[26px] max-w-3xl mx-auto"> 
              Get honest reviews, real employee insights, and transparent ratings to 
              help you make smarter career decisions. 
            </p>
          </div>
        </header>

        {/* Adding the search div */}
        <section className="border border-[#ececec] w-[90%] md:w-[68%] grid mx-auto mt-10 md:mt-[80px] p-5 min-h-[150px] rounded-[5px] shadow-sm bg-white"> 
          {/* Changed w-[90%] to w-full to fill the container */}
          <div className="w-full flex flex-col justify-center"> 
            <div className="mb-4"> 
              <h2 className="text-[18px]"> 
                <strong> Find your preferred Company </strong> 
              </h2>
            </div>
            
            <div className="w-full flex items-center"> 
              {/* Container for the icon and input */}
              <div className="mr-[15px] flex items-center w-full border border-gray-300 rounded-md px-3 py-4 focus-within:ring-2 focus-within:ring-[#334EAC] focus-within:border-transparent"> 
                <Image src={searchLogo} alt="Search Logo" width={20} height={20} className="mr-3" /> 
                <input 
                  type="search" 
                  placeholder="Search for companies...." 
                  className="w-full outline-none bg-transparent text-gray-700"
                />
              </div>
              <div> 
                <button className="text-[white] h-[50px] text-[15px] bg-[#334EAC] pl-[30px] pr-[30px] rounded-[5px]"> Search </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

// Exporting the home page 
export default Home; 
