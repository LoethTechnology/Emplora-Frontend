import { Button } from "@/components/ui/button";
import StarRating from "./StarRating";
import { MessageCircleMore, ThumbsDown, ThumbsUp } from "lucide-react";

interface RatingProps {
  rating: number;
  text: string;
  date: string;
  upVoteCount?: number;
  downVoteCount?: number;
  commentCount?: number;
  onReport?: () => void;
  onUpVote?: () => void;
  onDownVote?: () => void;
  onComment?: () => void;
}

function ReviewCard({
  rating,
  text,
  date,
  onReport,
  onUpVote,
  onDownVote,
  onComment,
  upVoteCount,
  commentCount,
  downVoteCount,
}: RatingProps) {
  return (
    <div className="flex w-full border border-custom-border rounded-2xl p-4 gap-3 flex-col">
      <div className="flex justify-between">
        <StarRating rating={rating} />
        <p className="text-sm">{date}</p>
      </div>
      <p>{text}</p>

      <div className="flex justify-between w-full">
        <Button
          className="text-[#D42620] border-[#D42620] border-[0.4px]"
          variant={"outline"}
          onClick={onReport}
        >
          Report
        </Button>
        <div>
          <Button variant={"ghost"}>
            <ThumbsUp />
            {upVoteCount}
          </Button>
          <Button variant={"ghost"}>
            <ThumbsDown />
            {downVoteCount}
          </Button>
          <Button variant={"ghost"}>
            <MessageCircleMore />
            {commentCount}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
