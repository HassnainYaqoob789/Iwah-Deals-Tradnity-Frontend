import {GET_ORDERS,GET_VIEW_DETAILS,GET_CONFIRM_ORDER} from "../constants/ActionTypes";

export default function orderReducer(state = {
    get_orders:[],order_detail:[],getConfrimOrder:[]
}, action) {
    switch (action.type) {
              case GET_ORDERS:
            return { ...state,
                get_orders: action.data };
        case GET_VIEW_DETAILS:
            return { ...state,
                order_detail: action.data };
          case GET_CONFIRM_ORDER: 
            return { ...state,
                getConfrimOrder: action.data };

        default:
    }
    return state;
}
