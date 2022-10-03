import axios from 'axios';

const getCurrentUser: any = () => {
  return JSON.parse(localStorage.getItem('user')) || null;
};

const setCurrentUser: any = (user) => {
  return localStorage.setItem('user', user);
};

const storage = {
  getToken: () => JSON.parse(window.localStorage.getItem('token')),
  setToken: (token) =>
    window.localStorage.setItem('token', JSON.stringify(token)),
  clearToken: () => window.localStorage.removeItem('token'),
};

const fetcherWithToken: any = (url: string, token: string) => {
  return axios
    .get(url, { headers: { Authorization: 'Bearer ' + token } })
    .then((res) => res.data);
};

const fetcher: any = (url: string) => {
  return axios.get(url).then((res) => res.data);
};

export { getCurrentUser, setCurrentUser, storage, fetcherWithToken, fetcher };
