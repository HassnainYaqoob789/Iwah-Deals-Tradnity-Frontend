import { GET_ALL_PAGES } from "../constants/ActionTypes";

 const initialState = {
     all_pages: [],
 };
 
 const PagesReducer = (state = initialState, action) => {
     switch (action.type) {
         case GET_ALL_PAGES:
             return { ...state,
                all_pages: action.data };
         default:
             return state;
     }
 };
 export default PagesReducer;