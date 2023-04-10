import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import { IFormCtrl } from '../../libs/forms/hook/interfaces';
import { useReactiveForm } from '../../libs/forms/hook/useReactiveForm';
import ListGroup from '../../libs/list-group/list-group';

const BuildingForms = () => {
    const schema = {
        title: '',
        // numberInStock: '',
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
        { label: 'Comedy', id: '5b21ca3eeb7f6fbccd471814', value: 'comedyLab' },
    ];


 

    const [ctrls, setCtrls] = useState<IFormCtrl[]>([]);
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

    async function getMovies(): Promise<void> {
        const promise = axios.get('http://localhost:3000/movies');
        const response = await promise;
        setMovies(response.data);
    }

    async function createMovie(): Promise<void> {
        const genre = genres.find((item) => item.id === formGroup.genre);
        const payload = { ...formGroup, genre };
        const promise = axios.post('http://localhost:3000/movies', payload);
        const response = await promise;
        const listUpdated = [response.data, ...movies];
        setMovies(listUpdated);
    }

    async function getCrls(): Promise<void> {
        const promise = axios.get('http://localhost:3000/movies-form');
        const response = await promise;
        // console.log(response.data);
        setCtrls(response.data);
    }

    function doSubmit(): void {
        createMovie();
    }

    useEffect(() => {
        getMovies();
        getCrls();
    }, []);

    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
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
                <button type="submit" className="btn btn-primary mb-3">
                    Submit
                </button>
            </form>

            <p>
                <strong>Form group object: </strong>
                {JSON.stringify(formGroup)}
            </p>

            <div className="my-3">
                <ListGroup
                    collection={movies}
                    propKey={'id'}
                    propText={'title'}
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onEmitEvent={() => {}}
                />
            </div>
        </Fragment>
    );
};

export default BuildingForms;
