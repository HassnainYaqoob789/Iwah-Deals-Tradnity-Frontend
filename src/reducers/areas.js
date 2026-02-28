import {
    GET_ALL_AREAS,
} from "../constants/ActionTypes";

export default function areasReducer(state = {
    getareas:[],
}, action) {
    switch (action.type) {
            case GET_ALL_AREAS:
                return { ...state,
                getareas: action.data };
        default:
    }
    return state;
}


