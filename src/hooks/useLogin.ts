import { useQuery } from 'react-query';
import axios from 'axios';
import Constants from '../constants';

const login = (authCredentials) => {
  return axios
    .post(`/${Constants.API_URL}/${Constants.LOGIN}`, authCredentials)
    .then((res) => res.data);
};

const useLogin = (authCredentials) => {
  return useQuery(Constants.LOGIN, () => login(authCredentials));
};

export default useLogin;
