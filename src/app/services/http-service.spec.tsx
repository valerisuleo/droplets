import { HttpService } from './http-service';
import axios, { AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { NotFoundError } from '../errors/not-found-error';
import { AppError } from '../errors/app-error';

describe('HttpService', () => {
    const url = 'https://api.example.com/data';
    const mockHttp = axios.create();
    const mock = new MockAdapter(mockHttp);
    const httpService = new HttpService(url, mockHttp);

    afterEach(() => {
        mock.reset();
    });

    it('should make a GET request and return data', async () => {
        const responseData = { data: 'test data' };
        mock.onGet(url).reply(200, responseData);

        const response: AxiosResponse = await httpService.get();
        expect(response.data).toEqual(responseData);
    });

    it('should make a GET request with query params and return data', async () => {
        const queryParams = '?name=test';
        const responseData = { data: 'test data' };
        mock.onGet(`${url}${queryParams}`).reply(200, responseData);

        const response: AxiosResponse = await httpService.get(queryParams);
        expect(response.data).toEqual(responseData);
    });

    it('should make a POST request and return data', async () => {
        const payload = { key: 'value' };
        const responseData = { data: 'created data' };
        mock.onPost(url).reply(200, responseData);

        const response: AxiosResponse = await httpService.post(payload);
        expect(response.data).toEqual(responseData);
    });

    it('should make a PUT request and return data', async () => {
        const resource = { id: 1, key: 'value' };
        const responseData = { data: 'updated data' };
        mock.onPut(`${url}/${resource.id}`).reply(200, responseData);

        const response: AxiosResponse = await httpService.put(resource, 'id');
        expect(response.data).toEqual(responseData);
    });

    it('should make a DELETE request and return data', async () => {
        const resource = { id: 1, key: 'value' };
        const responseData = { data: 'deleted data' };
        mock.onDelete(`${url}/${resource.id}`).reply(200, responseData);

        const response: AxiosResponse = await httpService.deleteItem(
            resource,
            'id'
        );
        expect(response.data).toEqual(responseData);
    });

    it('should throw a NotFoundError for a 404 error', async () => {
        mock.onGet(url).reply(404);

        try {
            await httpService.get();
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundError);
        }
    });

    it('should throw an AppError for other errors', async () => {
        mock.onGet(url).reply(500);

        try {
            await httpService.get();
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
        }
    });
});
