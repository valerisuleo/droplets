import { useState } from 'react';
import Alert from '../../libs/alert/alert';
import { IAlert } from '../../libs/alert/interfaces';
import Button from '../../libs/button/button';
import { IBtn } from '../../libs/button/interfaces';
import ListGroup from '../../libs/list-group/list-group';
import { IUser, users } from './mock';

const BuildingComponents = () => {
    const [alertVisible, setAlerShow] = useState(false);

    const handleSelection = (current: IUser) => {
        console.log(current);
    };

    const handleClick = () => {
        setAlerShow(true);
    };

    const handleDismissing = () => {
        setAlerShow(false);
    };

    const alertProps: IAlert = {
        classes: 'info',
        children: '', // this works like ng-template
        dismissing: {
            classes: 'alert-dismissible fade show',
            isDismissible: true,
            onEmitEvent: handleDismissing,
        },
    };

    // ________________________BTNS________________________
    const btnProps: IBtn = {
        type: 'button',
        label: 'Show Alert',
        onEmitEvent: handleClick,
        classes: {
            size: 'md',
            contextual: 'danger',
        },
    };


    return (
        <div className="mt-3">
            {alertVisible && (
                <section>
                    <h2>Alert component</h2>
                    <div className="m-5">
                        <Alert {...alertProps}>
                            <p>
                                <span>
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Deleniti dolorem alias
                                    quibusdam nihil tempore eligendi, corporis,
                                    atque facere molestias beatae laborum nobis
                                    repellat laudantium, soluta ducimus?
                                    Exercitationem id neque perferendis!
                                </span>
                            </p>
                        </Alert>
                    </div>
                </section>
            )}
            <Button {...btnProps} />
            <section>
                <h2 className="my-5">List group component</h2>
                <ListGroup
                    collection={users}
                    propKey={'id'}
                    propText={'name'}
                    onEmitEvent={handleSelection}
                />
            </section>
        </div>
    );
};

export default BuildingComponents;
