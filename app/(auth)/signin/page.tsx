// Importing the necessary modules 
import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import emailLogo from "@/images/signin/emailLogo.png";
import signinLogo from "@/images/signin/signinLogo.png";
import passwordLogo from "@/images/signin/passwordLogo.png";
import seePasswordLogo from "@/images/signin/seePasswordLogo.png";

// Creating the login component
const Signin = () => {
    // Rendering the component 
    return (
        <Fragment>
            {/* Adding the main div */}
            <main className="p-4 pt-2.5 flex justify-center">
                {/* Adding the left section - Hidden on mobile, block on large screens */}
                <section className="hidden lg:block lg:w-1/2 h-[97vh]">
                    <Image src={signinLogo} className="h-full w-full object-cover rounded-[7px]" alt="signLogo" />
                </section>

                {/* Adding the right section */}
                <section className="place-items-center flex flex-col h-[95vh] w-full lg:w-1/2">
                    <div className="flex flex-col justify-center h-full px-6 pt-30">
                        {/* Header div */}
                        <div className="text-center mb-[20px]">
                            <h2 className="font-bold text-black text-2xl"> Welcome Back 👋 </h2>
                            <p className="mt-[4px]"> Kindly enter the correct details to sign in to your account. </p>
                        </div>

                        {/* Email div */}
                        <div className="mb-[15px]">
                            <label className="font-black font-medium"> Email Address </label>
                            <div className='flex place-items-center border-[#e7e5e5] border py-2.5 pl-[10px] rounded-[6px]'>
                                <Image
                                    src={emailLogo}
                                    alt="emailLogo"
                                    className="h-[15px]"
                                />
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="ml-1.5 outline-none border-none focus:ring-0 w-full mr-4.75 bg-white autofill:shadow-[0_0_0_30px_white_inset] autofill:text-fill-current"
                                />
                            </div>

                        </div>

                        {/* Password Div */}
                        <div>
                            <label className='font-black font-medium'> Password </label>
                            <div className='flex place-items-center justify-between w-full border-[#e7e5e5] border-1 py-[10px] pl-[10px] rounded-[6px] pr-[10px] '>
                                <div className="flex place-items-center w-full mr-[19px]">
                                    <Image
                                        src={passwordLogo}
                                        alt="passwordLogo"
                                        className="h-[15px]"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Enter password"
                                        className='ml-1.5 w-full outline-none border-none outline-none border-none focus:ring-0'
                                    />
                                </div>
                                <div>
                                    <Image
                                        src={seePasswordLogo}
                                        alt="seePasswordLogo"
                                        className="h-[15p]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Forgot Password div */}
                        <div className="">
                            <Link
                                href="/forgotPassword"
                                className="text-[13px] text-[#334EAC] font-bold float-right"
                            > Forgot password </Link>
                        </div>

                        {/* Remeber me div */}
                        <div className='items-left flex place-items-center gap-x-0.5 mt-[35px]'>
                            <div>
                                <input type="checkbox" className="accent-blue-600 h-4 w-4" />
                            </div>
                            <div>
                                <label className='text-[15px]'> Remember me </label>
                            </div>
                        </div>

                        {/* Sign In Button Div */}
                        <div className="my-5 w-full">
                            <button
                                className="w-full bg-[#334EAC] hover:bg-[#24377d] rounded-md text-white h-14"
                            >
                                Sign In
                            </button>
                        </div>

                        {/* Create an account div */}
                        <div className='text-center text-[15px] text-[#9e9d9d]'>
                            <p> Don't have an account? <Link href="/register" className="text-[#334EAC]"> Create an account </Link> </p>
                        </div>

                        {/* Terms of Service | Privacy Policy */}
                        <div className='text-center text-[15px] mt-auto pb-4'>
                            <div>
                                <Link href="/terms" className='text-[#334EAC]'>
                                    Terms of Service | Privacy Policy
                                </Link>
                            </div>
                            <div>
                                &copy; Emplora. All rights reserved
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </Fragment>
    )
}

// Exporting the login page 
export default Signin; 