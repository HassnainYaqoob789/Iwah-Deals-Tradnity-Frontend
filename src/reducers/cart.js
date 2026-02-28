import {
    GET_CART,
} from "../constants/ActionTypes";

export default function cartReducer(state = {
    getcartdata:[],
}, action) {
    switch (action.type) {
            case GET_CART:
                return { ...state,
                getcartdata: action.data };
        default:
    }
    return state;
}
