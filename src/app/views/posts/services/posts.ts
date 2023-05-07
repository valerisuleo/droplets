import axios from 'axios';
import { HttpService } from '../../../services/http-service';
import { environment } from '../../../../environments/environment';

class PostsService extends HttpService {
    constructor() {
        super(
            `${environment.config.api.jsonplaceholder.baseUrl}/posts`,
            axios.create()
        );
    }
}

export const postsService = new PostsService();
