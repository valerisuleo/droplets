import { AxiosResponse } from 'axios';
import { postsService } from '../services/posts';
import { useQuery } from '@tanstack/react-query';
import { IPosts } from '../interfaces';

const usePagination = (queryParams?: string) => {
    const getPosts = () =>
        postsService
            .get(queryParams)
            .then((res: AxiosResponse<IPosts[]>) => res.data);

    return useQuery<IPosts[], Error>({
        queryKey: ['posts', queryParams],
        queryFn: getPosts,
        staleTime: 5 * 1000, // 5sec
        keepPreviousData: true // no jumping when we load the next batch. Awesome!
    });
};



export default usePagination;
