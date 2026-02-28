import {
    CATEGORY_BY_PRODUCTS,
} from "../constants/ActionTypes";

export default function categoryByProducts(state = {
    getcatebyproducts:[],
}, action) {
    switch (action.type) {
            case CATEGORY_BY_PRODUCTS:
                return { ...state,
                getcatebyproducts: action.data };
        default:
    }
    return state;
}
