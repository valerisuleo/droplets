/* eslint-disable @typescript-eslint/no-empty-function */
import ListGroup from '../../../../libs/list-group/list-group';
import useInfinitePagination from '../../hooks/useInfiniteQuery';

const InfiniteQueries = () => {
    const pageSize = 10;
    const queryParams = `?_start=1&_limit=${pageSize}`;
    const { data, fetchNextPage, isFetchingNextPage } =
        useInfinitePagination(queryParams);

    const flattenedData = data?.pages?.flat() || [];

    return (
        <div>
            <h1>React Query: InfiniteQueries</h1>
            {data && flattenedData?.length && (
                <div>
                    <ListGroup
                        collection={flattenedData}
                        propKey={'id'}
                        propText={'title'}
                        onEmitEvent={() => {}}
                    />
                    <button
                        className="btn btn-primary my-3"
                        disabled={isFetchingNextPage}
                        onClick={() => fetchNextPage()}
                    >
                        Load more...
                    </button>{' '}
                </div>
            )}
        </div>
    );
};

export default InfiniteQueries;
