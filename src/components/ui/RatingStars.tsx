interface RatingStarsProps {
  rating: number
  onRate: (rating: number) => void
  readOnly?: boolean
}

const RatingStars = ({ rating, onRate, readOnly = false }: RatingStarsProps) => {
  const starCount = 5
  const stars = Array.from({ length: starCount }, (_, i) => i + 1)

  return (
    <div className="flex items-center space-x-1">
      {stars.map(starNum => (
        <button
          type="button"
          key={starNum}
          onClick={() => !readOnly && onRate(starNum)}
          disabled={readOnly}
          className={`text-lg transform transition-transform duration-100 hover:scale-110 ${
            readOnly ? 'cursor-default' : 'cursor-pointer'
          }`}
        >
          {starNum <= (rating || 0) ? (
            <span className="text-yellow-400">★</span>
          ) : (
            <span className="text-gray-500">☆</span>
          )}
        </button>
      ))}
    </div>
  )
}

export default RatingStars
