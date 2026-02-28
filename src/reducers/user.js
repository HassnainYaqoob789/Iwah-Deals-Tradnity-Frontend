import {
    GET_CURRENCIES,
    GET_MAIN_SCREEN_TEXT,
    GET_FOOTER_ICONS,
   USERS_DETAILS,
   GET_APP_CONFIG,
   GET_CHANGE_CURRENCIES
} from "../constants/ActionTypes";
const initialState = {
    user: [],
    mainScreenText:[],
    footerIcons:[],
    currencies:[],
    config:[],
};
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERS_DETAILS:
            return { ...state,
                user: action.user };
        case GET_MAIN_SCREEN_TEXT:
            return { ...state,
                mainScreenText: action?.data?.data };
        case GET_FOOTER_ICONS:
            return { ...state,
                footerIcons: action?.data?.data };
        case GET_CURRENCIES:
            return { ...state,
                currencies: action?.data?.data };
        case GET_APP_CONFIG:
            return { ...state,
                config: action?.config?.data };
        case GET_CHANGE_CURRENCIES:
        return { ...state,
            changeCurrences : action?.data?.data};
        default:
            return state;
    }
};
export default userReducer;