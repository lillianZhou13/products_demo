import { SIGNUP_SUCCESS,SIGNUP_FAIL,IS_AUTH,LOGIN_SUCCESS,LOGIN_FAIL } from "../actions/auth.action";

const state = {
    user_name:"",
    Email:"",
    token:"",
    isAuth:0
}
export const  authReducer =   (state='', action) =>{

    switch(action.type){
  
        case SIGNUP_SUCCESS:
            return  {...state,user_name:action.payload.user_name, 
                   email: action.payload.email,
                   token:action.payload.token};
        case SIGNUP_FAIL:
            return  {...state,error:action.payload};
        case LOGIN_SUCCESS:
             return {...state, user_name:action.payload};
        case LOGIN_FAIL:
             return {...state, error:action.payload};
        case IS_AUTH:
            return  {...state,isAuth:action.payload};
        default:
            return state;
    }
}