import { ReviewsContext } from '../context/ReviewsContext'
import { useContext } from 'react'

export const useReviewsContext = () => {
    const context = useContext(ReviewsContext)

    if(!context) {
        throw Error('useReviewsContext must be use inside an ReviewsContextProvider')
    }

    return context
}