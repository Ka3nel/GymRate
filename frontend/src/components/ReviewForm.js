import { useState } from "react"
import { useReviewsContext } from '../hooks/useReviewsContext'

const ReviewForm = () => {
    const { dispatch } = useReviewsContext()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [overallRating, setOverallRating] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const review = {title, text, overallRating}

        const response = await fetch('/api/reviews', {
            method: 'POST',
            body: JSON.stringify(review),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setText('')
            setOverallRating('')
            setError(null)
            setEmptyFields([])
            console.log('new review added', json)
            dispatch({type: 'CREATE_REVIEW', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Review</h3>

            <label>Review title: </label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)} 
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Review: </label>
            <input 
                type="text" 
                onChange={(e) => setText(e.target.value)} 
                value={text}
                className={emptyFields.includes('text') ? 'error' : ''}
            />

            <label>Overall Rating: </label>
            <input 
                type="number" 
                onChange={(e) => setOverallRating(e.target.value)} 
                value={overallRating}
                className={emptyFields.includes('overallRating') ? 'error' : ''}
            />

            <button>Add Review</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ReviewForm