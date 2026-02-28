import * as types from '../constants/ActionTypes';

const filtersReducerDefaultState = {
    brand: [],
    value: { min: 1, max: 950 },
    sortBy: "",
    country:"Pakistan",
    search:'',
    initalLoad:false
    };
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case types.FILTER_BRAND:
            return {
                ...state,
                brand: action.brand
            };
        case types.FILTER_COLOR:
            return {
                ...state,
                color: action.color
            };
        case types.FILTER_PRICE:
            return {
                ...state,
                value: {min: action.value.value.min, max: action.value.value.max }
            };
        case types.SORT_BY:
            return {
                ...state,
                sortBy: action.sort_by
            };
        case types.FILTER_COUNTRY:
            return {
                ...state,
                country: action.country,
                initalLoad: true
            };
        case types.FILTER_SEARCH:
                return {
                    ...state,
                    search: action.search
                };
        default:
            return state;
    }
}
export default filtersReducer;