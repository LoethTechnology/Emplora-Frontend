'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar/navbar';
import Image from 'next/image';
import companyProfile from '@/images/company/companyProfile.png';
import BackButton from '@/components/buttons/BackBtn';
import FavoriteBtn from '@/components/buttons/FavoriteBtn';
import ProfileHeader from '../../../../components/searchCompany/ProfileHeader';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReactNode } from 'react';
import { ChevronDown, MessageCircleMore, Star, UsersRound } from 'lucide-react';
import ReviewCard from '../../../../components/searchCompany/ReviewCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ReportModal from '@/components/searchCompany/ReportModal';

export type ReviewCategory =
  | 'all'
  | 'salary-benefits'
  | 'work-Environment'
  | 'career-growth'
  | 'management';

type SortOrder = 'asc' | 'desc';

const dummyData = {
  name: 'TechNova Solutions',
  description: 'Driving Innovation Through Technology',
  location: 'Garki, Abuja Nigeria',
  img: '',
  summary:
    'TechNova Solutions is a technology-driven company that provides innovative digital solutions to help businesses grow and operate more efficiently. The company specializes in areas such as software development, IT consulting, cloud services, and data-driven technologies, enabling organizations to navigate digital transformation and stay competitive',
  reviews: [
    {
      id: '1',
      rating: 5.0,
      text: 'Absolutely love this product! The quality exceeded my expectations and the customer service was outstanding. Would definitely recommend to anyone looking for a reliable solution.',
      date: '2026-04-28',
      upVoteCount: 24,
      downVoteCount: 1,
      commentCount: 3,
      onReport: () => console.log('Report review 1'),
      onUpVote: () => console.log('Upvote review 1'),
      onDownVote: () => console.log('Downvote review 1'),
      onComment: () => console.log('Comment on review 1'),
      categories: ['salary-benefits', 'work-Environment'],
    },
    {
      id: '2',
      rating: 4.5,
      text: 'Great experience overall. The interface is intuitive and the features are exactly what I needed. Only minor issue was the delivery took a day longer than expected.',
      date: '2026-04-25',
      upVoteCount: 18,
      downVoteCount: 2,
      commentCount: 5,
      onReport: () => console.log('Report review 2'),
      onUpVote: () => console.log('Upvote review 2'),
      onDownVote: () => console.log('Downvote review 2'),
      onComment: () => console.log('Comment on review 2'),
      categories: ['salary-benefits', 'career-growth'],
    },
    {
      id: '3',
      rating: 3.0,
      text: "It's decent for the price. Does what it says on the tin but nothing particularly impressive. Might upgrade to the premium version later to see if it's worth it.",
      date: '2026-04-20',
      upVoteCount: 7,
      downVoteCount: 4,
      commentCount: 1,
      onReport: () => console.log('Report review 3'),
      onUpVote: () => console.log('Upvote review 3'),
      onDownVote: () => console.log('Downvote review 3'),
      onComment: () => console.log('Comment on review 3'),
      categories: ['salary-benefits', 'management'],
    },
    {
      id: '4',
      rating: 2.5,
      text: "Had some issues with setup and the documentation wasn't very helpful. Once I got it working it was fine, but the initial experience was frustrating.",
      date: '2026-04-15',
      upVoteCount: 3,
      downVoteCount: 8,
      commentCount: 6,
      onReport: () => console.log('Report review 4'),
      onUpVote: () => console.log('Upvote review 4'),
      onDownVote: () => console.log('Downvote review 4'),
      onComment: () => console.log('Comment on review 4'),
      categories: ['salary-benefits', 'work-life balance'],
    },
    {
      id: '5',
      rating: 1.0,
      text: 'Very disappointed. The product stopped working after just two weeks and getting a refund has been a nightmare. Save your money and look elsewhere.',
      date: '2026-04-10',
      upVoteCount: 1,
      downVoteCount: 15,
      commentCount: 9,
      onReport: () => console.log('Report review 5'),
      onUpVote: () => console.log('Upvote review 5'),
      onDownVote: () => console.log('Downvote review 5'),
      onComment: () => console.log('Comment on review 5'),
      categories: ['salary-benefits', 'management'],
    },
  ],
  employees: 10,
  commentCount: 20,
  rating: 3.8,
  organizationDetails: {
    email: 'technova@gmail.com',
    yearFounded: 2005,
    active: true,
    industry: 'tech',
    Founders: ['Mr Yusuf Jibril', 'Mrs Aisha Jibril'],
  },
  latestJobs: [
    { title: 'Frontend_Developer', type: 'Remote', nature: 'Full_Time' },
    { title: 'Backend_Developer', type: 'Hybrid', nature: 'Full_Time' },
    { title: 'IT_Specialist', type: 'Remote', nature: 'Contract' },
  ],
};

const REVIEW_CATEGORIES: { value: ReviewCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'salary-benefits', label: 'Salary & Benefits' },
  { value: 'work-Environment', label: 'Work Environment' },
  { value: 'management', label: 'Management' },
  { value: 'career-growth', label: 'Career Growth' },
];

const TopCards = ({ icon, title, count }: { icon: ReactNode; title: string; count: number }) => (
  <div className="flex flex-col gap-3.5 border-custom-border rounded-2xl border p-5 w-1/3">
    {icon}
    <p className="text-xs text-text-secondary">{title}</p>
    <p className="text-text-primary text-2xl">{count}</p>
  </div>
);

