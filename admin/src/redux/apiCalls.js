// Import necessary action creators from userRedux for user authentication
import { loginStart, loginSuccess, loginFailure } from "./userRedux";

//for Product redux slice
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
} from "./productRedux";

//for Shop redux slice
import {
  getShopStart,
  getShopSuccess,
  getShopFailure,
  deleteShopStart,
  deleteShopSuccess,
  deleteShopFailure,
} from "./shopRedux";

// Import request methods for API calls
import { publicRequest, userRequest } from "../requestMethods";

// Login function for user authentication
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const response = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

// 1. Product CRUD operations

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const response = await userRequest.get("/products/find");
    const { products } = response.data;
    dispatch(getProductSuccess(products));
  } catch (error) {
    dispatch(getProductFailure());
  }
};
export const deleteProduct = async (dispatch, productId) => {
  dispatch(deleteProductStart());
  try {
    // await userRequest.delete(`/products/${productId}`);
    dispatch(deleteProductSuccess(productId));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};
export const updateProduct = async (dispatch, id, product) => {
  dispatch(getProductStart());
  try {
    await userRequest.put(`/products/${product._id}`, product);
    dispatch(getProductSuccess({ id: id, product: product }));
  } catch (error) {
    dispatch(getProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await userRequest.post("/products", product);
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};

// 1. Shop CRUD operations
export const getShops = async (dispatch) => {
  dispatch(getShopStart());
  try {
    const response = await userRequest.get("/shops/find");
    const { shops } = response.data;
    dispatch(getShopSuccess(shops));
  } catch (error) {
    dispatch(getShopFailure());
  }
};

export const deleteShop = async (dispatch, shopId) => {
  dispatch(deleteShopStart());
  try {
    await userRequest.delete(`/shops/${shopId}`);
    dispatch(deleteShopSuccess(shopId));
  } catch (error) {
    dispatch(deleteShopFailure());
  }
};

export const updateShop = async (dispatch, shopId, shopData) => {
  dispatch(getShopStart());
  try {
    const response = await userRequest.put(`/shops/${shopId}`, shopData);
    dispatch(getShopSuccess(response.data));
  } catch (error) {
    dispatch(getShopFailure());
  }
};

export const createShop = async (shopData, dispatch) => {
  dispatch(getShopStart());
  try {
    const response = await userRequest.post("/shops", shopData);
    dispatch(getShopSuccess(response.data));
  } catch (error) {
    dispatch(getShopFailure());
  }
};
