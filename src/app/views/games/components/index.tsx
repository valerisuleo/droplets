/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Fragment, useContext, useEffect, useState } from 'react';
import { gameService } from '../services/games';
import { AppError } from '../../../errors/app-error';
import { ICard } from '../../../libs/cards/ intefaces';
import { IFormCtrl } from '../../../libs/forms/hook/interfaces';
import { useReactiveForm } from '../../../libs/forms/hook/useReactiveForm';
import { IGame, IGameQuery, IGenre } from '../interfaces';
import { IBtn } from '../../../libs/button/interfaces';
import { AxiosResponse } from 'axios';
import Hero from '../../../libs/hero/hero';
import Card from '../../../libs/cards/card';
import Button from '../../../libs/button/button';
import ListGroup from '../../../libs/list-group/list-group';

const GameIndex = () => {
    const schema = {
        platforms: '',
        sorting: '',
    };
    
    const [data, setData] = useState<IGameQuery>({} as IGameQuery);
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
                    // id: '5b21ca3eeb7f6fbccd471818',
                    id: 'name',
                    name: 'Name',
                },
                {
                    // id: '5b21ca3eeb7f6fbccd471819',
                    id: '-added',
                    name: 'Date added',
                },
                {
                    // id: '5b21ca3eeb7f6fbccd471817',
                    id: '-released',
                    name: 'Date released',
                },
                {
                    // id: '5b21ca3eeb7f6fbccd471816',
                    id: '-metacritic',
                    name: 'Popularity',
                },
                {
                    // id: '5b21ca3eeb7f6fbccd471815',
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

    useEffect(() => {
        console.clear();
        getGames();
        getGenres();
        getPlatforms();
    }, []);

    function getGames(): void {
        gameService
            .get('/games')
            .then((response: AxiosResponse) => {
                setData((prevData) => ({
                    ...prevData,
                    games: response.data.results,
                }));
            })
            .catch(() => {});
    }

    function getGenres(): void {
        gameService
            .get('/genres')
            .then((response: AxiosResponse) => {
                setData((prevData) => ({
                    ...prevData,
                    genres: response.data.results,
                }));
            })
            .catch(() => {});
    }

    function getPlatforms() {
        gameService
            .get('/platforms')
            .then((response: AxiosResponse) => {
                setControllers((state) => {
                    const clone = [...state];
                    clone[0].options = response.data.results;
                    return clone;
                });
            })
            .catch(() => {});
    }

    function gamesQuery(queryParams?: string, id?: number): void {
        gameService
            .get(`/games?${queryParams}=${id}`)
            .then((response: AxiosResponse) => {
                setData((prevData) => ({
                    ...prevData,
                    games: response.data.results,
                }));
            })
            .catch(() => {});
    }

    function doChange(current): void {
        if (current.name === 'sorting') {
            const id = current.value;
            gamesQuery('ordering', id);
        } else {
            const id = formGroup.platforms;
            gamesQuery('platforms', id);
        }
    }

    const handleFilterByGenre = (current: IGenre) => {
        const id = current.id;
        gamesQuery('genres', id);
    };

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
                    {data.genres?.length && (
                        <ListGroup
                            collection={data.genres}
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
                        {data.games?.length &&
                            data.games.map((item: IGame) => {
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

export default GameIndex;
