import {
    FETCH_SINGLE_PRODUCT,
    CHANGE_CURRENCY,
    RECEIVE_PRODUCTS,
    FETCH_MENU,
    FETCH_FAQ,
    CHANGE_COUNTRY,
    FETCH_DEALS,

    FETCH_NEW_DEALS,
    FETCH_SETTINGS,
    FETCH_PRIVATEPOLICY,
    FETCH_DEALS_BANNERS,
    GET_REVIEWS,
    CURRENT_PAGE,
    GET_FILLTER_PRODUCT,
    GET_CATEGORY,
    REVIEWS_DETAILS,
    FORGET_EMAIL,
    GETBESTSELLER
} from "../constants/ActionTypes";
const initialState = {
    products: [],
    symbol: 'Rs. ',
    product_details: [],
    menu: [],
    country: 'Pakistan',
    deals: [],

    newdeals: [],
    privatepolicy: [],
    currentPage: '',
    bestseller: [],
    GET_REVIEWS: [],
    GET_FILLTER_PRODUCT: [],
    GET_CATEGORY: [],
    reviewsdata: [],
        categoryLoading: false // SIRF YEH LINE ADD KARDI

};
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case REVIEWS_DETAILS:
            return {
                ...state,
                reviewsdata: action.data
            };
        case RECEIVE_PRODUCTS:
            return {
                ...state,
                products: action.products
            };
        case FETCH_SINGLE_PRODUCT:
            if (state.products.findIndex(product => product.id === action.productId) !== -1) {
                const singleItem = state.products.reduce((itemAcc, product) => {
                    return product
                }, [])
                return {
                    ...state,
                    product_details: singleItem
                };
            }
            break;
            case FETCH_MENU:
                return {
                    ...state,
                    menu: action.menu
                };
            case GET_FILLTER_PRODUCT:
                return {
                    ...state,
                    getfillterdata: action.data
                };
            case FETCH_FAQ:
                return {
                    ...state,
                    faq: action.faq
                };
            case FORGET_EMAIL:
                return {
                    ...state,
                    forget_email: action.data
                };
            case FETCH_DEALS:
                return {
                    ...state,
                    deals: action.data
                };
                case FETCH_NEW_DEALS:
                    return {
                        ...state,
                        newdeals: action.data
                    };
            case GET_CATEGORY:
                return {
                    ...state,
                    getCategory: action.data
                };
            case CHANGE_CURRENCY:
                return {
                    ...state,
                    symbol: action.symbol
                };
            case CHANGE_COUNTRY:
                return {
                    ...state,
                    country: action.changeCountry
                };
            case FETCH_SETTINGS:
                return {
                    ...state,
                    settings: action.data
                };
            case FETCH_PRIVATEPOLICY:
                return {
                    ...state,
                    privatepolicy: action.data
                };
            case GET_REVIEWS:
                return {
                    ...state,
                    getReviews: action.data
                };
            case FETCH_DEALS_BANNERS:
                return {
                    ...state,
                    dealBanner: action.data
                };
            case CURRENT_PAGE:
                return {
                    ...state,
                    currentPage: action.data
                };
            case GETBESTSELLER:
                return {
                    ...state,
                    bestsellers: action.data
                };
            default:
                return state;
    }
};
export default productReducer;