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
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "./productRedux";

//for Shop redux slice
import {
  getShopStart,
  getShopSuccess,
  getShopFailure,
  deleteShopStart,
  deleteShopSuccess,
  deleteShopFailure,
  updateShopStart,
  updateShopSuccess,
  updateShopFailure,
} from "./shopRedux";

//
import {
  getOwnerStart,
  getOwnerSuccess,
  getOwnerFailure,
  deleteOwnerStart,
  deleteOwnerSuccess,
  deleteOwnerFailure,
  updateOwnerStart,
  updateOwnerSuccess,
  updateOwnerFailure,
  addOwnerStart,
  addOwnerSuccess,
  addOwnerFailure,
} from "./ownerRedux";

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
    await userRequest.delete(`/products/${productId}`);
    dispatch(deleteProductSuccess(productId));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};
export const updateProduct = async (dispatch, id, product) => {
  dispatch(updateProductStart());
  try {
    await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess({ id: id, product: product }));
  } catch (error) {
    dispatch(updateProductFailure());
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
  dispatch(updateShopStart()); // Dispatching updateShopStart instead of getShopStart
  try {
    const response = await userRequest.put(`/shops/${shopId}`, shopData);
    dispatch(updateShopSuccess(response.data)); // Dispatching updateShopSuccess
  } catch (error) {
    dispatch(updateShopFailure()); // Dispatching updateShopFailure
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

// 1. ShopOwner CRUD operations

export const getOwners = async (dispatch) => {
  dispatch(getOwnerStart());
  try {
    const response = await userRequest.get("/owners/find");
    const { owners } = response.data;
    dispatch(getOwnerSuccess(owners));
  } catch (error) {
    dispatch(getOwnerFailure());
  }
};

export const deleteOwner = async (dispatch, ownerId) => {
  dispatch(deleteOwnerStart());
  try {
    await userRequest.delete(`/owners/${ownerId}`);
    dispatch(deleteOwnerSuccess(ownerId));
  } catch (error) {
    dispatch(deleteOwnerFailure());
  }
};

export const updateOwner = async (dispatch, id, owner) => {
  dispatch(updateOwnerStart());
  try {
    await userRequest.put(`/owners/${owner._id}`, owner);
    dispatch(updateOwnerSuccess({ id: id, owner: owner }));
  } catch (error) {
    dispatch(updateOwnerFailure());
  }
};

export const addOwner = async (owner, dispatch) => {
  dispatch(addOwnerStart());
  try {
    const res = await userRequest.post("/owners", owner);
    dispatch(addOwnerSuccess(res.data));
  } catch (error) {
    dispatch(addOwnerFailure());
  }
};
