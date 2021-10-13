import {combineReducers} from 'redux';
import shop from './shop.reducer';
import {authReducer} from './auth.reducer';
import {brandFilterReducer} from "./brand.filter.reducer";
import {orderByPriceReducer} from "./orderByPrice.filter.reducer";
import {paginationReducer} from "./pagination.reducer";
import {productsReducer} from './products.reducer';
import { priceFilterReducer} from './price.filter.reducer';

export default combineReducers({
    shop,
    auth:authReducer,
    products:productsReducer,
    brandFilter: brandFilterReducer,
    priceFilter: priceFilterReducer,
    orderBy: orderByPriceReducer,
    pagination: paginationReducer
});
