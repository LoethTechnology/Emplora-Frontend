'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar/navbar';
import Image from 'next/image';
import companyProfile from '@/images/company/companyProfile.png';
import BackButton from '@/components/buttons/BackBtn';
import FavoriteBtn from '@/components/buttons/FavoriteBtn';
import ProfileHeader from '../../../../components/searchCompany/ProfileHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ReactNode } from 'react';
import { ChevronDown, MessageCircleMore, Star, UsersRound, Plus } from 'lucide-react';
import ReviewCard from '../../../../components/searchCompany/ReviewCard';
import { useParams } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import ReportModal from '@/components/searchCompany/ReportModal';
import { CreatePostMutationHook } from '@/src/api/hooks/usePost';
import { Button } from '@/components/ui/button';
import { CreateGetQueryHook } from '@/src/api/hooks/useGet';
import { Company } from '@/src/types/company.types';

type CreateReviewPayload = {
  body: string;
  overall_rating: number;
  employment_context: string;
  would_recommend: boolean;
};

type Review = {
  id: string;
  company_id: string;
  author_id: string;
  location_id: string | null;
  body: string;
  overall_rating: number;
  employment_context: string;
  would_recommend: boolean;
  status: string;
  published_at: string;
  created_at: string;
  updated_at: string;
};

type ReviewApiResponse = {
  data: Review[];
  totalCount: number;
  limit: number;
  currentCount: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  averageRating: number;
};

type CompanyApiResponse = {
  data: Company;
};

export type ReviewCategory =
  | 'all'
  | 'salary-benefits'
  | 'work-Environment'
  | 'career-growth'
  | 'management';

type SortOrder = 'asc' | 'desc';

const REVIEW_CATEGORIES: { value: ReviewCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'salary-benefits', label: 'Salary & Benefits' },
  { value: 'work-Environment', label: 'Work Environment' },
  { value: 'management', label: 'Management' },
  { value: 'career-growth', label: 'Career Growth' },
];

const TopCards = ({ icon, title, count }: { icon: ReactNode; title: string; count: number }) => (
  <div className="flex flex-col gap-2 border border-custom-border rounded-2xl p-5 flex-1 min-w-30">
    {icon}
    <p className="text-xs text-text-secondary whitespace-nowrap">{title}</p>
    <p className="text-text-primary text-2xl font-semibold">{count}</p>
  </div>
);

