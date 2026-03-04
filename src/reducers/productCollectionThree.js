import {
    PRODUCT_BY_COLLECTION_THREE,
} from "../constants/ActionTypes";

export default function getproductCollectionThreeReducer(state = {
    getproductCollectionThree: [],
}, action) {
    switch (action.type) {
        case PRODUCT_BY_COLLECTION_THREE:
            return {
                ...state,
                getproductCollectionThree: action.data
            };
        default:
    }
    return state;
}




