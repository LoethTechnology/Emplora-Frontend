import { Star, StarHalf } from "lucide-react"; // or whatever icon library you're using

interface StarRatingProps {
  rating: number; // 1.0 to 5.0
  maxStars?: number; // default 5
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={`full-${i}`} fill="#FACC15" strokeWidth={0} size={15} />,
    );
  }

  if (hasHalfStar) {
    stars.push(
      <div key="half" className="relative w-3.75 h-3.75">
        {/* Gray full star as base */}
        <Star fill="#D9D9D9" strokeWidth={0} size={15} />
        {/* Yellow half star on top */}
        <StarHalf
          fill="#FACC15"
          strokeWidth={0}
          size={15}
          className="absolute inset-0"
        />
      </div>,
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star key={`empty-${i}`} fill="#D9D9D9" strokeWidth={0} size={15} />,
    );
  }

  return (
    <div className="flex">
      <div className="flex items-center">{stars}</div>
    </div>
  );
};
export default StarRating;
