import Navbar from "@/components/navbar/navbar";
import Image from "next/image";
import companyProfile from "@/images/company/companyProfile.png";
import BackButton from "@/components/buttons/BackBtn";
import FavoriteBtn from "@/components/buttons/FavoriteBtn";
import ProfileHeader from "../components/ProfileHeader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";
import { MessageCircleMore, Star, UsersRound } from "lucide-react";
import ReviewCard from "../components/ReviewCard";

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
      onReport: () => console.log("Report review 1"),
      onUpVote: () => console.log("Upvote review 1"),
      onDownVote: () => console.log("Downvote review 1"),
      onComment: () => console.log("Comment on review 1"),
    },
    {
      rating: 4.5,
      text: "Great experience overall. The interface is intuitive and the features are exactly what I needed. Only minor issue was the delivery took a day longer than expected.",
      date: "2026-04-25",
      upVoteCount: 18,
      downVoteCount: 2,
      commentCount: 5,
      onReport: () => console.log("Report review 2"),
      onUpVote: () => console.log("Upvote review 2"),
      onDownVote: () => console.log("Downvote review 2"),
      onComment: () => console.log("Comment on review 2"),
    },
    {
      rating: 3.0,
      text: "It's decent for the price. Does what it says on the tin but nothing particularly impressive. Might upgrade to the premium version later to see if it's worth it.",
      date: "2026-04-20",
      upVoteCount: 7,
      downVoteCount: 4,
      commentCount: 1,
      onReport: () => console.log("Report review 3"),
      onUpVote: () => console.log("Upvote review 3"),
      onDownVote: () => console.log("Downvote review 3"),
      onComment: () => console.log("Comment on review 3"),
    },
    {
      rating: 2.5,
      text: "Had some issues with setup and the documentation wasn't very helpful. Once I got it working it was fine, but the initial experience was frustrating.",
      date: "2026-04-15",
      upVoteCount: 3,
      downVoteCount: 8,
      commentCount: 6,
      onReport: () => console.log("Report review 4"),
      onUpVote: () => console.log("Upvote review 4"),
      onDownVote: () => console.log("Downvote review 4"),
      onComment: () => console.log("Comment on review 4"),
    },
    {
      rating: 1.0,
      text: "Very disappointed. The product stopped working after just two weeks and getting a refund has been a nightmare. Save your money and look elsewhere.",
      date: "2026-04-10",
      upVoteCount: 1,
      downVoteCount: 15,
      commentCount: 9,
      onReport: () => console.log("Report review 5"),
      onUpVote: () => console.log("Upvote review 5"),
      onDownVote: () => console.log("Downvote review 5"),
      onComment: () => console.log("Comment on review 5"),
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

const TopCards = ({
  icon,
  title,
  count,
}: {
  icon: ReactNode;
  title: string;
  count: number;
}) => (
  <div className="flex flex-col gap-3.5 border-custom-border rounded-2xl border p-5 w-1/3">
    {icon}
    <p className="text-xs text-text-secondary">{title}</p>
    <p className="text-text-primary text-2xl">{count}</p>
  </div>
);

const CompanyProfile = () => {
  return (
    <div className="mb-20">
      <Navbar />
      <div className="w-full relative">
        <Image
          src={companyProfile}
          alt="company image"
          className="object-cover w-full"
        />
        <BackButton className="absolute top-5 left-10 " />
        <FavoriteBtn className="absolute top-5 right-10 " />
      </div>

      <div className="w-[80%] mx-auto flex flex-col gap-6">
        <ProfileHeader
          img={companyProfile}
          name={dummyData.name}
          description={dummyData.description}
          location={dummyData.location}
        />

        <div className="w-full flex gap-5">
          {/* tab sections */}
          <Tabs className="w-2/3">
            <TabsList
              className="gap-4"
              variant={"line"}
              defaultValue={"overview"}
            >
              <TabsTrigger
                value="overview"
                className="cursor-pointer text-text-primary data-[state=active]:text-primary   data-[state=active]:after:bg-primary"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="Summary"
                className="cursor-pointer text-text-primary data-[state=active]:text-primary   data-[state=active]:after:bg-primary"
              >
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="Reviews"
                className="cursor-pointer text-text-primary data-[state=active]:text-primary  data-[state=active]:after:bg-primary"
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

            {/*Summary*/}
            <div>
              <p className="text-text-primary pb-2 font-medium text-xl">
                Summary
              </p>
              <p>{dummyData.summary}</p>
            </div>

            {/*Reviews*/}
            <div>
              <p className="text-text-primary pb-2 font-medium text-xl">
                Reviews
              </p>
              <div className="flex flex-col gap-3">
                {dummyData.reviews.map((review) => (
                  <ReviewCard
                    rating={review.rating}
                    text={review.text}
                    date={review.date}
                  />
                ))}
              </div>
            </div>
          </Tabs>

          {/*Left section*/}
          <div className="w-1/3 flex flex-col gap-5">
            {/*Latest Jobs*/}
            <div className="border border-custom-border rounded-xl py-4 px-3.5">
              <p className="text-text-primary pb-2">Latest Jobs</p>
              {dummyData.latestJobs.map((job) => (
                <div className="border-t border-custom-border py-2">
                  <div className="flex w-full justify-between items-center ">
                    <p>{job.title.replaceAll("_", " ")}</p>
                    <p className="text-sm">{job.nature.replaceAll("_", " ")}</p>
                  </div>
                  <p className="text-xs">{job.type.replaceAll("_", " ")}</p>
                </div>
              ))}
            </div>

            {/*Organization Details*/}
            <div className="border border-custom-border rounded-xl py-4 px-3.5">
              <p className="text-text-primary pb-2">Organization Details</p>
              <div className=" border-custom-border py-2 flex justify-between">
                <p>Email</p>
                <p className="text-text-primary">
                  {dummyData.organizationDetails.email}
                </p>
              </div>
              <div className=" border-custom-border py-2 flex justify-between">
                <p>Year Founded</p>
                <p className="text-text-primary">
                  {dummyData.organizationDetails.yearFounded}
                </p>
              </div>
              <div className=" border-custom-border py-2 flex justify-between">
                <p>Status</p>
                {dummyData.organizationDetails.active ? (
                  <p className="text-[#0F973D]">Active</p>
                ) : (
                  <p className="">Inactive</p>
                )}
              </div>
              <div className=" border-custom-border py-2 flex justify-between">
                <p>Industry</p>
                <p className="text-text-primary">
                  {dummyData.organizationDetails.industry}
                </p>
              </div>
              <div className="border-custom-border py-2 flex justify-between">
                <p>Founders</p>
                <div className="flex gap-1">
                  {dummyData.organizationDetails.Founders.map((founder) => (
                    <p className="text-text-primary">{founder},</p>
                  ))}
                </div>
              </div>
            </div>

            {/*Location*/}
            <div className="border border-custom-border rounded-xl py-4 px-3.5">
              <p className="text-text-primary pb-2 border-custom-border border-b">
                Locations
              </p>

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
