'use client';

import { Fragment, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import signinLogo from '@/images/signin/signinLogo.png';
import { CreatePostMutationHook } from '@/src/api/hooks/usePost';
import { useUserStore } from '@/store/user.store';

const passwordRequirements = [
  { label: 'At least 8 characters', regex: /.{8,}/ },
  { label: 'At least 1 uppercase letter (A-Z)', regex: /[A-Z]/ },
  { label: 'At least 1 lowercase letter (a-z)', regex: /[a-z]/ },
  { label: 'At least 1 number (0-9)', regex: /[0-9]/ },
  {
    label: 'At least 1 special character (e.g. ! @ # $ % ^ & * )',
    regex: /[!@#$%^&*]/,
  },
];

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreementsAccepted, setAgreementsAccepted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const setUser = useUserStore(state => state.setUser);

  const useRegisterUser = CreatePostMutationHook({
    endpoint: '/user',
    requiresAuth: false,
  });

  const { mutateAsync: createAccount, isPending: isSubmitting } = useRegisterUser();

  const handleRegister = async () => {
    setFormError(null);

    if (!email.trim() || !firstName.trim() || !lastName.trim() || !password || !confirmPassword) {
      setFormError('Please complete all fields before continuing.');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    if (!agreementsAccepted) {
      setFormError('Please accept the Terms of Service and Privacy Policy.');
      return;
    }

    const form = {
      email: email.trim(),
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      linkedin_profile_url: linkedinUrl.trim(),
      password,
    };

    try {
      const response = await createAccount(form);
      const payload = response?.data ?? response;
      const user = payload?.data ?? payload;

      if (user) {
        setUser(user);
      }

      router.push('/');
    } catch (error) {
      setFormError('Registration failed. Please try again.');
    }
  };

  return (
    <Fragment>
      <main className="p-4 pt-2.5 flex justify-center min-h-svh">
        {/* Left section - hidden on mobile */}
        <section className="hidden lg:block lg:w-1/2 relative rounded-[7px] overflow-hidden self-stretch">
          <Image src={signinLogo} className="object-cover" alt="registerLogo" fill />
        </section>

        {/* Right section */}
        <section className="place-items-center flex flex-col h-full w-full lg:w-1/2 overflow-y-auto">
          <div className="flex flex-col justify-center w-full px-6 py-8 max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-[20px]">
              <h2 className="font-bold text-black text-2xl">Create an account</h2>
              <p className="mt-[4px]">Kindly enter the correct details to create your account.</p>
            </div>

            {/* Email */}
            <div className="mb-[15px]">
              <label className="font-medium">Email Address</label>
              <div className="flex items-center border-[#e7e5e5] border py-2.5 pl-[10px] rounded-[6px] mt-1 transition-all focus-within:border-[#334eac] focus-within:ring-1 focus-within:ring-[#334eac]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4 shrink-0"
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
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="ml-1.5 outline-none border-none focus:ring-0 w-full mr-4 bg-white autofill:shadow-[0_0_0_30px_white_inset]"
                />
              </div>
            </div>

            {/* First Name */}
            <div className="mb-[15px]">
              <label className="font-medium">First Name</label>
              <div className="flex items-center border-[#e7e5e5] border py-2.5 pl-[10px] rounded-[6px] mt-1 transition-all focus-within:border-[#334eac] focus-within:ring-1 focus-within:ring-[#334eac]">
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="ml-1.5 outline-none border-none focus:ring-0 w-full bg-white"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="mb-[15px]">
              <label className="font-medium">Last Name</label>
              <div className="flex items-center border-[#e7e5e5] border py-2.5 pl-[10px] rounded-[6px] mt-1 transition-all focus-within:border-[#334eac] focus-within:ring-1 focus-within:ring-[#334eac]">
                <input
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="ml-1.5 outline-none border-none focus:ring-0 w-full bg-white"
                />
              </div>
            </div>

            {/* LinkedIn URL */}
            <div className="mb-[15px]">
              <label className="font-medium">LinkedIn URL</label>
              <div className="flex items-center border-[#e7e5e5] border py-2.5 pl-[10px] rounded-[6px] mt-1 transition-all focus-within:border-[#334eac] focus-within:ring-1 focus-within:ring-[#334eac]">
                <input
                  type="url"
                  placeholder="Enter your LinkedIn profile URL"
                  value={linkedinUrl}
                  onChange={e => setLinkedinUrl(e.target.value)}
                  className="ml-1.5 outline-none border-none focus:ring-0 w-full bg-white"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-[10px]">
              <label className="font-medium">Password</label>
              <div className="flex items-center justify-between border-[#e7e5e5] border py-[10px] pl-[10px] pr-[10px] rounded-[6px] mt-1 transition-all focus-within:border-[#334eac] focus-within:ring-1 focus-within:ring-[#334eac]">
                <div className="flex items-center w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 shrink-0"
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
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your new password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="ml-1.5 w-full outline-none border-none focus:ring-0"
                    autoComplete="new-password"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 shrink-0"
                >
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
                </button>
              </div>

              {/* Password requirements */}
              <ul className="mt-2 ml-1 space-y-0.5">
                {passwordRequirements.map(req => (
                  <li
                    key={req.label}
                    className={`flex items-center gap-1.5 text-[13px] ${
                      req.regex.test(password) ? 'text-green-500' : 'text-gray-500'
                    }`}
                  >
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full shrink-0 ${
                        req.regex.test(password) ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                    {req.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Confirm Password */}
            <div className="mb-[15px] mt-2">
              <label className="font-medium">Confirm Password</label>
              <div className="flex items-center justify-between border-[#e7e5e5] border py-[10px] pl-[10px] pr-[10px] rounded-[6px] mt-1 transition-all focus-within:border-[#334eac] focus-within:ring-1 focus-within:ring-[#334eac]">
                <div className="flex items-center w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 shrink-0"
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
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="ml-1.5 w-full outline-none border-none focus:ring-0"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="ml-2 shrink-0"
                >
                  {showConfirmPassword ? (
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
                </button>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-center gap-x-2 mb-5">
              <input
                type="checkbox"
                checked={agreementsAccepted}
                onChange={e => setAgreementsAccepted(e.target.checked)}
                aria-label="I agree to the Terms of Service and Privacy Policy"
                className="accent-blue-600 h-4 w-4 shrink-0"
              />
              <label className="text-[14px]">
                I agree to the{' '}
                <Link href="/terms" className="text-[#334EAC]">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-[#334EAC]">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {formError && <div className="text-red-500 text-sm mb-4">{formError}</div>}

            {/* Submit button */}
            <div className="mb-5 w-full">
              <button
                type="button"
                onClick={handleRegister}
                disabled={isSubmitting}
                className="w-full bg-[#334EAC] hover:bg-[#24377d] rounded-md text-white h-14 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating account...' : 'Create an Account'}
              </button>
            </div>

            {/* Sign in link */}
            <div className="text-center text-[15px] text-[#9e9d9d]">
              <p>
                Already have an account?{' '}
                <Link href="/signin" className="text-[#334EAC]">
                  Sign In
                </Link>
              </p>
            </div>

            {/* Footer */}
            <div className="text-center text-[15px] mt-6">
              <Link href="/terms" className="text-[#334EAC]">
                Terms of Service | Privacy Policy
              </Link>
              <div className="text-gray-400">&copy; 2026 Emplora. All rights reserved</div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default Register;
