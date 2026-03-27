// Importing the necessary modules 
import Image from "next/image";
import React, { Fragment } from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from "@/components/footer/footer";
import Reviews from "@/components/reviews/reviews";
import searchLogo from "@/images/home/search-logo.png"; 
import textLogo from "@/images/home/home-text-logo.jpg"; 
 
// Creating the home component
const Home = () => {
  return (
    <Fragment> 
      {/* Adding the Navbar */}
      <Navbar />

      {/* Adding the main div */}
      <main className="min-h-screen bg-white p-4 md:p-[30px] mb-90.5"> 
        {/* Header Div */}
        <header className="grid justify-center content-center items-center text-center mt-30 md:mt-40"> 
          <div> 
            {/* Reduced text size for mobile (text-4xl) and scaled up for desktop (text-[62px]) */}
            <h2 className="text-4xl md:text-[62px] font-bold leading-tight md:leading-[70px] text-black"> 
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
                Find your preferred Company
              </h2>
            </div>
        
            <div className="w-full lg:flex items-center"> 
              {/* Container for the icon and input */}
              <div className="mr-3.75 flex items-center w-full border border-gray-300 rounded-md px-3 py-4 focus-within:ring-2 focus-within:ring-[#334EAC] focus-within:border-transparent h-12.5"> 
                <Image src={searchLogo} alt="Search Logo" width={20} height={20} className="mr-3" /> 
                <input 
                  type="search" 
                  placeholder="Search for companies...." 
                  className="w-full outline-none bg-transparent text-gray-700"
                />
              </div>
              <div className="mt-[15px] lg:mt-0"> 
                <button className="w-[40%] lg:w-auto text-[white] h-[50px] text-[15px] bg-[#334EAC] pl-[30px] pr-[30px] rounded-[5px] hover:bg-[#1e2e6b] transition-colors duration-1000 ease-in-out"> Search </button>
              </div>
            </div>
          </div>
        </section>

        {/* Adding the ratings section */}
        <section className="bg-[#334EAC] min-h-37.5 p-8 mt-30 md:mt-30 rounded-md text-white"> 
          {/* Switch from 'flex' to 'grid' for easier mobile control */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center text-center h-full"> 
            
            {/* Description Text */}
            <div className="text-center lg:text-left"> 
              <p className="text-sm md:text-base leading-relaxed"> 
                Empowering job seekers with the 
                information they need while driving 
                accountability in the workplace. 
              </p>
            </div>

            {/* Stat 1 */}
            <div className="flex flex-col gap-1"> 
              <h1 className="text-[28px] md:text-[32px] font-bold"> 80+ </h1>
              <p className="text-sm opacity-90"> Registered Companies </p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col gap-1"> 
              <h1 className="text-[28px] md:text-[32px] font-bold"> 50+ </h1>
              <p className="text-sm opacity-90"> Company Reviews </p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col gap-1"> 
              <h1 className="text-[28px] md:text-[32px] font-bold"> 50+ </h1>
              <p className="text-sm opacity-90"> Company Ratings </p>
            </div>
          </div>
        </section>

        {/* Adding the recent reviews section header*/}
        <section className="mt-12 md:mt-[125px]"> 
            <div className="grid justify-center items-center text-center px-4"> 
              
              {/* Badge Container */}
              <div className="mb-6"> 
                <h1 className="bg-[#ebedf7] text-center w-fit min-w-[150px] md:w-[25%] mx-auto p-3 rounded-[30px] text-[#334eab] text-[15px] border border-[#334eab3b] font-medium"> 
                    Recent Reviews 
                </h1>
              </div>

              {/* Main Heading */}
              <div className="max-w-5xl mx-auto"> 
                <h2 className="text-[26px] md:text-[40px] leading-tight md:leading-[46px] font-medium text-black"> 
                  Explore 500+ Real <span className="text-[#334EAC]"> Employee Reviews </span> 
                  and Discover Honest Workplace Experiences 
                </h2>
              </div>

            </div>
        </section>

        {/*  Reviews component display */}
        <section className="m-auto w-[90%] mt-[25px] px-4 md:px-[50px] py-10 overflow-hidden flex flex-nowrap gap-6 scrollbar-hide snap-x snap-mandatory">
          <div className="flex animate-slide gap-5">
            {/* First set */}
            {[...Array(6)].map((_, i) => (
              <div key={`a-${i}`} className="flex-shrink-0 w-[300px]">
                <Reviews />
              </div>
            ))}
          </div>
        </section>

        {/* Write a review section */}
        <section className="mt-12 md:mt-5"> 
            <div className="grid justify-center items-center text-center px-4"> 
              
              {/* Header Container */}
              <div className="mb-4"> 
                <h1 className="text-center text-[20px] md:text-[20px] leading-[30px] text-[#727272]">
                  Rate your experience and describe the work environment, management, salary <br /> 
                  and growth opportunities. 
                </h1>
              </div>

              {/* Main Heading */}
              <div className="max-w-5xl mx-auto mt-2.5"> 
                <button className="text-white h-[50px] text-[15px] bg-[#334EAC] px-[30px] rounded-[5px] hover:bg-[#1e2e6b] transition-colors duration-1000 ease-in-out"> Write a review </button>
              </div>

            </div>
        </section>

        





 
      </main>


      {/* Adding the footer component */}
      <Footer />
    </Fragment>
  );
}

// Exporting the home page 
export default Home; 
