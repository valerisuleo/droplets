import { useQueryClient, useMutation } from '@tanstack/react-query';
import { IPosts } from '../interfaces';
import { postsService } from '../services/posts';

function useAddPost() {
    const addPostFn = (payload: IPosts) =>
        postsService.post(payload).then((res) => res.data);
    const queryClient = useQueryClient();

    const addPost = useMutation<IPosts, Error, IPosts>(addPostFn, {
        onSuccess: (payload: IPosts) => {
            queryClient.setQueriesData<IPosts[]>(['users'], (posts) => [
                payload,
                ...posts,
            ]);
        },
    });

    return addPost;
}

export default useAddPost;
