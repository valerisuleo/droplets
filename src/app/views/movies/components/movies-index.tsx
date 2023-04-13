/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useEffect, Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { AppError } from '../../../errors/app-error';
import { moviesService } from '../services/movies-service';
import ListGroup from '../../../libs/list-group/list-group';
import { IMovie } from '../interfaces';
import Alert from '../../../libs/alert/alert';
import { IAlert } from '../../../libs/alert/interfaces';

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
            ) : (
                <Alert classes={'warning'}>
                    <p>
                        Here we are fetching data from a local express
                        server... To fetch some data move to the{' '}
                        <strong>Games</strong> section on the navbar!
                    </p>
                </Alert>
            )}
            <ToastContainer />
        </Fragment>
    );
};

export default MoviesIndex;
