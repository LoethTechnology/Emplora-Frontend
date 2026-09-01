// Using client
'use client';

// Importing the necessary modules
import Image from 'next/image';
import React, { Fragment, useMemo, useState } from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import Reviews from '@/components/reviews/reviews';
import searchLogo from '@/images/home/search-logo.png';
import textLogo from '@/images/home/home-text-logo.jpg';

import debounce from 'lodash.debounce';
import { CreateGetQueryHook } from '@/src/api/hooks/useGet';
import { useRouter } from 'next/navigation';

// Importing the frequently asked questions objects
import companyInformation from '@/components/frequentlyAskedQuetions/companyInformation';
import generalQuestions from '@/components/frequentlyAskedQuetions/general';
import privacyAndAnonymity from '@/components/frequentlyAskedQuetions/privacyAndAnonymity';
import reviewAndRatings from '@/components/frequentlyAskedQuetions/reviewAndratings';

// Importing the faq loader
import FaqLoader from '@/components/faqLoader/faqLoader';
import Link from 'next/link';

// Creating the home component
const Home = () => {
  // Setting the state
  const [faqActiveMenu, setFaqActiveMenu] = useState('home');

  const [searchValue, setSearchValue] = useState('');
const [debouncedQuery, setDebouncedQuery] = useState('');
const router = useRouter();

  const debouncedUpdate = useMemo(
  () =>
    debounce((value: string) => {
      setDebouncedQuery(value);
    }, 500),
  []
);

  React.useEffect(() => {
  return () => {
    debouncedUpdate.cancel();
  };
}, [debouncedUpdate]);

  const useCompanySearch = CreateGetQueryHook<any>({
  endpoint: '/companies/typeahead',
  queryKey: ['landing-company-search'],
  options: {
    retry: false,
    enabled: debouncedQuery.trim().length > 0,
  },
});

const { data: searchResults, isPending: isSearching } = useCompanySearch({
  query: { q: debouncedQuery },
});

const companies = searchResults?.data ?? [];

  // Creating a function for rendering the faq questions and answer
  const renderFaqMenu = () => {
    switch (faqActiveMenu) {
      case 'home':
        // Pass the props as attributes: name={value}
        return <FaqLoader faqActiveMenu="home" faqData={generalQuestions} />;

      case 'reviewsAndRatings':
        return <FaqLoader faqActiveMenu="reviewsAndRatings" faqData={reviewAndRatings} />;

      case 'privacyAndAnonymity':
        return <FaqLoader faqActiveMenu="privacyAndAnonymity" faqData={privacyAndAnonymity} />;

      case 'companyInformation':
        return <FaqLoader faqActiveMenu="companyInformation" faqData={companyInformation} />;

      default:
        return null;
    }
  };

  // Creating a function for setting the FAQ menu
  const setFaqMenu = (menu: string) => {
    // Setting the state
    setFaqActiveMenu(menu);
  };

  // Rendering the home component
  return (
    <Fragment>
      {/* Adding the Navbar */}
      <Navbar />

      {/* Adding the main div */}
      <main className="min-h-screen bg-white p-4 md:p-7.5 mb-37.5">
        {/* Header Div */}
        <header className="grid justify-center content-center items-center text-center mt-30 md:mt-40">
          <div>
            {/* Reduced text size for mobile (text-4xl) and scaled up for desktop (text-[62px]) */}
            <h2 className="text-4xl md:text-[62px] font-bold leading-tight md:leading-17.5 text-black">
              <div className="flex flex-wrap items-center justify-center w-full gap-1 md:gap-2">
                <span> Discover </span>
                <span className="inline-block align-middle">
                  <Image src={textLogo} alt="text-logo" className="md:w-auto h-15" />
                </span>
                <span> What It is Really </span>
              </div>
              <div>
                Like to <span className="text-[#334EAC]"> Work Anywhere </span>
              </div>
            </h2>
          </div>

          <div className="mt-6 md:mt-2.5">
            {/* Adjusted paragraph size and removed hard <br /> for better mobile flow */}
            <p className="text-[#727272] text-[20px] md:text-[20px] leading-relaxed md:leading-6.5 max-w-3xl mx-auto">
              Get honest reviews, real employee insights, and transparent ratings to help you make
              smarter career decisions.
            </p>
          </div>
        </header>

        {/* Adding the search div */}
        <section className="border border-[#ececec] w-[90%] md:w-[68%] grid mx-auto mt-10 md:mt-20 p-5 min-h-37.5 rounded-[5px] shadow-sm bg-white">
          {/* Changed w-[90%] to w-full to fill the container */}
          <div className="w-full flex flex-col justify-center">
            <div className="mb-4">
              <h2 className="text-[18px]">Find your preferred Company</h2>
            </div>

            <div className="w-full lg:flex items-center">
  <div className="mr-3.75 relative w-full">
    <div className="flex items-center w-full border border-gray-300 rounded-md px-3 py-4 focus-within:ring-2 focus-within:ring-[#334EAC] focus-within:border-transparent h-12.5">
      <Image
        src={searchLogo}
        alt="Search Logo"
        width={20}
        height={20}
        className="mr-3"
      />

      <input
        type="search"
        placeholder="Search for companies...."
        className="w-full outline-none bg-transparent text-gray-700"
        value={searchValue}
        onChange={e => {
          setSearchValue(e.target.value);
          debouncedUpdate(e.target.value);
        }}
      />
    </div>

    {searchValue.trim() && (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
        {isSearching ? (
          <div className="flex items-center justify-center py-6">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#334eac] border-t-transparent" />
          </div>
        ) : companies.length > 0 ? (
          companies.map((company: any) => (
            <button
              key={company.id}
              type="button"
              onClick={() => router.push(`/search-company/${company.id}`)}
              className="block w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors border-b last:border-b-0"
            >
              <div className="font-medium text-gray-900">
                {company.name}
              </div>

              {company.industry && (
                <div className="text-sm text-gray-500">
                  {company.industry}
                </div>
              )}
            </button>
          ))
        ) : (
          <div className="py-6 text-center text-sm text-gray-500">
            No companies found
          </div>
        )}
      </div>
    )}
  </div>

  <div className="mt-3.75 lg:mt-0">
    <button
      type="button"
      onClick={() => {
        if (companies.length > 0) {
          router.push(`/search-company/${companies[0].id}`);
        }
      }}
      className="md:w-[40%] w-full lg:w-auto text-[white] h-12.5 text-[15px] bg-[#334EAC] pl-7.5 pr-7.5 rounded-[5px] hover:bg-[#1e2e6b] transition-colors duration-1000 ease-in-out"
    >
      Search
    </button>
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
                Empowering job seekers with the information they need while driving accountability
                in the workplace.
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
        <section className="mt-12 md:mt-31.25">
          <div className="grid justify-center items-center text-center px-4">
            {/* Badge Container */}
            <div className="mb-6">
              <h1 className="bg-[#ebedf7] text-center w-fit min-w-37.5 md:w-[25%] mx-auto p-3 rounded-[30px] text-[#334eab] text-[15px] border border-[#334eab3b] font-medium">
                Recent Reviews
              </h1>
            </div>

            {/* Main Heading */}
            <div className="max-w-5xl mx-auto">
              <h2 className="text-[26px] md:text-[40px] leading-tight md:leading-11.5 font-medium text-black">
                Explore 500+ Real <span className="text-[#334EAC]"> Employee Reviews </span>
                and Discover Honest Workplace Experiences
              </h2>
            </div>
          </div>
        </section>

        {/*  Reviews component display */}
        <section className="m-auto w-[90%] mt-6.25 px-4 md:px-12.5 py-10 overflow-hidden flex flex-nowrap gap-6 scrollbar-hide snap-x snap-mandatory">
          <div className="flex animate-slide gap-5">
            {/* First set */}
            {[...Array(6)].map((_, i) => (
              <div key={`a-${i}`} className="shrink-0 w-75">
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
              <h1 className="text-center text-[20px] md:text-[20px] leading-7.5 text-[#727272]">
                Rate your experience and describe the work environment, management, salary <br />
                and growth opportunities.
              </h1>
            </div>

            {/* Main Heading */}
            <div className="max-w-5xl mx-auto mt-2.5">
              <Link href="/search-company">
                <button className="text-white h-12.5 text-[15px] bg-[#334EAC] px-7.5 rounded-[5px] hover:bg-[#1e2e6b] transition-colors duration-1000 ease-in-out">
                  {' '}
                  Write a review{' '}
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Adding the frequently asked quetions FAQ section */}
        <section className="mt-32.5">
          <div className="grid items-center text-center px-4">
            {/* Header container  */}
            <header className="mb-4">
              <h1 className="bg-[#ebedf7] text-center w-fit min-w-20 md:w-[25%] mx-auto p-2 rounded-full text-[#334eab] text-[12px] border border-[#334eab3b] font-medium uppercase tracking-wider">
                FAQ
              </h1>
            </header>

            {/* Main Heading */}
            <div className="max-w-5xl mx-auto">
              <h2 className="text-[26px] md:text-[40px] leading-tight md:leading-11.5 font-medium text-black">
                Frequently Asked <span className="text-[#334EAC]"> Questions </span>
              </h2>
            </div>

            {/* FAQ Container div */}
            <div
              className="px-2 py-3 md:px-3 w-full md:w-[65%] lg:w-[55%] 
              flex overflow-x-auto scrollbar-hide gap-2 md:gap-0 md:justify-between md:items-center
              mx-auto min-h-10 rounded-[6px] mt-6.25 md:mt-11.25 bg-[#f7f7f7]"
            >
              {/* Button */}
              <button
                className={`${
                  faqActiveMenu === 'home' ? 'bg-[#334EAC] text-white' : 'text-black'
                } transition-all px-3 md:px-5 py-2 rounded-[6px] text-[12px] md:text-[14px] w-auto whitespace-nowrap shrink-0`}
                onClick={() => setFaqMenu('home')}
              >
                General
              </button>

              <button
                className={`${
                  faqActiveMenu === 'reviewsAndRatings' ? 'bg-[#334EAC] text-white' : 'text-black'
                } transition-all px-3 md:px-5 py-2 rounded-[6px] text-[12px] md:text-[14px] w-auto whitespace-nowrap shrink-0`}
                onClick={() => setFaqActiveMenu('reviewsAndRatings')}
              >
                Reviews & Ratings
              </button>

              <button
                className={`${
                  faqActiveMenu === 'privacyAndAnonymity' ? 'bg-[#334EAC] text-white' : 'text-black'
                } transition-all px-3 md:px-5 py-2 rounded-[6px] text-[12px] md:text-[14px] w-auto whitespace-nowrap shrink-0`}
                onClick={() => setFaqActiveMenu('privacyAndAnonymity')}
              >
                Privacy & Anonymity
              </button>

              <button
                className={`${
                  faqActiveMenu === 'companyInformation' ? 'bg-[#334EAC] text-white' : 'text-black'
                } transition-all px-3 md:px-5 py-2 rounded-[6px] text-[12px] md:text-[14px] w-auto whitespace-nowrap shrink-0`}
                onClick={() => setFaqActiveMenu('companyInformation')}
              >
                Company Info
              </button>
            </div>

            {/* Frequently asked questions content */}
            <div className="text-left md:w-[50%] mx-auto h-75 rounded-[6px] mt-6.25 md:mt-11.25">
              {/* First reviews  */}
              <div className="space-y-4">{renderFaqMenu()}</div>
            </div>
          </div>
        </section>
      </main>

      {/* Adding the footer component */}
      <Footer />
    </Fragment>
  );
};

// Exporting the home page
export default Home;
