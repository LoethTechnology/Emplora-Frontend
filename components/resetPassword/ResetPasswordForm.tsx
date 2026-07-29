'use client';

import { useState } from 'react';
import { AxiosError } from 'axios';
import { CreatePostMutationHook } from '@/src/api/hooks/usePost';
import type { ResetPasswordPayload } from '@/types/auth.types';

interface Props {
  email: string;
  otp: string;
  onSuccess: () => void;
}

interface PasswordRules {
  minLength: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

export default function ResetPasswordForm({ email, otp, onSuccess }: Props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const useResetPassword = CreatePostMutationHook<ResetPasswordPayload>({
    endpoint: '/auth/reset-password',
    requiresAuth: false,
  });

  const { mutateAsync: resetPassword, isPending: isLoading } = useResetPassword();

  const rules: PasswordRules = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[@!#$%^&*]/.test(password),
  };

  const allRulesMet = Object.values(rules).every(Boolean);
  const passwordsMatch = password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setErrorMessage(null);

    if (!allRulesMet || !passwordsMatch) return;

    try {
      await resetPassword({
        email,
        otp,
        newPassword: password,
      });
      onSuccess();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setErrorMessage(
          error?.response?.data?.message || 'Unable to reset password. Please try again.'
        );
      } else {
        setErrorMessage('Unable to reset password. Please try again.');
      }
    }
  };

  const ruleItems = [
    { label: 'At least 8 characters', met: rules.minLength },
    { label: 'At least 1 uppercase letter (A–Z)', met: rules.uppercase },
    { label: 'At least 1 lowercase letter (a–z)', met: rules.lowercase },
    { label: 'At least 1 number (0–9)', met: rules.number },
    { label: 'At least 1 special character (e.g. ! @ # $ % ^ & *)', met: rules.special },
  ];

  return (
    <>
      <h1 className="text-center text-[1.15rem] font-semibold text-gray-800 mb-1">
        Forgot Password 🔒
      </h1>
      <p className="text-center text-sm text-gray-500 mb-6">
        Kindly enter the email address you registered with
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Password field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
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
            </span>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your new password"
              className="w-full border border-gray-300 rounded pl-9 pr-9 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
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

          {/* Password rules */}
          {password && (
            <ul className="mt-2 space-y-1">
              <p
                className={`text-xs font-medium ${allRulesMet ? 'text-green-500' : 'text-red-500'}`}
              >
                Your password must contain:
              </p>
              {ruleItems.map(rule => (
                <li
                  key={rule.label}
                  className={`text-xs flex items-center gap-1 ${rule.met ? 'text-green-500' : 'text-red-500'}`}
                >
                  · {rule.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Confirm Password field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
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
            </span>
            <input
              id="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className={`w-full border rounded pl-9 pr-9 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition ${
                touched && !passwordsMatch
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? (
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
          {touched && !passwordsMatch && (
            <p className="text-xs text-red-500 mt-1">Password must match</p>
          )}
        </div>

        {errorMessage ? <p className="text-sm text-red-500">{errorMessage}</p> : null}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#3b4fd8] hover:bg-[#3344c2] active:bg-[#2a37a8] disabled:opacity-60 text-white font-medium py-2.5 rounded text-sm transition-colors duration-150"
        >
          {isLoading ? 'Saving…' : 'Sign In'}
        </button>
      </form>
    </>
  );
}
