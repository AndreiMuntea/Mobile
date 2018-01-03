import {User} from "../model/User"
import {callServerAPI} from "./api"
import {StackNavigator} from 'react-navigation'

const initialState = {fetching: false, error: null, fetched: false, token: null};

const LOGIN_PENDING = "LOGIN_PENDING"
const LOGIN_FULFILLED = "LOGIN_FULFILLED"
const LOGIN_ERROR = "LOGIN_ERROR"

const SIGNUP_PENDING = "SIGNUP_PENDING"
const SIGNUP_FULFILLED = "SIGNUP_FULFILLED"
const SIGNUP_ERROR = "SIGNUP_ERROR"


export const userReducer = (state=initialState, action) => {
    switch(action.type){
        case LOGIN_PENDING: {
            return {...state, fetching:true, fetched:false, error:null, token: null}
        }
        case LOGIN_FULFILLED: {
            return {...state, fetching:false, fetched:true, token: action.payload}
        }
        case LOGIN_ERROR: {
            return {...state, fetching:false, error:action.payload, fetched:true}
        }
        case SIGNUP_PENDING: {
            return {...state, fetching:true, fetched:false, error:null, token: null}
        }
        case SIGNUP_FULFILLED: {
            return {...state, fetching:false, fetched:true, token: action.payload}
        }
        case SIGNUP_ERROR: {
            return {...state, fetching:false, error:action.payload, fetched:true}
        }
        default:
            return state;
    }
}

export const login = (user) => async(dispatch) => {
    dispatch({type: LOGIN_PENDING});

    var result = await callServerAPI("/login", "POST", {username: user.username,password: user.password});

    if(result.token != null){
        console.log("Login successful");
        dispatch({type: LOGIN_FULFILLED, payload: result.token});
    } else {
        console.log("Login failed");
        dispatch({type: LOGIN_ERROR, payload: result});
    }
} 

export const signup = (user) => async(dispatch) => {
    dispatch({type: SIGNUP_PENDING});

    var result = await callServerAPI("/register", "POST", {username: user.username,password: user.password});

    if(result.token != null){
        console.log("Sign UP successful");
        dispatch({type: SIGNUP_FULFILLED, payload: result.token});
    } else {
        console.log("Sign UP failed");
        dispatch({type: SIGNUP_ERROR, payload: result});
    }

} 