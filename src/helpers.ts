import axios, { AxiosInstance } from "axios";

import CryptoJS from "crypto-js";
import humps from "humps";

const { camelizeKeys } = humps;

export const getLinkData = async <Data>(
	link: string | undefined,
): Promise<Data | undefined> => {
	if (!link) return undefined;

	const response = await axios.get(link);

	if (!response.data) return undefined;

	return camelizeKeys(response.data) as Data;
};

export const getData = async <
	Data = Record<string, unknown>,
	Parameters = void,
>(
	axiosInstance: AxiosInstance,
	endpoint: string,
	params?: Parameters | Record<string, unknown>,
): Promise<Data | undefined> => {
	const { data } = await axiosInstance.get(endpoint, { params });

	return await getLinkData<Data>(data?.link);
};

export const encryptPassword = (email: string, password: string) =>
	CryptoJS.enc.Base64.stringify(
		CryptoJS.SHA256(password + email.toLowerCase()),
	);
