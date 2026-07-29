export interface CompanyLocation {
  id: string;
  company_id: string;
  country: string;
  address: string;
  is_headquarters: boolean;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  creator_id: string;
  name: string;
  description: string;
  website_url: string;
  linkedin_url: string;
  logo_url: string;
  industry: string;
  status: 'APPROVED' | string; // use literal union if you know all possible values
  created_at: string;
  updated_at: string;
  locations: CompanyLocation[];
}

export interface CompanyApiResponse {
  message: string;
  code: number;
  data: Company;
}
