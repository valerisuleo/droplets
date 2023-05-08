/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Fragment, useCallback, useEffect, useState } from 'react';
import { ICard } from '../../../libs/cards/ intefaces';
import { IFormCtrl } from '../../../libs/forms/hook/interfaces';
import { useReactiveForm } from '../../../libs/forms/hook/useReactiveForm';
import { IGame, IGenre } from '../interfaces';
import { IBtn } from '../../../libs/button/interfaces';
import Hero from '../../../libs/hero/hero';
import Card from '../../../libs/cards/card';
import Button from '../../../libs/button/button';
import ListGroup from '../../../libs/list-group/list-group';
import useFetchData from '../hooks/useReactQuery';

const GameIndexReactQuery = () => {
    // ___________________FORM: SELECTS___________________
    const schema = {
        platforms: '',
        sorting: '',
    };

    const [ctrls, setControllers] = useState<IFormCtrl[]>([
        {
            type: 'select',
            name: 'platforms',
            label: 'Filter by platform',
            validators: [],
            options: [],
            id: '1',
        },
        {
            type: 'select',
            name: 'sorting',
            label: 'Sort by',
            validators: [],
            options: [
                {
                    id: 'name',
                    name: 'Name',
                },
                {
                    id: '-added',
                    name: 'Date added',
                },
                {
                    id: '-released',
                    name: 'Date released',
                },
                {
                    id: '-metacritic',
                    name: 'Popularity',
                },
                {
                    id: '-rating',
                    name: 'Average rating',
                },
            ],
            id: '2',
        },
    ]);
    const [
        formGroup,
        errorValidation,
        handleChange,
        handleBlur,
        handleSubmit,
        renderInput,
        renderCheckbox,
        renderSelect,
    ] = useReactiveForm(schema, null, doChange);

    // _____________________API CALLS_____________________
    const [queryParams, setQueryParams] = useState('');

    const genresConfig = {
        key: 'genres',
        params: '/genres',
    };
    const platformsConfig = {
        key: 'platforms',
        params: '/platforms',
    };
    const gamesConfig = {
        key: 'games',
        params: queryParams || '/games',
    };

    // Key: ['games', params],

    const getGames = useFetchData(
        [gamesConfig.key, gamesConfig.params],
        gamesConfig.params
    );
    const getGenres = useFetchData(
        [genresConfig.key, genresConfig.params],
        genresConfig.params
    );

    const getPlatforms = useFetchData(
        [platformsConfig.key, platformsConfig.params],
        platformsConfig.params
    );

    const updateControllers = useCallback(() => {
        if (getPlatforms.isSuccess) {
            setControllers((state) => {
                const clone = [...state];
                clone[0].options = getPlatforms.data;
                return clone;
            });
        }
    }, [getPlatforms.data, getPlatforms.isSuccess]);

    useEffect(() => {
        updateControllers();
    }, [updateControllers]);

    function doChange(current): void {
        if (current.name === 'sorting') {
            const id = current.value;
            setQueryParams(`/games?ordering=${id}`);
        } else {
            const id = formGroup.platforms;
            setQueryParams(`/games?platforms=${id}`);
        }
    }

    const handleFilterByGenre = (current: IGenre) => {
        const id = current.id;
        setQueryParams(`/games?platforms=${id}`);
    };

    // __________________________OTHER__________________________
    const cardProps = (item: IGame): ICard => {
        return {
            header: {
                children: (
                    <img
                        src={item.background_image}
                        className="card-img-top"
                        alt="..."
                    />
                ),
            },
            body: {
                cardTitle: `${item.name}`,
                children: null,
            },
            classes: {
                equalHeight: true,
            },
        };
    };

    const hadleClick = () => null;

    const btnProps: IBtn = {
        label: 'Shop now',
        onEmitEvent: hadleClick,
        type: 'button',
        classes: {
            contextual: 'primary',
            size: 'md',
        },
    };

    return (
        <Fragment>
            <section className="my-4">
                <Hero variant={'background'} backgroundColor="pink">
                    <h1 className="my-5">I need an hero!</h1>
                    <Button {...btnProps}></Button>
                </Hero>
            </section>

            <div className="row">
                <aside className="col-md-3">
                    {getGenres.data?.length && (
                        <ListGroup
                            collection={getGenres.data}
                            propKey={'id'}
                            propText={'name'}
                            onEmitEvent={handleFilterByGenre}
                        ></ListGroup>
                    )}
                </aside>
                <section className="col-md-9">
                    <div className="row">
                        <div className="form-group my-3">
                            {ctrls.length ? (
                                <div className="d-inline-flex p-2">
                                    {ctrls.map((controller: IFormCtrl) => (
                                        <Fragment key={controller.id}>
                                            {controller.type === 'select' ? (
                                                <div className="ms-3">
                                                    {renderSelect(
                                                        controller,
                                                        handleChange,
                                                        formGroup,
                                                        'id',
                                                        'name'
                                                    )}
                                                </div>
                                            ) : null}
                                        </Fragment>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {getGames.data?.length &&
                            getGames.data.map((item: IGame) => {
                                const props = cardProps(item);
                                return (
                                    <div className="col" key={item.id}>
                                        <Card
                                            header={props.header}
                                            body={props.body}
                                            classes={props.classes}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </section>
            </div>
        </Fragment>
    );
};

export default GameIndexReactQuery;
