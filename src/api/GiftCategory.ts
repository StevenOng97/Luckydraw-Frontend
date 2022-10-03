import axios, { AxiosError } from 'axios';
import Constants from '../constants';
import { storage } from '../helpers/helper';

export interface CreateGiftCategoryResponse {}

export interface ItemResponse {
  id: string;
  name: string;
  rate: number;
}

export interface GiftCategoryResponse {
  items: ItemResponse[];
  meta: any;
}

const endpoint = 'gift-categories';

export async function handleApiResponse(response) {
  if (response.data) {
    return response.data.data;
  } else {
    throw new Error('Internal Error');
  }
}

export async function handleApiError(err: AxiosError) {
  console.log('err', err);
}

const fetcherWithToken: any = (url: string, method: string, data) => {
  return axios({
    method,
    url,
    data: method !== 'get' ? data : undefined,
    headers: { Authorization: 'Bearer ' + storage.getToken() },
  })
    .then(handleApiResponse)
};

export async function createGiftCategory(data): Promise<any> {
  return fetcherWithToken(`${Constants.API_URL}/${endpoint}`, 'post', data);
}

export async function updateGiftCategory(data): Promise<any> {
  return fetcherWithToken(`${Constants.API_URL}/${endpoint}`, 'patch', data);
}

export async function deleteGiftCategory(id: string): Promise<any> {
  return fetcherWithToken(`${Constants.API_URL}/${endpoint}`, 'delete', { id });
}

export async function getAllGiftCategories(): Promise<GiftCategoryResponse> {
  console.log('API URL', Constants.API_URL);
  return fetcherWithToken(`${Constants.API_URL}/${endpoint}`, 'get');
}
