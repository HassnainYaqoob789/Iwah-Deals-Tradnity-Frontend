import {
   GET_WISHLIST } from "../constants/ActionTypes";
    const initialState = {
        getwishlist : []
    }
export default function wishlistReducer(state = initialState, action) {
    switch (action.type) {
        case GET_WISHLIST:
            return { ...state,
                getwishlist: action.data };
        default:
    }
    return state;
}
