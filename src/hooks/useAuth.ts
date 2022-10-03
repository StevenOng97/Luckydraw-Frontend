import { initReactQueryAuth } from "react-query-auth";
import {
  getUserProfile,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  User,
} from "../api/api";
import { storage } from "../helpers/helper";

export async function handleUserResponse(resp) {
  const {
    data: { token, user },
  } = resp;
  storage.setToken(token);
  return token;
}

async function loadUser() {
  // let user = null;
  // if (storage.getToken()) {
  //   const data = await getUserProfile();
  //   user = data;
  // }
  return storage.getToken();
}

async function loginFn(data) {
  const response = await loginWithEmailAndPassword(data);
  console.log("Loggining", data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  await storage.clearToken();
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
};

const { AuthProvider, useAuth } = initReactQueryAuth<User>(authConfig);

export { AuthProvider, useAuth };
