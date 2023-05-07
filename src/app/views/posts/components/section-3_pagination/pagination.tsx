/* eslint-disable @typescript-eslint/no-empty-function */
import { useState } from 'react';
import ListGroup from '../../../../libs/list-group/list-group';
import usePagination from '../../hooks/usePagination';

const PaginatedQueries = () => {
    // https://jsonplaceholder.typicode.com/posts?_start=0&_limit=10

    const pageSize = 10;
    const [page, setPage] = useState(1);
    const queryParams = `?_start=${(page - 1) * pageSize}&_limit=${pageSize}`;
    const { data: posts } = usePagination(queryParams);

    return (
        <div>
            <h1>React Query: PaginatedQueries</h1>
            {posts?.length && (
                <div>
                    <ListGroup
                        collection={posts}
                        propKey={'id'}
                        propText={'title'}
                        onEmitEvent={() => {}}
                    />
                    <div className="m-3">
                        <button
                            className="btn btn-primary btn-sm me-2"
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Prev
                        </button>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaginatedQueries;
