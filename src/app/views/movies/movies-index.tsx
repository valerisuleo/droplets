/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useEffect, Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { AppError } from '../../errors/app-error';
import { moviesService } from './service';
import ListGroup from '../../libs/list-group/list-group';

const MoviesIndex = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        getMovies();
    }, []);

    function getMovies(): void {
        moviesService
            .getAll()
            .then(({ data }) => {
                setMovies(data);
            })
            .catch((error: AppError) => {
                console.log('err', error);
            });
    }

    return (
        <Fragment>
            <ToastContainer />
            {movies.length ? (
                <div className="my-3">
                    <h2>Movies List</h2>
                    <ListGroup
                        collection={movies}
                        propKey={'id'}
                        propText={'title'}
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        onEmitEvent={() => {}}
                    />
                </div>
            ) : null}
        </Fragment>
    );
};

export default MoviesIndex;
