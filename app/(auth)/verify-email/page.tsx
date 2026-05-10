"use client";

import { Fragment, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import signinLogo from "@/images/signin/signinLogo.png";

const MASKED_EMAIL = "***@gmail.com";
const CODE_LENGTH = 4;

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [showModal, setShowModal] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    // Move focus forward
    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    const updated = [...otp];
    digits.split("").forEach((d, i) => { updated[i] = d; });
    setOtp(updated);
    inputRefs.current[Math.min(digits.length, CODE_LENGTH - 1)]?.focus();
  };

  const isComplete = otp.every((d) => d !== "");

  const handleSignIn = () => {
    if (!isComplete) return;
    setShowModal(true);
  };

  return (
    <Fragment>
      <main className="p-4 pt-2.5 flex justify-center min-h-svh">
        {/* Left section - hidden on mobile */}
        <section className="hidden lg:block lg:w-1/2 relative rounded-[7px] overflow-hidden self-stretch">
          <Image
            src={signinLogo}
            className="object-cover"
            alt="verifyEmailLogo"
            fill
          />
        </section>

        {/* Right section */}
        <section className="flex flex-col items-center justify-center w-full lg:w-1/2 px-6">
          <div className="w-full max-w-sm text-center">
            <h2 className="font-bold text-black text-2xl mb-2">Email Verification</h2>
            <p className="text-gray-500 text-[14px] leading-snug mb-8">
              We have sent your email verification code to{" "}
              <span className="font-medium text-black">{MASKED_EMAIL}</span>
              <br />
              Please input code to proceed
            </p>

            {/* OTP inputs */}
            <div className="flex justify-center gap-4 mb-8" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  aria-label={`Digit ${i + 1}`}
                  className="h-14 w-14 text-center text-xl font-semibold border border-[#e7e5e5] rounded-[6px] outline-none transition-all focus:border-[#334eac] focus:ring-1 focus:ring-[#334eac]"
                />
              ))}
            </div>

            {/* Submit */}
            <button
              onClick={handleSignIn}
              disabled={!isComplete}
              className="w-full bg-[#334EAC] hover:bg-[#24377d] disabled:opacity-50 disabled:cursor-not-allowed rounded-md text-white h-14 mb-4 transition-colors"
            >
              Sign In
            </button>

            {/* Resend */}
            <p className="text-[14px] text-gray-400">
              Didn&apos;t get the code?{" "}
              <button className="text-[#334EAC] font-semibold hover:underline">
                Resend Code
              </button>
            </p>

            {/* Footer */}
            <div className="text-center text-[15px] mt-10">
              <Link href="/terms" className="text-[#334EAC]">
                Terms of Service | Privacy Policy
              </Link>
              <div className="text-gray-400">&copy; 2026 Emplora. All rights reserved</div>
            </div>
          </div>
        </section>
      </main>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-2xl p-8 w-full max-w-sm text-center shadow-xl">
            {/* Green check icon */}
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h3 className="font-bold text-xl text-black mb-2">Congratulations!!!</h3>
            <p className="text-gray-500 text-[14px] mb-6">
              Congratulations... Your account has been created successfully!
            </p>

            <button
              onClick={() => router.push("/signin")}
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md h-12 font-medium transition-colors"
            >
              Proceed
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default VerifyEmail;
