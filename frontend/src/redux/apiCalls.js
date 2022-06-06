import {loginFailure, loginStart, loginSuccess, logout} from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("authentication/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const logoutCall = async (dispatch, user, products) => {
    try {
        if (products.length !== 0) {
            const res = await publicRequest.post("cart", {userId: user._id, products: products});
        }
        dispatch(logout());
    } catch (err) {
        console.log(err);
    }

};


export const register = async (dispatch, user) => {
    try {
        const res = await publicRequest.post("authentication/register", user);
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
};