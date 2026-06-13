"use client";

import { useState } from "react";
import Navbar from "@/components/navbar/navbar";
import Image from "next/image";
import companyProfile from "@/images/company/companyProfile.png";
import BackButton from "@/components/buttons/BackBtn";
import FavoriteBtn from "@/components/buttons/FavoriteBtn";
import ProfileHeader from "../../../../components/searchCompany/ProfileHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ReactNode } from "react";
import { ChevronDown, MessageCircleMore, Star, UsersRound } from "lucide-react";
import ReviewCard from "../../../../components/searchCompany/ReviewCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export type ReviewCategory =
  | "all"
  | "salary-benefits"
  | "work-Environment"
  | "career-growth"
  | "management";

type SortOrder = "asc" | "desc";

const dummyData = {
  name: "TechNova Solutions",
  description: "Driving Innovation Through Technology",
  location: "Garki, Abuja Nigeria",
  img: "",
  summary:
    "TechNova Solutions is a technology-driven company that provides innovative digital solutions to help businesses grow and operate more efficiently. The company specializes in areas such as software development, IT consulting, cloud services, and data-driven technologies, enabling organizations to navigate digital transformation and stay competitive",
  reviews: [
    {
      rating: 5.0,
      text: "Absolutely love this product! The quality exceeded my expectations and the customer service was outstanding. Would definitely recommend to anyone looking for a reliable solution.",
      date: "2026-04-28",
      upVoteCount: 24,
      downVoteCount: 1,
      commentCount: 3,
      categories: ["salary-benefits", "work-Environment"],
    },
    {
      rating: 4.5,
      text: "Great experience overall. The interface is intuitive and the features are exactly what I needed. Only minor issue was the delivery took a day longer than expected.",
      date: "2026-04-25",
      upVoteCount: 18,
      downVoteCount: 2,
      commentCount: 5,
      categories: ["salary-benefits", "career-growth"],
    },
  ],
  employees: 10,
  commentCount: 20,
  rating: 3.8,
  organizationDetails: {
    email: "technova@gmail.com",
    yearFounded: 2005,
    active: true,
    industry: "tech",
    Founders: ["Mr Yusuf Jibril", "Mrs Aisha Jibril"],
  },
  latestJobs: [
    { title: "Frontend_Developer", type: "Remote", nature: "Full_Time" },
    { title: "Backend_Developer", type: "Hybrid", nature: "Full_Time" },
    { title: "IT_Specialist", type: "Remote", nature: "Contract" },
  ],
};

const REVIEW_CATEGORIES: { value: ReviewCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "salary-benefits", label: "Salary & Benefits" },
  { value: "work-Environment", label: "Work Environment" },
  { value: "management", label: "Management" },
  { value: "career-growth", label: "Career Growth" },
];

const TopCards = ({
  icon,
  title,
  count,
}: {
  icon: ReactNode;
  title: string;
  count: number;
}) => (
  <div className="flex flex-col gap-2 border border-custom-border rounded-2xl p-5 flex-1 min-w-[120px]">
    {icon}
    <p className="text-xs text-text-secondary whitespace-nowrap">{title}</p>
    <p className="text-text-primary text-2xl font-semibold">{count}</p>
  </div>
);

