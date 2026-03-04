import { combineReducers } from 'redux';
import { IntlReducer as Intl } from 'react-redux-multilingual'
// Import custom components
import productReducer from './products';
import cartReducer from './cart';
import filtersReducer from './filters';
import wishlistReducer from './wishlist';
import compareReducer from './compare';
import userReducer from './user';
import imageReducer from './images';
import addressReducer from './address';
import contactReducer from './contact';
import orderReducer from './order';
import PagesReducer from './Pages';
import categoryByProducts from './categorybyproduct'
import areasReducer from "./areas"
import getproductCollectionThreeReducer from './productCollectionThree'
import getpeopleViewProductReducer from './peopleViewProduct'


const rootReducer = combineReducers({
    images: imageReducer,
    data: productReducer,
    cartList: cartReducer,
    filters: filtersReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
    user:userReducer,
    address : addressReducer,
    contactDetails : contactReducer,
    orders: orderReducer,
    pages:PagesReducer,
    categoryByProducts,
    areasReducer,
    getpeopleViewProductReducer,
    getproductCollectionThreeReducer,
    Intl,
});

export default rootReducer;



