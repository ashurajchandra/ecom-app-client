import { Action } from  '../models';
import { IS_AUTHENTICATED,REFETCH,GET_USER_CART,ISLOADING,LOGOUT} from './Action';
import {decodeToken,Token} from '../../services/authService';

interface userInfo{
  username:string;
  email:string;
  _id:string
}
export interface Authentication {
    isAuthenticated: boolean;
    isLoading: boolean;
    userInfo:any;
    getUserCart:boolean;
    refetch:boolean;
}

const isAuthenticated = () => {
    if (decodeToken()) {
      const decodedToken = decodeToken();
      const current = new Date().getTime() / 1000;
      if ( decodedToken && current < decodedToken.exp) {
        return true;
      }
    }
    return false;
  };

  const userInfo = ()=>{
    if(decodeToken()){
      const decodedToken= decodeToken()

       if(decodedToken != undefined){
        const token = decodedToken as unknown;
        const userToken = token as Token;
        const {username, email, _id} = userToken;

        return {username,email,_id}
       }
    }
  }
  export const initialAuthState: Authentication = {
    isAuthenticated: isAuthenticated(),
    isLoading: false,
    userInfo:userInfo()|| {username:'',email:'',id:''},
    getUserCart:false,
    refetch:false,
  }

  export const authStateReducer = (
    state: Authentication = initialAuthState,
    action: Action
  ): Authentication => {

    switch (action.type) {
        case IS_AUTHENTICATED: {
          return {
            ...state,
            isAuthenticated: action.payload,
          };
        }
        case REFETCH: {
          return {
            ...state,
            refetch: action.payload,
          };
        }
        case ISLOADING: {
          return {
            ...state,
            isLoading: action.payload,
          };
        }
        case LOGOUT: {
            return {
              ...initialAuthState,
            };
          }
          case GET_USER_CART:{
            return{
                ...state,
                getUserCart:action.payload
            }
          }
          default:
      return state;

  }
}