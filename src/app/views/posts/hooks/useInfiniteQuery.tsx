import { AxiosResponse } from 'axios';
import { postsService } from '../services/posts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { IPosts } from '../interfaces';

const useInfinitePagination = (queryParams?: string) => {
    const getPosts = () =>
        postsService
            .get(queryParams)
            .then((res: AxiosResponse<IPosts[]>) => res.data);

    return useInfiniteQuery<IPosts[], Error>({
        queryKey: ['posts', queryParams],
        queryFn: getPosts,
        staleTime: 5 * 1000, // 5sec
        getNextPageParam: (lastPage, allPages) => {
            // return the nextPage number 1 -> 2
            return lastPage.length ? allPages.length + 1 : undefined;
        },
    });
};

export default useInfinitePagination;
