import { StarIcon } from "lucide-react";

export const StarRating = ({ value }) => (
  <div className='flex gap-0.5'>
    {Array.from(Array(5)).map((_, index) => {
      const starSerialNumber = index + 1;

      if (starSerialNumber <= Math.floor(value)) {
        return (
          <div key={starSerialNumber} className="">
            <StarRate />
          </div>
        );
      }

      if (starSerialNumber > Math.ceil(value)) {
        return (
          <div key={starSerialNumber} className="">
            <StarRate filling={0} />
          </div>
        );
      }

      const filling = value - index;

      return (
        <div key={starSerialNumber} className="">
          <StarRate fill={filling} />
        </div>
      );
    })}
  </div>
);

export const StarRate = ({ filling }) => {
  if (typeof filling === 'undefined' || filling === 1) {
    return (
      <StarIcon className="size-5 text-amber-400 fill-amber-400" />
    );
  }

  if (filling === 0) {
    return (
      <StarIcon className="size-5 text-amber-400 fill-none" />
    );
  }
}