const CompanyProfile = () => {
  const [activeCategory, setActiveCategory] = useState<ReviewCategory>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [isOpen, setIsOpen] = useState(false);

  const handleReport = (id: string) => {
    setIsOpen(true);
  };

  const displayedReviews = dummyData.reviews
    .filter(review =>
      activeCategory === 'all' ? true : review.categories.includes(activeCategory)
    )
    .sort((a, b) => (sortOrder === 'desc' ? b.rating - a.rating : a.rating - b.rating));

  return (
    <div className="mb-20">
      <ReportModal open={isOpen} onOpenChange={setIsOpen} onSubmit={() => {}} />
      <Navbar />
      <div className="w-full relative">
        <Image src={companyProfile} alt="company image" className="object-cover w-full" />
        <BackButton className="absolute md:top-5 md:left-10 top-2 left-5" />
        <FavoriteBtn className="absolute md:top-5 md:right-10 top-2 right-5" />
      </div>

      <div className="md:w-[80%] mx-auto flex flex-col gap-6">
        <ProfileHeader
          img={companyProfile}
          name={dummyData.name}
          description={dummyData.description}
          location={dummyData.location}
        />

        <div className="w-full flex gap-5 flex-col md:flex-row px-2">
          <Tabs className="md:w-2/3 w-full">
            <TabsList className="gap-4" variant={'line'} defaultValue={'overview'}>
              <TabsTrigger
                value="overview"
                className="cursor-pointer text-text-primary data-[state=active]:text-primary data-[state=active]:after:bg-primary"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="Summary"
                className="cursor-pointer text-text-primary data-[state=active]:text-primary data-[state=active]:after:bg-primary"
              >
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="Reviews"
                className="cursor-pointer text-text-primary data-[state=active]:text-primary data-[state=active]:after:bg-primary"
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            <div className="flex w-full gap-4">
              <TopCards
                title="Employees"
                count={dummyData.employees}
                icon={<UsersRound size={24} color="#0F973D" />}
              />
              <TopCards
                title="Comments"
                count={dummyData.commentCount}
                icon={<MessageCircleMore size={24} color="#1671D9" />}
              />
              <TopCards
                title="Ratings"
                count={dummyData.rating}
                icon={<Star size={24} color="#FACC15" />}
              />
            </div>

            <div>
              <p className="text-text-primary pb-2 font-medium text-xl">Summary</p>
              <p className="max-w-pro">{dummyData.summary}</p>
            </div>

            <div>
              <div className="flex justify-between">
                <p className="text-text-primary pb-2 font-medium text-xl">Reviews</p>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex text-sm text-text-secondary mb-3 items-center border border-custom-border rounded-md px-3 py-1">
                      Sort
                      <ChevronDown />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => setSortOrder('desc')}>DESC</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setSortOrder('asc')}>ASC</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Tabs
                value={activeCategory}
                onValueChange={val => setActiveCategory(val as ReviewCategory)}
              >
                <TabsList className="md:gap-3 border bg-custom-border md:mb-4 mb-10 gap-y-2 rounded-md flex-wrap md:flex-nowrap h-auto">
                  {REVIEW_CATEGORIES.map(category => (
                    <TabsTrigger
                      key={category.value}
                      value={category.value}
                      className="data-[state=active]:bg-primary data-[state=active]:text-white text-text-secondary md:p-4 cursor-pointer"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <div className="flex flex-col gap-3">
                {displayedReviews.length > 0 ? (
                  displayedReviews.map((review, index) => (
                    <ReviewCard
                      key={index}
                      rating={review.rating}
                      text={review.text}
                      date={review.date}
                      onReport={() => handleReport(review.id)}
                    />
                  ))
                ) : (
                  <p className="text-text-secondary text-sm">No reviews for this category yet.</p>
                )}
              </div>
            </div>
          </Tabs>

          <div className="md:w-1/3 w-full flex flex-col gap-5">
            <div className="border border-custom-border rounded-xl py-4 px-3.5">
              <p className="text-text-primary pb-2">Latest Jobs</p>
              {dummyData.latestJobs.map(job => (
                <div className="border-t border-custom-border py-2" key={job.title}>
                  <div className="flex w-full justify-between items-center">
                    <p>{job.title.replaceAll('_', ' ')}</p>
                    <p className="text-sm">{job.nature.replaceAll('_', ' ')}</p>
                  </div>
                  <p className="text-xs">{job.type.replaceAll('_', ' ')}</p>
                </div>
              ))}
            </div>

            <div className="border border-custom-border rounded-xl py-4 px-3.5">
              <p className="text-text-primary pb-2">Organization Details</p>
              <div className="border-custom-border py-2 flex justify-between">
                <p>Email</p>
                <p className="text-text-primary">{dummyData.organizationDetails.email}</p>
              </div>
              <div className="border-custom-border py-2 flex justify-between">
                <p>Year Founded</p>
                <p className="text-text-primary">{dummyData.organizationDetails.yearFounded}</p>
              </div>
              <div className="border-custom-border py-2 flex justify-between">
                <p>Status</p>
                {dummyData.organizationDetails.active ? (
                  <p className="text-[#0F973D]">Active</p>
                ) : (
                  <p>Inactive</p>
                )}
              </div>
              <div className="border-custom-border py-2 flex justify-between">
                <p>Industry</p>
                <p className="text-text-primary">{dummyData.organizationDetails.industry}</p>
              </div>
              <div className="border-custom-border py-2 flex justify-between gap-2">
                <p>Founders</p>
                <div className="flex gap-1 flex-col lg:flex-row">
                  {dummyData.organizationDetails.Founders.map(founder => (
                    <p className="text-text-primary" key={founder}>
                      {founder},
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-custom-border rounded-xl py-4 px-3.5">
              <p className="text-text-primary pb-2 border-custom-border border-b">Locations</p>
              <div>
                <p className="text-text-primary">Head Office</p>
                <p>{dummyData.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
