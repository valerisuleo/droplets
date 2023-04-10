import { AxiosError } from 'axios';
import { AppError } from './app-error';

export class NotFoundError extends AppError {
    public message = 'Custom Message';
    constructor(public originalError?: AxiosError) {
        super();
        console.log('originalError', originalError);
    }
}
