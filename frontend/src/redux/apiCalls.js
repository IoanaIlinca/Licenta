import {loginFailure, loginStart, loginSuccess, logout} from "./userRedux";
import {publicRequest, userRequest} from "../requestMethods";
import {addProduct} from "./cartRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("authentication/login", user);
        dispatch(loginSuccess(res.data));
        const cart = await publicRequest.get("cart/user/" + res.data._id);
        if (cart.data !== null) {
            for (let product of cart.data.products) {
                dispatch(addProduct(product));
            }
        }
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const logoutCall = async (dispatch, user, products) => {
    try {
        console.log(products)
        if (products.length !== 0) {
            const hasCart = await publicRequest.get("cart/user/" + user._id);
            if (hasCart.data === null)
                await userRequest.post("cart", {userId: user._id, products: products});
            else
                await userRequest.put("cart/" + user._id, {id: user._id, products: products});
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