import { useAuthContext } from "./useAuthContext"
import { useReviewsContext } from "./useReviewsContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: reviewDispatch } = useReviewsContext()

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        reviewDispatch({type: 'SET_REVIEWS', payload: null})
    }

    return { logout }
}