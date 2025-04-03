import { QuoteIcon } from "lucide-react";
import React from "react";
import { StarRating } from "./UI/StartRating";

const ReviewCard = ({ comment, date, reviewerName, reviewerEmail, rating }) => {
  return (
    <div className="space-y-2 border-t border-b border-gray-300/50 p-5">
      <StarRating />
      <h3 className="text-xl font-bold flex items-center gap-2">
        <QuoteIcon className="size-6 rotate-180 text-gray-800 fill-gray-800 "  /> {comment} <QuoteIcon className="size-6 text-gray-800 fill-gray-800 " />
      </h3>
      <p className="font-semibold text-gray-500">&mdash; {reviewerName}, {new Date(date).toLocaleDateString('es-ES', {dateStyle:'medium'})}</p>
    </div>
  );
};

export default ReviewCard;
