import axios, { Axios } from 'axios';
import { HttpService } from '../../services/http-service';
import { environment } from '../../../environments/environment';

class MoviesService extends HttpService {
    constructor(http: Axios) {
        super(`${environment.config.api.express.baseUrl}/movies`, http);
    }
}
const axiosInstance = axios.create();
export const moviesService = new MoviesService(axiosInstance);
