import { storage } from '../helpers/helper';
import Constants from '../constants';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
interface AuthResponse {
  user: User;
  jwt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export async function handleApiResponse(response) {
  console.log('response.data', response.data);
  if (response.data) {
    return response.data;
  } else {
    throw new Error('Internal Error');
  }
}

export async function getUserProfile() {
  return await fetch(`${Constants.API_URL}/auth/me`, {
    headers: {
      Authorization: storage.getToken(),
    },
  }).then(handleApiResponse);
}

export async function loginWithEmailAndPassword(data): Promise<AuthResponse> {
  return axios
    .post(`${Constants.API_URL}/auth/login`, JSON.stringify(data))
    .then(handleApiResponse);
}

export async function registerWithEmailAndPassword(
  data
): Promise<AuthResponse> {
  return axios
    .post(`${Constants.API_URL}/auth/register`, JSON.stringify(data))
    .then(handleApiResponse);
}
