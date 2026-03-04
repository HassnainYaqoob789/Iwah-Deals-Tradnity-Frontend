import {
    PEOPLE_VIEW_PROCUCT,
} from "../constants/ActionTypes";

export default function getpeopleViewProductReducer(state = {
    getpeopleViewProducts:[],
}, action) {
    switch (action.type) {
            case PEOPLE_VIEW_PROCUCT:
                return { ...state,
                getpeopleViewProducts: action.data };
        default:
    }
    return state;
}




