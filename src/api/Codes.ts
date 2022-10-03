import axios, { AxiosError, AxiosResponse } from "axios";
import Constants from "../constants";
import { storage } from "../helpers/helper";

export interface CreateBatchCodesRequest {
  giftCategoryId?: string;
  number?: number;
}

export interface CodeStruct {
  id?: string;
  spinId?: string;
  userId?: string;
}

export interface CreateBatchCodesRequest {
  number?: number;
}

export interface CreateBatchCodesResponse {
  status?: number;
  error?: string[];
}

export interface UpdateCodeRequest {
  id?: string;
  spinId?: string;
  status?: string;
}

export interface UpdateCodeResponse {
  status?: number;
  error?: string[];
  code?: CodeStruct;
}

export interface DeleteCodeRequest {
  id?: string;
}
export interface DeleteCodeResponse {
  status?: number;
  error?: string[];
  id?: string;
}

export interface GetAllCodesRequest {
  userId?: string;
  status?: string;
}

export interface GetAllCodesResponse {
  status?: number;
  error?: string[];
  items?: CodeStruct[];
}

const endpoint = "codes";

export async function handleApiResponse(response: AxiosResponse) {
  console.log("response", response);
  if (response.data?.data) {
    return response.data.data;
  } else {
    throw new Error("Internal Error");
  }
}

export async function handleApiError(err: AxiosError) {
  console.log("err in middleware", err);
}

const fetcherWithToken: any = (url: string, method: string, data) => {
  return axios({
    method,
    url,
    data: method !== "get" ? data : undefined,
    headers: { Authorization: "Bearer " + storage.getToken() },
  })
    .then(handleApiResponse)
    // .catch(handleApiError);
};

export async function createCodes(data: CreateBatchCodesRequest): Promise<any> {
  return fetcherWithToken(`${Constants.API_URL}/${endpoint}/batch`, "post", data);
}

export async function redeemCode(data: CreateBatchCodesRequest): Promise<any> {
  return fetcherWithToken(`${Constants.API_URL}/${endpoint}/redeem`, "post", data);
}

export async function updateCode(data): Promise<any> {
  return fetcherWithToken(`${Constants.API_URL}/${endpoint}/${data.id}`, 'patch', data);
}

export async function deleteCode(id: string): Promise<any> {
  return fetcherWithToken(`${Constants.API_URL}/${endpoint}/${id}`, "delete");
}

export async function getAllCodes(): Promise<GetAllCodesResponse> {
  return fetcherWithToken(`${Constants.API_URL}/${endpoint}`, "get");
}