const CompanyProfile = () => {
  const [activeCategory, setActiveCategory] = useState<ReviewCategory>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- FIGMA MULTI-CRITERIA REVIEW STATES ---
  const [ratings, setRatings] = useState({
    workEnvironment: 0,
    salaryBenefits: 0,
    management: 0,
    careerGrowth: 0,
  });
  const [reviewText, setReviewText] = useState("");

  // --- REPORT MODAL STATES ---
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [reportComment, setReportComment] = useState("");
  const [reportingReviewId, setReportingReviewId] = useState<number | null>(null);

  // --- COMPONENT HANDLERS ---
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review Submitted:", { ratings, reviewText });
    setIsModalOpen(false);
    setRatings({ workEnvironment: 0, salaryBenefits: 0, management: 0, careerGrowth: 0 });
    setReviewText("");
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Report Submitted:", { reportingReviewId, selectedReason, reportComment });
    setIsReportModalOpen(false);
    setSelectedReason("");
    setReportComment("");
    setReportingReviewId(null);
  };

  const displayedReviews = dummyData.reviews
    .filter((review) =>
      activeCategory === "all" ? true : review.categories.includes(activeCategory)
    )
    .sort((a, b) =>
      sortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating
    );

  return (
    <div className="mb-20 w-full min-h-screen bg-white">
      <Navbar />
      
      {/* Banner Area */}
      <div className="w-full relative h-[200px] md:h-[300px]">
        <Image
          src={companyProfile}
          alt="company image"
          fill
          className="object-cover"
          priority
        />
        <BackButton className="absolute top-5 left-5 md:left-10 z-10" />
        <FavoriteBtn className="absolute top-5 right-5 md:right-10 z-10" />
      </div>

      {/* Main Responsive Body Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        
        {/* Profile Info Header Placement */}
        {/* Note: The "Write a Review" button is already managed right inside this <ProfileHeader /> component configuration! */}
        <div className="bg-white rounded-2xl shadow-sm border border-custom-border p-6 mb-8">
          <ProfileHeader
            img={companyProfile}
            name={dummyData.name}
            description={dummyData.description}
            location={dummyData.location}
          />
        </div>

        {/* Master Responsive Grid (2 Columns on Large Screens) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT SIDE: Core Content (Takes 2 columns out of 3) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Top Cards Section */}
            <div className="flex flex-wrap gap-4 w-full">
              <TopCards
                title="Employees"
                count={dummyData.employees}
                icon={<UsersRound size={24} className="text-[#0F973D]" />}
              />
              <TopCards
                title="Comments"
                count={dummyData.commentCount}
                icon={<MessageCircleMore size={24} className="text-[#1671D9]" />}
              />
              <TopCards
                title="Ratings"
                count={dummyData.rating}
                icon={<Star size={24} className="text-[#FACC15]" />}
              />
            </div>

            {/* Structured Page Sections */}
            <div className="border border-custom-border rounded-2xl p-6 bg-white">
              <h3 className="text-text-primary pb-3 font-semibold text-xl border-b border-custom-border mb-4">
                Summary
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {dummyData.summary}
              </p>
            </div>

            {/* Reviews Workspace Module */}
            <div className="border border-custom-border rounded-2xl p-6 bg-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-text-primary font-semibold text-xl">
                  Reviews
                </h3>

                <div className="flex gap-3 items-center">
                  {/* Global Review Dialog Declaration State Holder (Trigger button removed per Noel's request to prevent duplicates) */}
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="sm:max-w-[550px] p-6 bg-white rounded-xl">
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
                          <p className="text-sm font-medium text-text-primary">How would you like to rate your experience?</p>
                          
                          {[
                            { key: "workEnvironment", label: "Work Environment" },
                            { key: "salaryBenefits", label: "Salary & Benefits" },
                            { key: "management", label: "Management" },
                            { key: "careerGrowth", label: "Career Growth" },
                          ].map((criterion) => (
                            <div key={criterion.key} className="flex justify-between items-center py-1">
                              <span className="text-sm text-text-secondary">{criterion.label}</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    size={20}
                                    className={`cursor-pointer transition-all ${
                                      star <= ratings[criterion.key as keyof typeof ratings]
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300 hover:text-yellow-200"
                                    }`}
                                    onClick={() =>
                                      setRatings((prev) => ({ ...prev, [criterion.key]: star }))
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
                            className="w-full min-h-[100px] p-3 rounded-lg border border-custom-border bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="Share details about your experience..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            required
                          />
                        </div>

                        <div className="w-full pt-2">
                          <button type="submit" className="w-full py-3 text-sm font-medium text-white bg-primary hover:bg-primary/95 rounded-lg transition-colors">
                            Submit Review
                          </button>
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
                      <DropdownMenuItem onSelect={() => setSortOrder("desc")}>
                        DESC
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSortOrder("asc")}>
                        ASC
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Category Filter Tabs */}
              <Tabs
                value={activeCategory}
                onValueChange={(val) => setActiveCategory(val as ReviewCategory)}
                className="w-full mb-6"
              >
                <TabsList className="flex flex-wrap gap-2 h-auto p-1 bg-neutral-50 border border-custom-border rounded-lg justify-start w-full">
                  {REVIEW_CATEGORIES.map((category) => (
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
                      
                      {/* The Dialog wrapper triggers cleanly when the nested layout areas are targeted */}
                      <Dialog 
                        open={isReportModalOpen && reportingReviewId === index} 
                        onOpenChange={(open) => {
                          setIsReportModalOpen(open);
                          if (open) setReportingReviewId(index);
                        }}
                      >
                        <DialogTrigger asChild>
                          <div className="cursor-pointer">
                            <ReviewCard
                              rating={review.rating}
                              text={review.text}
                              date={review.date}
                            />
                          </div>
                        </DialogTrigger>
                        
                        <DialogContent className="sm:max-w-[480px] p-6 bg-white rounded-xl">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-semibold text-text-primary">
                              Report this Review
                            </DialogTitle>
                            <DialogDescription className="text-xs text-text-secondary">
                              Help us understand what is wrong with this review.
                            </DialogDescription>
                          </DialogHeader>

                          <form onSubmit={handleReportSubmit} className="flex flex-col gap-5 mt-4">
                            <div className="flex flex-col gap-3">
                              <p className="text-sm font-medium text-text-primary">Select a reason:</p>
                              {[
                                "Inappropriate or offensive language",
                                "Fake or misleading review content",
                                "Spam, advertisement, or promotional text",
                                "Contains confidential company information",
                              ].map((reason) => (
                                <label key={reason} className="flex items-start gap-3 p-2.5 rounded-lg border border-custom-border hover:bg-neutral-50 cursor-pointer text-sm text-text-secondary">
                                  <input
                                    type="radio"
                                    name="reportReason"
                                    value={reason}
                                    checked={selectedReason === reason}
                                    onChange={(e) => setSelectedReason(e.target.value)}
                                    className="mt-0.5 h-4 w-4 text-primary"
                                    required
                                  />
                                  <span>{reason}</span>
                                </label>
                              ))}
                            </div>

                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-medium text-text-primary">Additional details (Optional)</label>
                              <textarea
                                className="w-full min-h-[90px] p-3 rounded-lg border border-custom-border bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Provide more context..."
                                value={reportComment}
                                onChange={(e) => setReportComment(e.target.value)}
                              />
                            </div>

                            <DialogFooter>
                              <button type="button" onClick={() => setIsReportModalOpen(false)} className="px-4 py-2 text-sm border border-custom-border rounded-md">
                                Cancel
                              </button>
                              <button type="submit" className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md">
                                Submit Report
                              </button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
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
          <div className="flex flex-col gap-6 lg:sticky lg:top-6">
            
            {/* Latest Jobs Card */}
            <div className="border border-custom-border rounded-2xl py-5 px-4 bg-white shadow-sm">
              <p className="text-text-primary font-semibold pb-3 border-b border-custom-border mb-3">Latest Jobs</p>
              <div className="flex flex-col gap-3">
                {dummyData.latestJobs.map((job) => (
                  <div className="py-2 first:pt-0 last:pb-0 border-b border-dashed border-custom-border last:border-none" key={job.title}>
                    <div className="flex w-full justify-between items-center font-medium text-sm text-text-primary">
                      <p>{job.title.replaceAll("_", " ")}</p>
                      <p className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">{job.nature.replaceAll("_", " ")}</p>
                    </div>
                    <p className="text-xs text-text-secondary mt-1">{job.type.replaceAll("_", " ")}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Organization Info Details Card */}
            <div className="border border-custom-border rounded-2xl py-5 px-4 bg-white shadow-sm flex flex-col gap-3.5">
              <p className="text-text-primary font-semibold pb-1 border-b border-custom-border">Organization Details</p>
              <div className="flex justify-between text-sm">
                <p className="text-text-secondary">Email</p>
                <p className="text-text-primary font-medium">{dummyData.organizationDetails.email}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-text-secondary">Year Founded</p>
                <p className="text-text-primary font-medium">{dummyData.organizationDetails.yearFounded}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-text-secondary">Status</p>
                {dummyData.organizationDetails.active ? (
                  <p className="text-[#0F973D] font-medium bg-green-50 px-2 py-0.5 rounded text-xs">Active</p>
                ) : (
                  <p className="text-text-secondary text-xs">Inactive</p>
                )}
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-text-secondary">Industry</p>
                <p className="text-text-primary font-medium capitalize">{dummyData.organizationDetails.industry}</p>
              </div>
              <div className="flex justify-between text-sm gap-2">
                <p className="text-text-secondary">Founders</p>
                <div className="text-right text-text-primary font-medium">
                  {dummyData.organizationDetails.Founders.join(", ")}
                </div>
              </div>
            </div>

            {/* Locations Address Card */}
            <div className="border border-custom-border rounded-2xl py-5 px-4 bg-white shadow-sm">
              <p className="text-text-primary font-semibold pb-3 border-b border-custom-border mb-3">
                Locations
              </p>
              <div>
                <p className="text-text-primary text-sm font-medium">Head Office</p>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">{dummyData.location}</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;