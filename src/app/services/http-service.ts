/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AppError } from '../errors/app-error';
import { NotFoundError } from '../errors/not-found-error';
import { toast } from 'react-toastify';

class HttpService {
    constructor() {
        this.errorsIntereptor();
    }

    // _________________________________CRUD_________________________________
    public getAll(url: string, queryParams?: string): Promise<AxiosResponse> {
        const result: string = queryParams ? `${url}${queryParams}` : url;
        return axios.get(result);
    }

    public post(url: string, payload: any): Promise<AxiosResponse> {
        return axios.post(url, payload);
    }

    public put(
        url: string,
        resource: any,
        key: string
    ): Promise<AxiosResponse> {
        return axios.put(`${url}/${resource[key]}`, resource);
    }

    public deleteItem(
        url: string,
        resource: any,
        key: string
    ): Promise<AxiosResponse> {
        return axios.delete(`${url}/${resource[key]}`);
    }

    // __________________________HANDLING ERRORS__________________________
    private errorsIntereptor(): void {
        axios.interceptors.response.use(null, (error: AxiosError) => {
            const { status } = error.response || {};
            const expectedError: boolean = status >= 400 && status < 500;

            if (!expectedError) {
                toast.error('Oops...unexpected error!');
            } else {
                throw this.handleError(error);
            }

            return Promise.reject(new AppError(error));
        });
    }

    private handleError(error: AxiosError): AppError {
        if (error.response?.status === 404) {
            return new NotFoundError(error);
        } else {
            return new AppError(error);
        }
    }
}

export default new HttpService();
