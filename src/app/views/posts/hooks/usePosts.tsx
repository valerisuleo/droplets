import { AxiosResponse } from 'axios';
import { postsService } from '../services/posts';
import { useQuery } from '@tanstack/react-query';
import { IPosts } from '../interfaces';

const usePosts = (queryParams?: string) => {
    const getTodos = () =>
        postsService
            .get(queryParams)
            .then((res: AxiosResponse<IPosts[]>) => res.data);

    return useQuery<IPosts[], Error>({
        queryKey: ['users', queryParams, 'posts'],
        queryFn: getTodos,
        staleTime: 5 * 1000, // 5sec
    });
};

export default usePosts;
