// Importing the necessary modules 
import Image from "next/image";
import upArrow from "@/images/home/upArrow.png"
import downArrow from "@/images/home/downArrow.png"; 
import { Fragment, useState } from "react";

// Define an interface for the props 
interface FaqProps {
    faqActiveMenu: string; 
    faqData: Record<string, string>; 
}

const FaqLoader = ({ faqActiveMenu, faqData }: FaqProps) => {
    // track the index of the currently open question. null means all are closed.
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Safety check
    if (!faqData) return null;

    const faqKeys = Object.keys(faqData); 

    // Function to handle the click
    const handleToggle = (index: number) => {
        // If the clicked one is already open, close it (null). Otherwise, open the new one.
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <Fragment> 
            {faqKeys.map((question, index) => {
              const isOpen = activeIndex === index;

              return (
                <div 
                    key={index} 
                    className="bg-[#f7f7f7] p-5 rounded-[6px] mt-[10px] border border-solid border-[#49506936] cursor-pointer transition-all hover:bg-[#fdfdfd]"
                    onClick={() => handleToggle(index)}
                > 
                    {/* Header Row */}
                    <div className="flex justify-between items-center text-[black]">
                        <h2 className="text-[15px] md:text-[16px]"> {question} </h2> 
                        {/* Visual indicator (plus/minus) */}
                        <span className="text-xl">
                            {isOpen ? <Image src={downArrow} alt="downArrow" /> : <Image src={upArrow} alt="upArrow" /> }
                        </span>
                    </div>

                    {/* Content Area - Only shows when isOpen is true */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-[500px] mt-4 opacity-100" : "max-h-0 opacity-0"
                    }`}> 
                        <p className="text-gray-600 leading-relaxed border-t border-[#4950691a] pt-3"> 
                            { faqData[question] } 
                        </p>
                    </div>
                </div>
              )
            })}
        </Fragment>
    );
};

export default FaqLoader;