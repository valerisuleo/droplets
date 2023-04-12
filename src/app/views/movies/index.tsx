/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useEffect, Fragment } from 'react';
import { IFormCtrl } from '../../libs/forms/hook/interfaces';
import { useReactiveForm } from '../../libs/forms/hook/useReactiveForm';
import ListGroup from '../../libs/list-group/list-group';
import { ToastContainer } from 'react-toastify';
import { AppError } from '../../errors/app-error';
import { moviesService } from './service';
const BuildingForms = () => {
    const schema = {
        title: '',
        // numberInStock: '',
        dailyRentalRate: '',
        liked: '',
        genre: '',
    };

    // _______________________________HOOKS_______________________________
    const [ctrls, setControllers] = useState<IFormCtrl[]>([]);
    const [movies, setMovies] = useState([]);
    const [
        formGroup,
        errorValidation,
        handleChange,
        handleBlur,
        handleSubmit,
        renderInput,
        renderCheckbox,
        renderSelect,
    ] = useReactiveForm(schema, doSubmit);

    useEffect(() => {
        getMovies();
        getFormControllers();
    }, []);

    // ______________________________MOVIES______________________________
    const genres = [
        {
            label: 'Thriller',
            id: '5b21ca3eeb7f6fbccd471820',
            value: 'thrillerJackson',
        },
        {
            label: 'Action',
            id: '5b21ca3eeb7f6fbccd471818',
            value: 'actionsModern',
        },
        {
            label: 'Comedy',
            id: '5b21ca3eeb7f6fbccd471814',
            value: 'comedyLab',
        },
    ];

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

    function createMovie(): void {
        const genre = genres.find((item) => item.id === formGroup.genre);
        const payload = { ...formGroup, genre };
        moviesService
            .post(payload)
            .then(({ data }) => {
                const listUpdated = [data, ...movies];
                setMovies(listUpdated);
            })
            .catch((error: AppError) => {});
    }

    // ________________________________FORM________________________________
    function getFormControllers(): void {
        moviesService
            .getAll('/form')
            .then(({ data }) => {
                setControllers(data);
            })
            .catch((error: AppError) => {});
    }

    function doSubmit(): void {
        createMovie();
    }

    return (
        <Fragment>
            <ToastContainer />

            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    {ctrls.length ? (
                        <div>
                            {ctrls.map((controller: IFormCtrl) => (
                                <Fragment key={controller.id}>
                                    {controller.type === 'select' ? (
                                        <div className="mb-3">
                                            {renderSelect(
                                                controller,
                                                handleChange,
                                                formGroup,
                                                'id',
                                                'label'
                                            )}
                                        </div>
                                    ) : null}
                                    {controller.type === 'text' ? (
                                        <div className="mb-3">
                                            {renderInput(
                                                controller,
                                                handleChange,
                                                handleBlur,
                                                formGroup,
                                                errorValidation
                                            )}
                                        </div>
                                    ) : null}
                                    {controller.type === 'checkbox' ? (
                                        <div className="mb-3">
                                            {renderCheckbox(
                                                controller,
                                                handleChange,
                                                formGroup
                                            )}
                                        </div>
                                    ) : null}
                                </Fragment>
                            ))}
                        </div>
                    ) : null}
                </div>
                <button type="submit" className="btn btn-primary mb-3">
                    Submit
                </button>
            </form>

            <p>
                <strong>Form group object: </strong>
                {/* {JSON.stringify(formGroup)} */}
            </p>

            {movies.length ? (
                <div className="my-3">
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

export default BuildingForms;
