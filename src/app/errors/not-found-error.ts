import { AxiosError } from 'axios';
import { AppError } from './app-error';

export class NotFoundError extends AppError {
    public message = 'We can use custom message to notify 404!';
    constructor(public originalError?: AxiosError) {
        super();
        console.log('originalError', originalError);
    }
}
