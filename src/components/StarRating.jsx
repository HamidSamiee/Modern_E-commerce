

const StarRating = () => {
  return (
    <div className="rating rating-xs rating-half mb-2">
        <input type="radio" name="rating-10" className="rating-hidden" />
        <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-yellow-300" />
        <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-yellow-300" />
        <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-yellow-300"
            defaultChecked />
        <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-yellow-300" />
        <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-yellow-300" />
        <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-yellow-300" />
        <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-yellow-300" />
        <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-yellow-300" />
        <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-yellow-300" />
        <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-yellow-300" />
    </div>
  )
}

export default StarRating