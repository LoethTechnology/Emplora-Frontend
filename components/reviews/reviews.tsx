import Image from 'next/image';
import starLogo from '@/images/home/star-logo.png';
import companyLogo from '@/images/home/review-company-logo.png';

type Review = {
  id: string;
  body: string;
  overall_rating: number;
  published_at: string;
  company: {
    id: string;
    name: string;
    logo_url: string | null;
  };
};

type ReviewsProps = {
  review: Review;
};

const Reviews = ({ review }: ReviewsProps) => {
  const formattedDate = new Date(review.published_at).toLocaleDateString(
    'en-GB',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    },
  );

  return (
    <section className="w-[300px] min-h-[185px] p-5 border border-gray-200 rounded-lg bg-white">
      <div className="flex justify-between">
        <div>
          <Image src={starLogo} alt="Star Logo" />
        </div>

        <div>
          <p>{formattedDate}</p>
        </div>
      </div>

      <div className="flex justify-start mb-2.5 mt-2">
        <div>
          {review.company.logo_url ? (
            <img
              src={review.company.logo_url}
              alt={`${review.company.name} Logo`}
              className="w-8 h-8 object-contain"
            />
          ) : (
            <Image src={companyLogo} alt="Company Logo" />
          )}
        </div>

        <div className="ml-2">
          <p>{review.company.name}</p>
        </div>
      </div>

      <div>
        <p className="text-[13px]">{review.body}</p>
      </div>
    </section>
  );
};

export default Reviews;
