"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import forgotImage from "../../../images/forgot-password/image.jpg";
import ResetPasswordForm from "@/components/resetPassword/ResetPasswordForm";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 1500));

    setIsLoading(false);
    setStep("otp");
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 1500));

    setIsLoading(false);
    setStep("reset");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, "$1••••••••$3");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full flex rounded-xl overflow-hidden">
        {/* LEFT */}
        <div className="hidden md:block relative shrink-0 rounded-xl overflow-hidden w-[50%] h-[95vh]">
          <Image
            src={forgotImage}
            alt="Forgot password visual"
            fill
            className="h-full"
            priority
          />
          <div className="absolute inset-0 bg-[#263B81]/30 rounded-xl" />
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex flex-col justify-between px-10 py-12 ">
          <div />

          <div className="w-full max-w-85 mx-auto">
            {/* EMAIL STEP */}
            {step === "email" && (
              <>
                <h1 className="text-center text-[1.15rem] font-semibold text-gray-800 mb-1">
                  Forgot Password 🔒
                </h1>
                <p className="text-center text-sm text-gray-500 mb-6">
                  Kindly enter the email address you registered with
                </p>

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#3b4fd8] text-white py-2.5 rounded"
                  >
                    {isLoading ? "Sending…" : "Continue"}
                  </button>
                </form>
              </>
            )}

            {/* OTP STEP */}
            {step === "otp" && (
              <>
                <h1 className="text-center text-[1.15rem] font-semibold text-gray-800 mb-1">
                  Enter OTP
                </h1>

                <p className="text-center text-sm text-gray-500 mb-6">
                  Code sent to{" "}
                  <span className="font-medium">{maskedEmail}</span>
                </p>

                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div className="flex justify-center gap-3">
                    {otp.map((digit, index) => (
                      <input
                        title="otp"
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-12 h-12 text-center border rounded"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || otp.some((d) => d === "")}
                    className="w-full bg-[#3b4fd8] text-white py-2.5 rounded"
                  >
                    {isLoading ? "Verifying…" : "Verify"}
                  </button>
                </form>
              </>
            )}

            {/* RESET STEP  */}
            {step === "reset" && (
              <ResetPasswordForm
                onSuccess={() => {
                  console.log("Password reset successful");
                  // router.push("/auth/login") later
                }}
              />
            )}
          </div>

          {/* FOOTER */}
          <div className="text-center mt-10">
            <p className="text-xs text-gray-400 space-x-1">
              <Link href="/terms" className="text-[#3b4fd8] hover:underline">
                Terms of Service
              </Link>
              <span>|</span>
              <Link href="/privacy" className="text-[#3b4fd8] hover:underline">
                Privacy Policy
              </Link>
            </p>

            <p className="text-xs text-gray-400 mt-1">
              © 2026 Emplora. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
