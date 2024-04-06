import { useReviewsContext } from '../hooks/useReviewsContext'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ReviewDetails = ({ review }) => {
    const { dispatch } = useReviewsContext()

    const handleClick = async () => {
        const response = await fetch('/api/reviews/' + review._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return (
        <div className="review-details">
            <h4>{review.title}</h4>
            <p><strong>Overall rating: </strong>{review.overallRating}</p>
            <p><strong>Review: </strong>{review.text}</p>
            <p>{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default ReviewDetails