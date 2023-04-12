/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useEffect, Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { AppError } from '../../../errors/app-error';
import { moviesService } from '../services/movies-service';
import ListGroup from '../../../libs/list-group/list-group';
import { IMovie } from '../interfaces';

const MoviesIndex = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    useEffect(() => {
        getMovies();
    }, []);

    function getMovies(): void {
        moviesService
            .getAll()
            .then((response) => {
                const movies: IMovie[] = response.data;
                setMovies(movies);
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
                    <h2 className="pb-4">Movies List</h2>
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
