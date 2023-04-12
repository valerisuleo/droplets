import axios from 'axios';
import { HttpService } from '../../services/http-service';
import { environment } from '../../../environments/environment';

class MoviesService extends HttpService {
    constructor() {
        super(
            `${environment.config.api.express.baseUrl}/movies`,
            axios.create()
        );
    }
}

export const moviesService = new MoviesService();
