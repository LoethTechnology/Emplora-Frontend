'use client';

import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { Button } from '@/components/ui/button';
import { CreatePostMutationHook } from '@/src/api/hooks/usePost';
import { CreateCompanyInput, createCompanySchema } from '@/src/schema/company.schema';

const CreateCompany = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateCompanyInput>({
    resolver: zodResolver(createCompanySchema),
    mode: 'onBlur',
  });

  const useCreateCompany = CreatePostMutationHook({
    endpoint: '/companies',
    requiresAuth: true,
  });
  const { mutateAsync: createCompany } = useCreateCompany();

  const onSubmit = async (data: CreateCompanyInput) => {
    try {
      console.log('Create company payload:', data);
      await createCompany(data);
      reset();
      alert('Company profile created successfully.');
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    }
  };

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
                    <input
                      type="text"
                      {...register('industry')}
                      className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFF] px-4 py-3 text-sm text-[#0F172A] outline-none transition focus:border-[#334EAC] focus:ring-2 focus:ring-[#334EAC]/15"
                      placeholder="Technology"
                    />
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
                    Domain
                    <input
                      type="text"
                      {...register('domain')}
                      className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFF] px-4 py-3 text-sm text-[#0F172A] outline-none transition focus:border-[#334EAC] focus:ring-2 focus:ring-[#334EAC]/15"
                      placeholder="acme.com"
                    />
                    {errors.domain && (
                      <p className="text-xs text-[#DC2626]">{errors.domain.message}</p>
                    )}
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-[#0F172A]">
                    LinkedIn URL
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

                  <label className="space-y-2 text-sm font-medium text-[#0F172A]">
                    Logo URL
                    <input
                      type="url"
                      {...register('logo_url')}
                      className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFF] px-4 py-3 text-sm text-[#0F172A] outline-none transition focus:border-[#334EAC] focus:ring-2 focus:ring-[#334EAC]/15"
                      placeholder="https://acme.com/logo.png"
                    />
                    {errors.logo_url && (
                      <p className="text-xs text-[#DC2626]">{errors.logo_url.message}</p>
                    )}
                  </label>
                </div>

                <label className="space-y-2 text-sm font-medium text-[#0F172A] block">
                  Headquarters
                  <input
                    type="text"
                    {...register('headquarters')}
                    className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFF] px-4 py-3 text-sm text-[#0F172A] outline-none transition focus:border-[#334EAC] focus:ring-2 focus:ring-[#334EAC]/15"
                    placeholder="Lagos, Nigeria"
                  />
                  {errors.headquarters && (
                    <p className="text-xs text-[#DC2626]">{errors.headquarters.message}</p>
                  )}
                </label>

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
