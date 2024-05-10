import { loginStart, loginSuccess, loginFailure } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
//for Shop redux slice
import { getShopStart, getShopSuccess, getShopFailure } from "./shopRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const response = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
export const register = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const response = await publicRequest.post("/auth/register", user);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

// 1. Shop CRUD operations for getting all shops
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
