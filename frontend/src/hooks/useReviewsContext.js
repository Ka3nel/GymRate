import { ReviewsContext } from '../context/ReviewContext'
import { useContext } from 'react'

export const useReviewContext = () => {
    const context = useContext(ReviewsContext)

    if(!context) {
        throw Error('useReviewsContext must be use inside an ReviewsContextProvider')
    }

    return context
}