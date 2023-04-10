import HttpService from './http-service';
import axios, { AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { NotFoundError } from '../errors/not-found-error';
import { AppError } from '../errors/app-error';

// Mock axios
const mock = new MockAdapter(axios);

describe('HttpService', () => {
    afterEach(() => {
        mock.reset();
    });

    it('should make a GET request and return data', async () => {
        const url = 'https://api.example.com/data';
        const responseData = { data: 'test data' };
        mock.onGet(url).reply(200, responseData);

        const response: AxiosResponse = await HttpService.getAll(url);
        expect(response.data).toEqual(responseData);
    });

    it('should make a POST request and return data', async () => {
        const url = 'https://api.example.com/data';
        const payload = { key: 'value' };
        const responseData = { data: 'created data' };
        mock.onPost(url).reply(200, responseData);

        const response: AxiosResponse = await HttpService.post(url, payload);
        expect(response.data).toEqual(responseData);
    });

    it('should make a PUT request and return data', async () => {
        const url = 'https://api.example.com/data';
        const resource = { id: 1, key: 'value' };
        const key = 'id';
        const responseData = { data: 'updated data' };
        mock.onPut(`${url}/${resource[key]}`).reply(200, responseData);

        const response: AxiosResponse = await HttpService.put(
            url,
            resource,
            key
        );
        expect(response.data).toEqual(responseData);
    });

    it('should make a DELETE request and return data', async () => {
        const url = 'https://api.example.com/data';
        const resource = { id: 1, key: 'value' };
        const key = 'id';
        const responseData = { data: 'deleted data' };
        mock.onDelete(`${url}/${resource[key]}`).reply(200, responseData);

        const response: AxiosResponse = await HttpService.deleteItem(
            url,
            resource,
            key
        );
        expect(response.data).toEqual(responseData);
    });

    it('should throw a NotFoundError for a 404 error', async () => {
        const url = 'https://api.example.com/invalid-url';
        mock.onGet(url).reply(404);

        try {
            await HttpService.getAll(url);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundError);
        }
    });

    it('should throw an AppError for other errors', async () => {
        const url = 'https://api.example.com/data';
        mock.onGet(url).reply(500);

        try {
            await HttpService.getAll(url);
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
        }
    });
});
