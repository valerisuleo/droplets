import { AxiosResponse } from 'axios';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { gameService } from '../services/games';

const useFetchData = (queryKey: QueryKey, queryParams?: string) => {
    const getAll = () =>
        gameService
            .get(queryParams)
            .then((res: AxiosResponse<any[]>) => res.data['results']);

    return useQuery<any[], Error>({
        queryKey,
        queryFn: getAll,
        // staleTime: 5 * 1000, // 5sec
        retry: 2
    });
};

export default useFetchData;

