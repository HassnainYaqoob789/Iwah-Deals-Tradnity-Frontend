import {GETCONTACT_DETAILS,FETCH_SOCIALLOGIN,GETSIDEDETIALS} from "../constants/ActionTypes";

export default function contactReducer(state = {
    contactDetails:[],socialLinks:[],sideDetails:[]
}, action) {
    switch (action.type) {    
        case GETCONTACT_DETAILS:
			return { ...state,
				contactDetails: action.data };
        case FETCH_SOCIALLOGIN:
            return { ...state,
                socialLinks: action.data };
         case GETSIDEDETIALS:
            return { ...state,
                sideDetails: action.data };

        default:
    }
    return state;
}
