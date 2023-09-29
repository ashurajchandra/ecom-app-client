import {Action} from '../models'


export const ISLOADING = "ISLOADING";
export const LOGOUT = "LOGOUT";
export  const IS_AUTHENTICATED = "IS_AUTHENTICATED";
export const GET_USER_CART = "GET_USER_CART";
export const REFETCH = "REFETCH";


export const setRefetch = (payload:Boolean)=>{
  return{
    type:REFETCH,
    payload
  }
}

export const setGetUserCart = (payload:Boolean)=>{
  return{
    type:GET_USER_CART,
    payload
  }
}
export const setIsAuthenticated = (payload: boolean): Action => {
    return {
      type: IS_AUTHENTICATED,
      payload,
    };
  };

  
  export const setIsLoading = (payload: boolean): Action => {
    return {
      type: ISLOADING,
      payload,
    };
  };
export const setLogout = (): Action => {
    return {
      type: LOGOUT,
      payload: "",
    };
  };
