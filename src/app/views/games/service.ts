import axios, { Axios } from 'axios';
import { HttpService } from '../../services/http-service';
import { environment } from '../../../environments/environment';

class GameService extends HttpService {
    constructor(http: Axios) {
        super(`${environment.config.api.rawg.baseUrl}/games`, http);
    }
}
const axiosInstance = axios.create({
    params: {
        key: `${environment.config.api.rawg.key}`,
    },
});

export const gameService = new GameService(axiosInstance);
