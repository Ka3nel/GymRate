import { useReviewsContext } from '../hooks/useReviewsContext'
import { useAuthContext } from '../hooks/useAuthContext'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ReviewDetails = ({ review }) => {
    const { dispatch } = useReviewsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/reviews/' + review._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
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