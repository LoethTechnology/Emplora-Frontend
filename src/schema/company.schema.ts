import { z } from 'zod';

// Reuse/extend your existing locations array as a headquarters enum,
// or keep it a free string if you want global companies too
const industries = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Manufacturing',
  'Retail',
  'Agriculture',
  'Other',
] as const;

export const createCompanySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name is too long'),

  description: z
    .string()
    .trim()
    .min(20, 'Give a bit more detail (min 20 characters)')
    .max(1000, 'Description is too long'),

  website_url: z.string().trim().url('Enter a valid URL, e.g. https://acme.com'),

  domain: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/, 'Enter a valid domain, e.g. acme.com'),

  linkedin_url: z
    .string()
    .trim()
    .url('Enter a valid LinkedIn URL')
    .refine(url => url.includes('linkedin.com'), 'Must be a linkedin.com URL')
    .optional()
    .or(z.literal('')), // lets an empty input pass if not required

  logo_url: z.string().trim().url('Enter a valid image URL').optional().or(z.literal('')),

  headquarters: z.string().trim().min(2, 'Enter a location'),

  industry: z.enum(industries, {
    error: 'Select an industry',
  }),
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
