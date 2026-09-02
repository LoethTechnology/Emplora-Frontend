'use client';

import { Fragment, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { Button } from '@/components/ui/button';
import { CreatePostMutationHook } from '@/src/api/hooks/usePost';
import { CreateCompanyInput, createCompanySchema } from '@/src/schema/company.schema';
import axios from 'axios';

const INDUSTRY_OPTIONS = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Manufacturing',
  'Retail',
  'Agriculture',
  'Other',
] as const;

const COUNTRY_OPTIONS = [
  'Nigeria',
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
] as const;

const CreateCompany = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateCompanyInput>({
    resolver: zodResolver(createCompanySchema),
    mode: 'onBlur',
    defaultValues: {
      country: 'Nigeria',
      industry: 'Technology',
    },
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const successTimeoutRef = useRef<number | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const [logoError, setLogoError] = useState('');
  const [logoStatus, setLogoStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_LOGO_SIZE = 2 * 1024 * 1024; // 2MB
  const ACCEPTED_LOGO_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

  function validateLogoFile(file: File): string | null {
    if (!ACCEPTED_LOGO_TYPES.includes(file.type)) {
      return 'Logo must be a PNG, JPEG, or WEBP image.';
    }
    if (file.size > MAX_LOGO_SIZE) {
      return 'Logo must be smaller than 2MB.';
    }
    return null;
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateLogoFile(file);
    if (validationError) {
      setLogoError(validationError);
      setLogoFile(null);
      setLogoPreviewUrl(null);
      e.target.value = '';
      return;
    }

    setLogoError('');
    setLogoFile(file);
    setLogoPreviewUrl(URL.createObjectURL(file));
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreviewUrl(null);
    setLogoError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // clean up the object URL so it doesn't leak memory
  useEffect(() => {
    return () => {
      if (logoPreviewUrl) URL.revokeObjectURL(logoPreviewUrl);
    };
  }, [logoPreviewUrl]);

const router = useRouter();

const useCreateCompany = CreatePostMutationHook({
  endpoint: '/companies',
  requiresAuth: true,
});

const { mutateAsync: createCompany } = useCreateCompany();

  const onSubmit = async (data: CreateCompanyInput) => {
    setError('');

    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'string' && value.trim() !== '') {
          formData.append(key, value.trim());
        }
      });

      if (logoFile) {
        formData.append('logo', logoFile);
      }
      const response = await createCompany(formData as unknown as CreateCompanyInput);

reset();
removeLogo();
setError('');

const companyId = response?.data?.id;

if (companyId) {
  router.push(`/search-company/${companyId}`);
  return;
}

setSuccess('Company profile created successfully.');

      if (successTimeoutRef.current) {
        window.clearTimeout(successTimeoutRef.current);
      }

      successTimeoutRef.current = window.setTimeout(() => {
        setSuccess('');
        successTimeoutRef.current = null;
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status; // 401
        const errorMessage =
          statusCode === 401
            ? 'You need to be logged in to create a company.'
            : 'Something went wrong.';
        setError(errorMessage);
        console.error(error);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) window.clearTimeout(successTimeoutRef.current);
    };
  }, []);

  return (
    <Fragment>
      <Navbar />

      <main className="w-full bg-[#F8FAFF]">
        <section className="relative overflow-hidden bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#334EAC]">
                Company onboarding
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
                Create a new company profile
              </h1>
              <p className="mt-4 max-w-2xl text-base text-[#475569] sm:text-lg">
                Add the company details below so the Emplora community can discover, review, and
                rate its workplace experience.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[32px] bg-[#334EAC] px-8 py-10 text-white shadow-[0_25px_50px_-25px_rgba(51,78,172,0.35)] sm:px-10 sm:py-12">
              <div className="space-y-6">
                <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-white/10">
                  Ready for the next company?
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    Build a trusted company profile
                  </h2>
                  <p className="max-w-xl text-base leading-7 text-white/90">
                    The details you provide help job seekers and employees understand a
                    company&apos;s mission, culture, and operating footprint.
                  </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/10 p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-white/80">Brand</p>
                    <p className="mt-3 text-xl font-semibold">Emplora Trusted</p>
                  </div>
                  <div className="rounded-3xl bg-white/10 p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-white/80">Fast setup</p>
                    <p className="mt-3 text-xl font-semibold">Less than 5 minutes</p>
                  </div>
                </div>
                <div className="rounded-3xl bg-white/10 p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/70">
                    Company example
                  </p>
                  <div className="mt-4 space-y-3 text-sm text-white/85">
                    <p>
                      <span className="font-semibold">Name:</span> Acme Inc.
                    </p>
                    <p>
                      <span className="font-semibold">Industry:</span> Technology
                    </p>
                    <p>
                      <span className="font-semibold">HQ:</span> Lagos, Nigeria
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] bg-white p-6 shadow-[0_25px_50px_-25px_rgba(15,23,42,0.15)] sm:p-10">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0F172A]">Company details</h2>
                <p className="mt-2 text-sm text-[#64748B]">
                  Fill every field to create a strong company profile for review and discovery.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-[#0F172A]">
                    Company name
                    <input
                      type="text"
                      {...register('name')}
                      className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFF] px-4 py-3 text-sm text-[#0F172A] outline-none transition focus:border-[#334EAC] focus:ring-2 focus:ring-[#334EAC]/15"
                      placeholder="Acme Inc."
                    />
                    {errors.name && <p className="text-xs text-[#DC2626]">{errors.name.message}</p>}
                  </label>

                  <label className="space-y-2 text-sm font-medium text-[#0F172A]">
                    Industry
                    <select
                      {...register('industry')}
                      className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFF] px-4 py-3 text-sm text-[#0F172A] outline-none transition focus:border-[#334EAC] focus:ring-2 focus:ring-[#334EAC]/15"
                    >
                      {INDUSTRY_OPTIONS.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.industry && (
                      <p className="text-xs text-[#DC2626]">{errors.industry.message}</p>
                    )}
                  </label>
                </div>

                <label className="space-y-2 text-sm font-medium text-[#0F172A] block">
                  Description
                  <textarea
                    {...register('description')}
                    rows={4}
                    className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFF] px-4 py-3 text-sm text-[#0F172A] outline-none transition focus:border-[#334EAC] focus:ring-2 focus:ring-[#334EAC]/15 resize-none"
                    placeholder="Describe the company in a few sentences"
                  />
                  {errors.description && (
                    <p className="text-xs text-[#DC2626]">{errors.description.message}</p>
                  )}
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-[#0F172A]">
                    Website URL
                    <input
                      type="url"
                      {...register('website_url')}
                      className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFF] px-4 py-3 text-sm text-[#0F172A] outline-none transition focus:border-[#334EAC] focus:ring-2 focus:ring-[#334EAC]/15"
                      placeholder="https://acme.com"
                    />
                    {errors.website_url && (
                      <p className="text-xs text-[#DC2626]">{errors.website_url.message}</p>
                    )}
                  </label>

                  <label className="space-y-2 text-sm font-medium text-[#0F172A]">
                    LinkedIn URL <span className="font-normal text-[#94A3B8]">(optional)</span>
                    <input
                      type="url"
                      {...register('linkedin_url')}
                      className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFF] px-4 py-3 text-sm text-[#0F172A] outline-none transition focus:border-[#334EAC] focus:ring-2 focus:ring-[#334EAC]/15"
                      placeholder="https://linkedin.com/company/acme"
                    />
                    {errors.linkedin_url && (
                      <p className="text-xs text-[#DC2626]">{errors.linkedin_url.message}</p>
                    )}
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-[#0F172A]">
                    Address
                    <input
                      type="text"
                      {...register('address')}
                      className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFF] px-4 py-3 text-sm text-[#0F172A] outline-none transition focus:border-[#334EAC] focus:ring-2 focus:ring-[#334EAC]/15"
                      placeholder="Plot 1, Lekki Phase 1"
                    />
                    {errors.address && (
                      <p className="text-xs text-[#DC2626]">{errors.address.message}</p>
                    )}
                  </label>

                  <label className="space-y-2 text-sm font-medium text-[#0F172A]">
                    Country
                    <select
                      {...register('country')}
                      className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFF] px-4 py-3 text-sm text-[#0F172A] outline-none transition focus:border-[#334EAC] focus:ring-2 focus:ring-[#334EAC]/15"
                    >
                      {COUNTRY_OPTIONS.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="text-xs text-[#DC2626]">{errors.country.message}</p>
                    )}
                  </label>
                </div>

                <div className="space-y-2 text-sm font-medium text-[#0F172A]">
                  Logo <span className="font-normal text-[#94A3B8]">(optional)</span>
                  {logoPreviewUrl ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFF] px-3">
                      <div className="flex gap-3 items-center p-3 justify-between w-full">
                        <div className="flex gap-2 items-center">
                          <p className="truncate text-sm text-[#0F172A]">{logoFile?.name}</p>
                          <p className="text-xs text-[#64748B]">
                            {logoFile && (logoFile.size / 1024).toFixed(0)} KB
                          </p>
                        </div>
                        {logoStatus === 'uploading' && (
                          <p className="text-xs text-[#334EAC]">Uploading…</p>
                        )}
                        {logoStatus === 'success' && (
                          <p className="text-xs text-[#059669]">Uploaded</p>
                        )}
                        {logoStatus === 'error' && (
                          <p className="text-xs text-[#DC2626]">Upload failed</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="text-xs font-medium text-[#DC2626] hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleLogoChange}
                      className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFF] px-4 py-3 text-sm text-[#0F172A] outline-none transition focus:border-[#334EAC] focus:ring-2 focus:ring-[#334EAC]/15"
                    />
                  )}
                  {logoError && <p className="text-xs text-[#DC2626]">{logoError}</p>}
                </div>

                {success ? (
                  <p
                    role="status"
                    className="rounded-2xl border border-[#D1FAE5] bg-[#ECFDF5] px-4 py-3 text-sm text-[#059669]"
                  >
                    {success}
                  </p>
                ) : null}

                {error ? (
                  <p
                    role="alert"
                    className="rounded-2xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#DC2626]"
                  >
                    {error}
                  </p>
                ) : null}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-[#64748B]">
                      All fields are required to complete the company profile.
                    </p>
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? 'Submitting...' : 'Create Company'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </Fragment>
  );
};

export default CreateCompany;
