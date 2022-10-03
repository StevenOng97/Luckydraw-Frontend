import { useQuery } from 'react-query';
import axios from 'axios';
import Constants from '../constants';

const createUser = (authCredentials) => {
  return axios
    .post(`/${Constants.API_URL}/${Constants.REGISTER}`, authCredentials)
    .then((res) => res.data);
};

const useRegister = (authCredentials) => {
  return useQuery(Constants.REGISTER, () => createUser(authCredentials));
};

export default useRegister;
