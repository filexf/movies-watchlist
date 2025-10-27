interface RatingStarsProps {
  rating: number;
  onRate: (rating: number) => void;
  readOnly?: boolean;
}

const RatingStars = ({
  rating,
  onRate,
  readOnly = false,
}: RatingStarsProps) => {
  const starCount = 5;

  return (
    <div className="flex items-center space-x-1">
      {[...Array(starCount)].map((_, index) => (
        <button
          key={index}
          onClick={() => !readOnly && onRate(index + 1)}
          disabled={readOnly}
          className={`text-lg transform transition-transform duration-100 hover:scale-110 ${
            readOnly ? "cursor-default" : "cursor-pointer"
          }`}
        >
          {index < (rating || 0) ? (
            <span className="text-yellow-400">★</span>
          ) : (
            <span className="text-gray-500">☆</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default RatingStars;
