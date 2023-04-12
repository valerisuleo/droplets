import axios from 'axios';
import { HttpService } from '../../services/http-service';
import { environment } from '../../../environments/environment';

class GameService extends HttpService {
    constructor() {
        super(
            `${environment.config.api.rawg.baseUrl}/games`,
            axios.create({
                params: {
                    key: `${environment.config.api.rawg.key}`,
                },
            })
        );
    }
}

export const gameService = new GameService();
