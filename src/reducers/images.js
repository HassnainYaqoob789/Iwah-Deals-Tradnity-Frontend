import {FETCH_SLIDER_IMAGE, FETCH_HOME_BANNER,FETCH_ROUTE_P_NAME } from "../constants/ActionTypes";

const initialState = {
    sliderImages:[],
    sliderBannner:[],
    pRoute:[],
};

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SLIDER_IMAGE:
            return { ...state,
                sliderImages: action.images };
        case FETCH_HOME_BANNER:
            return { ...state,
                sliderBannner: action.banners };
        case FETCH_ROUTE_P_NAME:
            return { ...state,
                pRoute: action.routes };
        default:
            return state;
    }
};
export default imageReducer;