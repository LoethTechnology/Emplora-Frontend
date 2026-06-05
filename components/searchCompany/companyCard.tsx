// Importing the necessary modules 
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from 'react';
import reviewsLogo from "@/images/searchCompany/reviewsLogo.png";
import companyLogo from "@/images/searchCompany/companyLogo.png";
import searchCompanyIcon from "@/images/searchCompany/searchCompanyIcon.png";

// Setting the interface for the company card component 
interface CompanyCardProps {
    companyId: string;
}

// Creating the company card component 
const CompanyCard = ({ companyId }: CompanyCardProps) => {
    // Rendering the jsx component 
    return (
        <Fragment>
            <div className="border-[#e7e5e5] border rounded-[6px] transition-all hover:border-[#334eac] hover:ring-1 hover:ring-[#334eac]">
                <div className="h-[90px] w-full rounded-t-[6px] overflow-hidden">
                    <Image src={companyLogo} alt="Company Logo" className="h-[90px] w-full object-cover" />
                </div>
                <div className="-mt-[30px] ml-[10px]">
                    <Image src={searchCompanyIcon} alt="Search Company Icon" className="h-[48px] w-[48px]" />
                </div>

                <div className="mx-[10px] mt-[20px]">
                    {/* Adding the company ratings and the reviews */}
                    <div>
                        {/* Ratings and Reviews */}
                        <div className="flex justify-between items-center align-middle gap-1 mb-[10px]">
                            <Image src={reviewsLogo} alt="Reviews Logo" className="h-[13px] w-[65px]" />
                            <span className="text-[13px]"> 120 Reviews </span>
                        </div>
                    </div>

                    {/* Adding the company name and industry type */}
                    <div>
                        <h3 className="text-[18px] font-bold text-black"> TechNova Solutions </h3>
                        <p className="text-[12px] text-gray-500"> Driving Innovation through Technology </p>

                        <div className="flex items-center gap-1 mt-[6px]">
                            {/* Location Icon  */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 h-[16px] w-[16px]">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            <span className="text-[12px]"> Garki, Abuja Nigeria &bull; 50 Employees</span>
                        </div>
                    </div>

                    {/* Adding the company profile button */}
                    <div className="mt-[20px] border-t-[1px] border-[#e7e5e5] pt-[10px] pb-[10px]">
                        <Link href={`/search-company/${companyId}`}>
                            <button className="text-[14px] bg-[#334eac] w-full text-white py-2.5 px-4 rounded-[6px] hover:bg-[#2a3d8c] transition-colors">
                                View Company Profile
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

// Exporting the company card component 
export default CompanyCard;