import axios from 'axios';
export const SIGN_UP = "SIGN_UP";
export const SIGNUP_FAIL = "SIGNUP_FAIL";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const IS_AUTH = "IS_AUTH";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

const BASE_URL ="https://awaka.online/react/post.php";

export const sendSignUpToServer = (userData)=> {
  
 return (dispatch) =>{
    let url = BASE_URL;
    userData.action = "signup";
    const queryParams = Object.entries(userData).map(([key,val])=>`${key}=${val}`).join("&")
    url+="?"+queryParams;
    userData.action="signup";
    console.log("signUp action", url);
    
    axios.post(url).then(res=>{
    console.log("sign up post res",res);
     if(res.data["error"] == 1 ){
        dispatch(signUpFail(res.data.msg));
        dispatch(isAuth(0));
     }else{
        dispatch(signUpSuccess(res.data));
         dispatch(isAuth(1));
    }
    
  }).catch(error=>{
    console.log("sign up post error", error);
     dispatch(signUpFail(error));
    dispatch(isAuth(0));
  });

  
 }

}

export const signUpFail=(msg)=>{
    return {
        type: SIGNUP_FAIL,
        payload:msg
    }

}

export const signUpSuccess = (resData) =>{
    return{
        type:SIGNUP_SUCCESS,
        payload:resData
    }
}
export const sendLogInToServer =(userData) =>{
    return (dispatch) =>{
        let url = BASE_URL;
    userData.action = "login";
    const queryParams = Object.entries(userData).map(([key,val])=>`${key}=${val}`).join("&")
    url+="?"+queryParams;
    userData.action="login";
    console.log("signUp action", url);
    
    axios.post(url).then(res=>{
        console.log("res from Auth login", res);
            dispatch(isAuth(0));
            if(res.data["error"] == 1){
                dispatch(logInFail(res.data.msg));
                dispatch(isAuth(0));
            }else{
                dispatch(LogInSuccess(res.data.user_name));
                localStorage.setItem('token',JSON.stringify(res.data.token));
                dispatch(isAuth(1));
                //redirect
                
               

            }
    }).catch(error=>{
        dispatch(isAuth(0));
    })
    }
}
export const logInFail=(error)=>{
    return {
        type: LOGIN_FAIL,
        payload:error
    }

};
export const LogInSuccess=(user_name)=>{
    return {
        type: LOGIN_SUCCESS,
        payload:user_name
    }

}
export const isAuth = (isAuth) => {
    return{
        type:IS_AUTH,
        payload:isAuth
    }
}
