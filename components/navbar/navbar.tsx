"use client";

// Importing the necessary modules
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import RegisterBtn from "@/components/buttons/registerBtn";
import SignInBtn from "@/components/buttons/signInBtn";

// Creating the navbar component
const Navbar = ({ variant = "default" }) => {
  // Setting the states
  const [isOpen, setIsOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
   let lastScrollTop = 0;
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll === 0) {
        // if statement to check if we are at the top of the page or not.
        setAtTop(true);
      } else {
        setAtTop(false);
        if (currentScroll > lastScrollTop) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // this line determines if the scroll is going up or down
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Creating a function to handle the menu
  const toggleMenu = () => setIsOpen(!isOpen);
  const headerIsvisible = !isVisible ? "top-[-200px]" : "top-0";

  // Rendering the navbar component
  return (
    <Fragment>
      <nav
        className={`w-full z-50 transition-all duration-300 
  ${
    variant === "overlay"
      ? "top-0 bg-white border-none text-white sticky"
      : "top-0 bg-white border-none text-black sticky"
  } ${!atTop && variant !== "overlay" ? `bg-white/60 backdrop-blur-xs shadow-md ${headerIsvisible}` : ""}`}
      >
        <div className="mx-auto px-6 py-4 flex items-center justify-between">
          {/* 1. Logo Section */}
          <div className="shrink-0">
            <Link
              href="/"
              className={`text-[24px] md:text-[30px] ${
                variant === "overlay" ? "text-white" : "text-[#000000bd]"
              }`}
            >
              Emplora
            </Link>
          </div>

          {/* 2. Desktop Links (Now hidden only if screen is 604px or less) */}
          <div className="hidden min-[854px]:flex items-center justify-center gap-8 flex-1">
            <Link
              href="/"
              className={`transition-colors ${
                variant === "overlay"
                  ? "text-white hover:text-blue-200"
                  : "text-black hover:text-[#334EAC]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`transition-colors ${
                variant === "overlay"
                  ? "text-white hover:text-blue-200"
                  : "text-black hover:text-[#334EAC]"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/companyReviews"
              className={`transition-colors ${
                variant === "overlay"
                  ? "text-white hover:text-blue-200"
                  : "text-black hover:text-[#334EAC]"
              }`}
            >
              Search Company
            </Link>
            <Link
              href="/contact"
              className={`transition-colors ${
                variant === "overlay"
                  ? "text-white hover:text-blue-200"
                  : "text-black hover:text-[#334EAC]"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* 3. Desktop Buttons (Now hidden only if screen is 604px or less) */}
          <div className="hidden min-[854px]:flex items-center gap-3">
            <div>
              <RegisterBtn />
            </div>
            <div className="ml-1.5">
              <SignInBtn />
            </div>
          </div>

          {/* 4. Mobile Menu Toggle (Visible ONLY at 604px and below) */}
          <div className="min-[845px]:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 text-[#334EAC] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {/* Standard Hamburger SVG Icon */}
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* --- MOBILE SIDEBAR DRAWER --- */}
        {/* Overlay background (Only active on mobile screens) */}
        <div
          className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 min-[605px]:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
          onClick={toggleMenu}
        />

        {/* The Actual Drawer (Only active on mobile screens) */}
        <div
          className={`fixed top-0 left-0 h-screen w-[65%] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out min-[854px]:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-10">
              <span className="text-2xl text-[#334EAC]">Emplora</span>
              <button onClick={toggleMenu} className="text-3xl text-gray-500">
                &times;
              </button>
            </div>

            <nav className="flex flex-col gap-6 text-lg font-medium text-gray-700">
              <Link
                href="/"
                onClick={toggleMenu}
                className="hover:text-[#334EAC]"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={toggleMenu}
                className="hover:text-[#334EAC]"
              >
                About Us
              </Link>
              <Link
                href="/companyReviews"
                onClick={toggleMenu}
                className="hover:text-[#334EAC]"
              >
                Search Company
              </Link>
              <Link
                href="/contact"
                onClick={toggleMenu}
                className="hover:text-[#334EAC]"
              >
                Contact Us
              </Link>
            </nav>

            <div className="mt-auto pb-10 flex flex-col gap-4 text-lg font-medium text-gray-700">
              {/* Creating the link url button for signIn */}
              <div>
                <Link href="/signin" className="hover:text-[#334EAC]">
                  Sign In
                </Link>
              </div>
              {/* Adding the register button */}
              <div>
                {/* Creating the link url button for register */}
                <Link href="/register">Register</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

// Exporting the Navbar
export default Navbar;
