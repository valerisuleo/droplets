/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, AxiosResponse, Axios } from 'axios';
import { AppError } from '../errors/app-error';
import { NotFoundError } from '../errors/not-found-error';
import { toast } from 'react-toastify';

export class HttpService {
    constructor(private url: string, private http: Axios) {
        this.errorsIntereptor();
    }

    // _________________________________CRUD_____________________________
    public get(queryParams?: string): Promise<AxiosResponse> {
        const url = queryParams ? `${this.url}${queryParams}` : this.url;
        return this.http.get(url);
    }

    public post(payload: any): Promise<AxiosResponse> {
        return this.http.post(this.url, payload);
    }

    public put(resource: any, key: string): Promise<AxiosResponse> {
        return this.http.put(`${this.url}/${resource[key]}`, resource);
    }

    public deleteItem(resource: any, key: string): Promise<AxiosResponse> {
        return this.http.delete(`${this.url}/${resource[key]}`);
    }

    // __________________________HANDLING ERRORS__________________________
    private errorsIntereptor(): void {
        this.http.interceptors.response.use(null, (error: AxiosError) => {
            const { status } = error.response || {};
            const expectedError: boolean = status >= 400 && status < 500;

            if (!expectedError) {
                toast.error('Oops...unexpected error!');
                return Promise.reject(new AppError(error));
            } else {
                throw this.handleError(error);
            }
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
