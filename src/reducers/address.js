import {
    GETUSER_ADDRESS,GETUSER_ADDRESSBYID
} from "../constants/ActionTypes";

export default function addressReducer(state = {
    getAddressbyid:[],userAddress:[],
}, action) {
    switch (action.type) {
		case GETUSER_ADDRESS:
			return { ...state,
				userAddress: action.address };
        case GETUSER_ADDRESSBYID:
            return { ...state,
                getAddressbyid: action.data };
        default:
    }
    return state;
}