const CompanyProfile = () => {
  const [activeCategory, setActiveCategory] = useState<ReviewCategory>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();

  const companyId = params.id as string;

const useCreateReview = CreatePostMutationHook<CreateReviewPayload>({
  endpoint: '/companies/:companyId/reviews',
  onSuccess: (_data, queryClient) => {
    queryClient.invalidateQueries({
      queryKey: ['company-reviews'],
    });
  },
});

const useGetCompanyInfo = CreateGetQueryHook<CompanyApiResponse>({
  endpoint: '/companies/:companyId',
  queryKey: ['company-info'],
});

const useGetCompanyReviews = CreateGetQueryHook<ReviewApiResponse>({
  endpoint: '/companies/:companyId/reviews',
  queryKey: ['company-reviews'],
});

const { data: companyData, isLoading: isCompanyLoading, error: companyError } =
  useGetCompanyInfo({
    route: { companyId },
  });

const { data: reviewData, isLoading: isReviewsLoading } = useGetCompanyReviews({
  route: { companyId },
});

  const { mutate: createReview, isPending, error } = useCreateReview({
  route: { companyId },
});

  const errorMessage = (() => {
    if (!error) return null;

    const message = error.response?.data?.message;

    if (Array.isArray(message)) {
      return message.join(', ');
    }

    return message ?? error.message;
  })();

  // --- FIGMA MULTI-CRITERIA REVIEW STATES ---
  const [ratings, setRatings] = useState({
    workEnvironment: 0,
    salaryBenefits: 0,
    management: 0,
    careerGrowth: 0,
  });
  const [reviewText, setReviewText] = useState('');

  // --- REPORT MODAL STATES ---
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [reportComment, setReportComment] = useState('');
  const [reportingReviewId, setReportingReviewId] = useState<number | null>(null);

  // --- COMPONENT HANDLERS ---
const handleReviewSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const ratingValues = Object.values(ratings).filter(r => r > 0);

  const overallRating = Math.round(
    ratingValues.reduce((sum, rating) => sum + rating, 0) / ratingValues.length
  );

  createReview(
    {
      body: reviewText,
      overall_rating: overallRating,
      employment_context: '',
      would_recommend: true,
    },
    {
      onSuccess: () => {
        setIsModalOpen(false);

        setReviewText('');

        setRatings({
          workEnvironment: 0,
          salaryBenefits: 0,
          management: 0,
          careerGrowth: 0,
        });
      },
    }
  );
};

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Report Submitted:', {
      reportingReviewId,
      selectedReason,
      reportComment,
    });
    setIsReportModalOpen(false);
    setSelectedReason('');
    setReportComment('');
    setReportingReviewId(null);
  };
  const company = companyData?.data;

  const averageRating = reviewData?.averageRating ?? 0;
  
  const displayedReviews = (reviewData?.data ?? [])
  .map(review => ({
    rating: review.overall_rating,
    text: review.body,
    date: review.published_at?.split('T')[0] ?? review.created_at?.split('T')[0] ?? '',
  }))
  .sort((a, b) =>
    sortOrder === 'desc' ? b.rating - a.rating : a.rating - b.rating
  );

  return (
    <div className="mb-20 w-full min-h-screen bg-white">
      <Navbar />
      <ReportModal
        open={isReportModalOpen}
        onOpenChange={setIsReportModalOpen}
        onSubmit={() => handleReportSubmit}
      />
      {/* Banner Area */}
      <div className="w-full relative h-50 md:h-75">
        <Image src={companyProfile} alt="company image" fill className="object-cover" priority />
        <BackButton className="absolute top-5 left-5 md:left-10 z-10" />
        <FavoriteBtn className="absolute top-5 right-5 md:right-10 z-10" />
      </div>

      {/* Main Responsive Body Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        {/* Profile Info Header Placement */}
        <div className="bg-white rounded-2xl shadow-sm border border-custom-border p-6 mb-8">
          <ProfileHeader
  img={companyProfile}
  name={company?.name ?? 'Company'}
  description={company?.description ?? ''}
  location={
    company?.locations?.find(location => location.is_headquarters)?.address ??
    company?.locations?.[0]?.address ??
    ''
  }
  onReview={() => setIsModalOpen(true)}
/>
        </div>

        {/* Master Responsive Grid (2 Columns on Large Screens) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT SIDE: Core Content (Takes 2 columns out of 3) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Top Cards Section */}
<div className="flex flex-wrap gap-4 w-full">
  <TopCards
    title="Reviews"
    count={reviewData?.totalCount ?? 0}
    icon={<MessageCircleMore size={24} className="text-[#1671D9]" />}
  />

  <TopCards
    title="Ratings"
    count={averageRating}
    icon={<Star size={24} className="text-[#FACC15]" />}
  />
</div>

            {/* Structured Page Sections */}
            <div className="border border-custom-border rounded-2xl p-6 bg-white">
              <h3 className="text-text-primary pb-3 font-semibold text-xl border-b border-custom-border mb-4">
                Summary
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed"> {company?.description ?? 'No company description available yet.'} </p>
            </div>

            {/* Reviews Workspace Module */}
            <div className="border border-custom-border rounded-2xl p-6 bg-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-text-primary font-semibold text-xl">Reviews</h3>

                <div className="flex gap-3 items-center">
                  {/* Write Review Dialog Component */}
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="sm:max-w-137.5 p-6 bg-white rounded-xl">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-text-primary">
                          Give a feedback about this Company
                        </DialogTitle>
                        <DialogDescription className="text-xs text-text-secondary">
                          Share your experience to help others make better career decisions.
                        </DialogDescription>
                      </DialogHeader>

                      <form onSubmit={handleReviewSubmit} className="flex flex-col gap-6 mt-4">
                        {/* Multi-Criteria Ratings Spec */}
                        <div className="flex flex-col gap-4">
                          <p className="text-sm font-medium text-text-primary">
                            How would you like to rate your experience?
                          </p>

                          {[
                            {
                              key: 'workEnvironment',
                              label: 'Work Environment',
                            },
                            {
                              key: 'salaryBenefits',
                              label: 'Salary & Benefits',
                            },
                            { key: 'management', label: 'Management' },
                            { key: 'careerGrowth', label: 'Career Growth' },
                          ].map(criterion => (
                            <div
                              key={criterion.key}
                              className="flex justify-between items-center py-1"
                            >
                              <span className="text-sm text-text-secondary">{criterion.label}</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <Star
                                    key={star}
                                    size={20}
                                    className={`cursor-pointer transition-all ${
                                      star <= ratings[criterion.key as keyof typeof ratings]
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300 hover:text-yellow-200'
                                    }`}
                                    onClick={() =>
                                      setRatings(prev => ({
                                        ...prev,
                                        [criterion.key]: star,
                                      }))
                                    }
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Summary Textarea */}
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-text-primary">
                            Summarize your experience
                          </label>
                          <textarea
                            className="w-full min-h-25 p-3 rounded-lg border border-custom-border bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="Share details about your experience..."
                            value={reviewText}
                            onChange={e => setReviewText(e.target.value)}
                            required
                          />
                        </div>

                        <div className="w-full pt-2">
                          <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-3 text-sm font-medium text-white bg-primary hover:bg-primary/95 rounded-lg transition-colors"
                          >
                            Submit Review
                          </Button>
                          {errorMessage && (
                            <p className="mt-3 text-sm text-red-500">{errorMessage}</p>
                          )}
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>

                  {/* Filter Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex text-sm text-text-secondary items-center border border-custom-border rounded-md px-3 py-2 gap-1 bg-white hover:bg-neutral-50">
                        Sort
                        <ChevronDown size={16} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onSelect={() => setSortOrder('desc')}>
                        DESC
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSortOrder('asc')}>ASC</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Category Filter Tabs */}
              <Tabs
                value={activeCategory}
                onValueChange={val => setActiveCategory(val as ReviewCategory)}
                className="w-full mb-6"
              >
                <TabsList className="flex flex-wrap gap-2 h-auto p-1 bg-neutral-50 border border-custom-border rounded-lg justify-start w-full">
                  {REVIEW_CATEGORIES.map(category => (
                    <TabsTrigger
                      key={category.value}
                      value={category.value}
                      className="data-[state=active]:bg-primary data-[state=active]:text-white text-text-secondary text-xs px-3 py-1.5 rounded-md transition-all cursor-pointer"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Active Reviews Loop List */}
              <div className="flex flex-col gap-4">
                {displayedReviews.length > 0 ? (
                  displayedReviews.map((review, index) => (
                    <div key={index}>
                      <div className="cursor-pointer">
                        <ReviewCard
                          rating={review.rating}
                          text={review.text}
                          date={review.date}
                          onReport={() => setIsReportModalOpen(true)}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-text-secondary text-sm italic p-4 text-center">
                    No reviews for this category yet.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Info Side panels (Takes 1 column out of 3) */}
            

            {/* Organization Info Details Card */}
<div className="border border-custom-border rounded-2xl py-5 px-4 bg-white shadow-sm flex flex-col gap-3.5">
  <p className="text-text-primary font-semibold pb-1 border-b border-custom-border">
    Organization Details
  </p>

  <div className="flex justify-between text-sm">
    <p className="text-text-secondary">Status</p>
    {company?.status === 'APPROVED' ? (
      <p className="text-[#0F973D] font-medium bg-green-50 px-2 py-0.5 rounded text-xs">
        Active
      </p>
    ) : (
      <p className="text-text-secondary text-xs">Inactive</p>
    )}
  </div>

  <div className="flex justify-between text-sm">
    <p className="text-text-secondary">Industry</p>
    <p className="text-text-primary font-medium capitalize">
      {company?.industry ?? 'Not specified'}
    </p>
  </div>
</div>

            {/* Locations Address Card */}
            <div className="border border-custom-border rounded-2xl py-5 px-4 bg-white shadow-sm">
              <p className="text-text-primary font-semibold pb-3 border-b border-custom-border mb-3">
                Locations
              </p>
              <div>
                <p className="text-text-primary text-sm font-medium">Head Office</p>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  {company?.locations?.find(location => location.is_headquarters)?.address ??
  company?.locations?.[0]?.address ??
  'No location available'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
