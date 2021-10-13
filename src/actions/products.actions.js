import axios from 'axios';
import { setBrands,setLoading } from './index';
export const SET_PRODUCTS_TO_STORE = "SET_PRODUCTS_TO_STORE"
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_ON_FAILURE = "FETCH_ON_FAILURE";



//thunk cationcreator that return a fns
export const fetchProducts =  () =>  (dispatch)=>{
    console.log("fecthProducts reduer called");
    const BASE_URL = "https://fulfillant.com/react-api/";
    console.log("fetchProducts reduer called");
    dispatch(setLoading(true));
    axios.get(BASE_URL+"getProducts").then(res=>{
        console.log("response",res);
        console.log("response",res.data.products);
        //onsuccess set products and brands
        
        dispatch(fecthOnSuccess(res.data.products));
        dispatch(setBrands(res.data.brands));
        dispatch(setLoading(false));
       
        
     }).catch(error=>{
        console.log("error",error);
        dispatch(fecthOnFailure(error));
     });

};

export const fecthOnSuccess = products => {
    return {
        type: SET_PRODUCTS_TO_STORE,
        payload: products
    }
}
export const fecthOnFailure = error => {
    return {
        type: FETCH_ON_FAILURE,
        payload: error
    }
}


