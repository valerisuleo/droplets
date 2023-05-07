/* eslint-disable @typescript-eslint/no-empty-function */
import { Fragment, useState } from 'react';
import ListGroup from '../../../../libs/list-group/list-group';
import usePosts from '../../hooks/usePosts';

const PostsShow = () => {
    const [userId, setUserId] = useState<number>();
    const { data: posts } = usePosts(userId ? `?userId=${userId}` : '');

    return (
        <div>
            <h1>React Query</h1>
            {posts?.length && (
                <Fragment>
                    <div className="d-inline-flex p-2">
                        <select
                            className="form-control mb-3"
                            onChange={(e) => setUserId(+e.target.value)}
                            value={userId}
                        >
                            <option value="">Get posts by userId</option>
                            <option value="1">User 1</option>
                            <option value="2">User 2</option>
                            <option value="3">User 3</option>
                        </select>
                    </div>
                    <ListGroup
                        collection={posts}
                        propKey={'id'}
                        propText={'title'}
                        onEmitEvent={() => {}}
                    />
                </Fragment>
            )}
        </div>
    );
};

export default PostsShow;
