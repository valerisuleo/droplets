/* eslint-disable @typescript-eslint/no-empty-function */
import { useState } from 'react';
import ListGroup from '../../../../libs/list-group/list-group';
import Spinner from '../../../../libs/spinner/spinner';
import usePosts from '../../hooks/usePosts';

const PostsIndex = () => {
    const { data: posts, error, isLoading } = usePosts();

    if (isLoading) {
        return <Spinner color={'primary'} />; // Suspense does not work with react query
    }

    if (error) {
        return <p>{error['originalError']?.message}</p>;
    }
    return (
        <div>
            <h1>React Query</h1>
            {posts?.length && (
                <ListGroup
                    collection={posts}
                    propKey={'id'}
                    propText={'title'}
                    onEmitEvent={() => {}}
                />
            )}
        </div>
    );
};

export default PostsIndex;
