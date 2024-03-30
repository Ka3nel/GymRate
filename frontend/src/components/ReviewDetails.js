const ReviewDetails = ({ review }) => {
    return (
        <div className="review-details">
            <h4>{review.title}</h4>
            <p><strong>Overall rating: </strong>{review.overallRating}</p>
            <p><strong>Review: </strong>{review.text}</p>
            <p>{review.createdAt}</p>
        </div>
    )
}

export default ReviewDetails