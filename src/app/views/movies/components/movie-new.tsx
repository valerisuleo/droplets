/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useEffect, Fragment } from 'react';
import { IFormCtrl } from '../../../libs/forms/hook/interfaces';
import { useReactiveForm } from '../../../libs/forms/hook/useReactiveForm';
import { AppError } from '../../../errors/app-error';
import { moviesService } from '../services/movies-service';
import { useNavigate } from 'react-router-dom';
import { IMovie } from '../interfaces';

const MovieNew = () => {
    const navigateTo = useNavigate();
    const schema = {
        title: '',
        numberInStock: '',
        dailyRentalRate: '',
        liked: '',
        genre: '',
    };

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

    const [ctrls, setControllers] = useState<IFormCtrl[]>([]);
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
        getFormControllers();
    }, []);

    function getFormControllers(): void {
        moviesService
            .get('/form')
            .then(({ data }) => setControllers(data))
            .catch((error: AppError) => {});
    }

    function createMovie(): void {
        const genre = genres.find((item) => item.id === formGroup.genre);
        const payload: IMovie = { ...formGroup, genre };

        moviesService
            .post(payload)
            .then(() => navigateTo('/movies'))
            .catch((error: AppError) => {});
    }

    function doSubmit(): void {
        createMovie();
    }

    return (
        <div>
            <h2>New Movie</h2>
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
                {JSON.stringify(formGroup)}
            </p>
        </div>
    );
};

export default MovieNew;
