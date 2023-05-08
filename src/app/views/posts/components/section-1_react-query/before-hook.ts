// BEFORE MOVING LOGIC INTO THE usePosts.tsx

// import { useQuery } from '@tanstack/react-query';
// import { postsService } from '../services/todos';
// import { AxiosResponse } from 'axios';
// import ListGroup from '../../../libs/list-group/list-group';
// import Spinner from '../../../libs/spinner/spinner';

// export interface IPosts {
//     userId: number;
//     id: number;
//     title: string;
//     completed: boolean;
// }

// const PostsIndex = () => {

//     const getPosts = () =>
//         postsService
//             .get('/todos')
//             .then((res: AxiosResponse<IPosts[]>) => res.data);

//     const { data: todos, error, isLoading } = useQuery<IPosts[], Error>({
//         queryKey: ['todos'],
//         queryFn: getPosts,
//     });

//     if (isLoading) {
//         return <Spinner color={'primary'} />;
//     }


//     if (error) {
//         return <p>{error['originalError'].message}</p>;
//     }
//     return (
//         <div>
//             <h1>React Query</h1>
//             {todos?.length && (
//                 <ListGroup
//                     collection={todos}
//                     propKey={'id'}
//                     propText={'title'}
//                     onEmitEvent={() => {}}
//                 />
//             )}
//         </div>
//     );
// };

// export default PostsIndex;
