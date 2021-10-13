//import actions
import {SET_PRODUCTS_TO_STORE,FETCH_ON_FAILURE} from '../actions/products.actions';

const initialState = [];


export const productsReducer = (state = initialState, action)=>{
    switch (action.type) {
       
        case SET_PRODUCTS_TO_STORE:
            
            console.log(action);
            return [...state, ...action.payload];
            
        case FETCH_ON_FAILURE:
            return [...state,{fetchErr:action.paload}];
       
        default:
            return state;

    }

}