// Importing the necessary modules 
import { Fragment } from 'react'; 
import Image from 'next/image';
import starLogo from "@/images/home/star-logo.png";
import companyLogo from "@/images/home/review-company-logo.png"

// Creating the reviews component 
const Reviews = () => {
  return (
    <Fragment> 
        <section className="w-[300px] min-h-[185px] p-5 border border-gray-200 rounded-lg bg-white">
            <div className="flex justify-between"> 
                <div> 
                    <Image src={starLogo} alt="Star Logo" /> 
                </div>
                <div> 
                    <p> 02-03-2026 </p>
                </div>
            </div>
            <div className="flex justify-start mb-2.5 mt-2"> 
                <div> 
                    <Image src={companyLogo} alt="Company Logo" /> 
                </div>
                <div className="ml-2"> 
                    <p> TechNova Solutions </p>
                </div>
            </div>
            <div> 
                <p className="text-[13px]"> Working at TechNova Solutions has been great for my growth. The team is collaborative, and management is open 
                    and supportive. Overall, a solid place to build your skills. 
                </p>
            </div>
        </section>
    </Fragment>
   
  )
}

// Exporting the reviews component
export default Reviews