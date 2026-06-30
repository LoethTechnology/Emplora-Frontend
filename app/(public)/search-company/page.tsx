// Using client
'use client';

// Importing the necessary modules
import Link from 'next/link';
import Image from 'next/image';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import filterLogo from '@/images/searchCompany/filterLogo.svg';
import CompanyCard from '@/components/searchCompany/companyCard';
import searchCompanyLogo from '@/images/searchCompany/searchCompanyLogo.png';
import debounce from 'lodash.debounce';
import { CreateGetQueryHook } from '@/src/api/hooks/useGet';

// Creating the search company component
const SearchCompany = () => {
  // Setting the state for locations input
  const [location, setLocation] = useState('');
  const [filter, setFilter] = useState('');
  const [value, setValue] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  //
  const companies = [
    {
      name: 'Tech Company 1',
      industry: 'Technology',
      logo: '',
      id: '1',
    },
    {
      name: 'Finance Company 1',
      industry: 'Finance',
      logo: '',
      id: '2',
    },
    {
      name: 'Healthcare Company 1',
      industry: 'Healthcare',
      logo: '',
      id: '3',
    },
    {
      name: 'Tech Company 1',
      industry: 'Technology',
      logo: '',
      id: '4',
    },
  ];

  // Setting the locations
  const locations = [
    'Lagos',
    'Abuja',
    'Port Harcourt',
    'Kano',
    'Ibadan',
    'Enugu',
    'Kaduna',
    'Benin City',
    'Maiduguri',
    'Zaria',
  ];
  const filters = ['Date Posted', 'Company', 'Location', 'Job Type', 'Experience Level'];

  const debouncedUpdate = useMemo(
    () =>
      debounce((val: string) => {
        setDebouncedQuery(val); // update debounced value
      }, 500),
    []
  );
  // cancel debounce when component unmounts
  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  const useSearch = CreateGetQueryHook<any>({
    endpoint: '/companies/typeahead',
    queryKey: ['search-results'],
    options: {
      retry: false,
      enabled: debouncedQuery.trim().length > 0,
    },
  });

  const { data: searchResults, isPending: isSearching } = useSearch({
    query: { q: debouncedQuery },
  });

  const results = searchResults?.data ?? [];

  // Rendering the jsx component
  return (
    <Fragment>
      {/* Adding the navbar */}
      <Navbar />

      {/* Adding the main div */}
      <main className="h-fit w-full mb-25">
        {/* Search company hero section */}
        <div className="h-101 flex items-center justify-center relative w-full lg:h-101">
          <Image
            src={searchCompanyLogo}
            alt="Search Company Hero Logo"
            className="absolute w-full h-full object-cover"
            priority
          />
          <div className="flex justify-center flex-col align-middle relative z-10 text-center px-4 sm:px-6">
            <div>
              <h1 className="text-[40px] md:text-[56px] lg:text-[56px] text-white font-bold mb-4">
                {' '}
                Search Company{' '}
              </h1>
            </div>
            <div className="relative flex justify-center text-[white]">
              <Link href="/" className="hover:text-gray-300 transition-colors">
                {' '}
                Home{' '}
              </Link>
              <span className="mx-2"> | </span>
              <span> Search Company </span>
            </div>
          </div>
        </div>

        {/* Discover and explore companies div */}
        <div className="flex justify-center text-black mt-10 mb-11.25">
          <h2 className="text-[19px] sm:text-[32px] lg:text-[32px]">
            {' '}
            Discover and explore companies{' '}
          </h2>
        </div>

        {/* Location, Search, and Filter div */}
        <section className="items-center justify-center gap-4 rounded-lg h-fit w-[90%] mx-auto mb-50">
          {/* Location input and search  */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 h-full w-full px-4 py-2">
            {/* Location input */}
            <div className="flex items-center w-fit border border-[#cccccc] p-2.5 rounded-[7px]">
              {/* Location Icon  */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <select
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="border-none outline-none bg-transparent"
              >
                <option value="" disabled>
                  <span className="text-gray-500 text-[14px]"> Location </span>
                </option>
                {locations.map((city, index) => (
                  <option key={index} value={city}>
                    {' '}
                    {city}{' '}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Company or keyword tech company */}
            <div className="w-[70%] relative">
              <div className="w-full flex items-center border-[#e7e5e5] border py-2.5 pl-2.5 rounded-[6px] transition-all focus-within:border-[#334eac] focus-within:ring-1 focus-within:ring-[#334eac]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search Company or keyword, e.g., tech company"
                  className="ml-1.5 outline-none border-none focus:ring-0 w-full mr-4.75 bg-none autofill:shadow-[0_0_0_30px_white_inset]"
                  value={value}
                  onChange={e => {
                    const value = e.target.value;
                    setValue(value);
                    debouncedUpdate(value);
                  }}
                />
              </div>
              {/* Search Results */}
              {value.trim() && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  {isSearching ? (
                    <div className="flex items-center justify-center py-6">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#334eac] border-t-transparent" />
                    </div>
                  ) : results.length > 0 ? (
                    results.map((company: any) => (
                      <Link
                        key={company.id}
                        href={`/company/${company.id}`}
                        className="block px-4 py-3 hover:bg-gray-100 transition-colors border-b last:border-b-0"
                      >
                        <div className="font-medium text-gray-900">{company.name}</div>

                        {company.industry && (
                          <div className="text-sm text-gray-500">{company.industry}</div>
                        )}
                      </Link>
                    ))
                  ) : (
                    <div className="py-6 text-center text-sm text-gray-500">No results found</div>
                  )}
                </div>
              )}
            </div>

            {/* Filter select tag */}
            <div className="">
              <div className="w-fit flex items-center border-[#e7e5e5] border px-7.5 py-2.5 pl-2.5 rounded-[6px] transition-all focus-within:border-[#334eac] focus-within:ring-1 focus-within:ring-[#334eac]">
                <Image src={filterLogo} alt="Filter" className="size-6 h-4 w-4" />
                <select
                  value={filter}
                  onChange={e => {
                    setFilter(e.target.value);
                  }}
                  className="ml-2 outline-none border-none focus:ring-0 bg-none autofill:shadow-[0_0_0_30px_white_inset]"
                >
                  <option value="" disabled>
                    <span className="text-gray-500 text-[14px]"> Filter </span>
                  </option>
                  {filters.map((filter, index) => (
                    <option key={index} value={filter}>
                      {' '}
                      {filter}{' '}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search button div */}
            <div className="w-fit">
              <button className="bg-[#334eac] text-white py-2.5 px-4 rounded-[6px] hover:bg-[#2a3d8c] transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Most viewed companies */}
          <div>
            <div>
              <h2 className="text-[19px] font-normal sm:text-[18px] lg:text-[18px] mt-7.5 mb-5 text-black">
                {' '}
                Most Viewed{' '}
              </h2>
            </div>

            {/* Companies display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
              {companies.map((company, index) => (
                // Company card
                <CompanyCard key={index} companyId={company.id} />
              ))}
            </div>
          </div>

          {/* Highest Rated Company */}
          <div>
            <div>
              <h2 className="text-[19px] font-normal sm:text-[18px] lg:text-[18px] mt-7.5 mb-5 text-black">
                {' '}
                Highest Rated{' '}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
              {companies.map((company, index) => (
                // Company card
                <CompanyCard key={index} companyId={company.id} />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Adding the footer */}
      <Footer />
    </Fragment>
  );
};

// Exporting the search company component
export default SearchCompany;
