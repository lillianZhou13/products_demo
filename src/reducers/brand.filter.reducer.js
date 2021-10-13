import {ADD_BRAND_TO_FILTER, REMOVE_BRAND_FROM_FILTER,SET_BRANDS,UPDATE_BRAND_FILTER} from "../actions";


export const  brandFilterReducer = (state = '', action) => {
    switch (action.type) {
        case SET_BRANDS:
            return [...state, ...action.payload];
        case UPDATE_BRAND_FILTER:
            const updatedState=[...state];
            updatedState.map(b=>{
                return  {
                    selected:action.payload.includes(b.value)? b.selected="Y" : b.selected="N",
                    label:b.label,
                    value:b.value
                }});
            console.log("updatedState",updatedState);
            return [...updatedState];
        case ADD_BRAND_TO_FILTER:
            if(state.includes(action.brand)) return state;
            return state += action.brand;
        case REMOVE_BRAND_FROM_FILTER:
            console.log('remove brand', action);
            const reg = new RegExp(action.brand, 'gi');
            return state.replace(reg, '');
        default:
            return state;
    }
};

