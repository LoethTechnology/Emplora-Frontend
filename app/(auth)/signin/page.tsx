// Using client
"use client";

// Importing the necessary modules
import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import emailLogo from "@/images/signin/emailLogo.png";
import signinLogo from "@/images/signin/signinLogo.png";
import passwordLogo from "@/images/signin/passwordLogo.png";
import seePasswordLogo from "@/images/signin/seePasswordLogo.png";

// Creating the login component
const Signin = () => {
  // Setting some necessary state
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Rendering the component
  return (
    <Fragment>
      {/* Adding the main div */}
      <main className="p-4 pt-2.5 flex justify-center">
        {/* Adding the left section - Hidden on mobile, block on large screens */}
        <section className="hidden lg:block lg:w-1/2 h-[97vh]">
          <Image
            src={signinLogo}
            className="h-full w-full rounded-[7px]"
            alt="signLogo"
          />
        </section>

        {/* Adding the right section */}
        <section className="place-items-center flex flex-col h-[95vh] w-full lg:w-1/2">
          <div className="flex flex-col justify-center h-full px-6 pt-30">
            <div className="text-center mb-[20px]">
              <h2 className="font-bold text-black text-2xl">
                {" "}
                Welcome Back 👋{" "}
              </h2>
              <p className="mt-[4px]">
                {" "}
                Kindly enter the correct details to sign in to your
                account.{" "}
              </p>
            </div>

            {/* Email div */}
            <div className="mb-[15px]">
              <label className="font-black font-medium"> Email Address </label>
              {/* Email Input Form */}
              <div className="flex items-center border-[#e7e5e5] border py-2.5 pl-[10px] rounded-[6px] transition-all focus-within:border-[#334eac] focus-within:ring-1 focus-within:ring-[#334eac]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="ml-1.5 outline-none border-none focus:ring-0 w-full mr-4.75 bg-white autofill:shadow-[0_0_0_30px_white_inset]"
                />
              </div>
            </div>

            {/* Password Div */}
            <div>
              <label className="font-black font-medium"> Password </label>
              {/* Password Input Form Added focus-within:border-blue-400 and focus-within:ring-1 */}
              <div className="flex items-center justify-between w-full border-[#e7e5e5] border py-[10px] pl-[10px] rounded-[6px] pr-[10px] transition-all focus-within:border-[#334eac] focus-within:ring-1 focus-within:ring-[#334eac]">
                <div className="flex items-center w-full mr-[19px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="ml-1.5 w-full outline-none border-none focus:ring-0"
                  />
                </div>
                <div onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-2">
              <Link
                href="/forgot-password"
                className="text-[13px] text-[#334EAC] font-bold float-right"
              >
                Forgot password
              </Link>
            </div>

            <div className="items-left flex items-center gap-x-0.5 mt-[35px]">
              <input type="checkbox" className="accent-blue-600 h-4 w-4" />
              <div className="ml-[4px]">
                <label className="text-[15px]"> Remember me </label>
              </div>
            </div>

            <div className="my-5 w-full">
              <button className="w-full bg-[#334EAC] hover:bg-[#24377d] rounded-md text-white h-14">
                Sign In
              </button>
            </div>

            <div className="text-center text-[15px] text-[#9e9d9d]">
              <p>
                {" "}
                Don't have an account?{" "}
                <Link href="/register" className="text-[#334EAC]">
                  {" "}
                  Create an account{" "}
                </Link>{" "}
              </p>
            </div>

            <div className="text-center text-[15px] mt-auto pb-4">
              <Link href="/terms" className="text-[#334EAC]">
                Terms of Service | Privacy Policy
              </Link>
              <div className="text-gray-400">
                &copy; Emplora. All rights reserved
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
};

// Exporting the login page
export default Signin;
