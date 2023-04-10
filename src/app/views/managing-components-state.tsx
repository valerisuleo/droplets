import { useState } from 'react';
import Button from '../libs/button/button';
import { IBtn } from '../libs/button/interfaces';
import { users } from './mock';

const ManagingComponentsState = () => {
    const user = {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874',
            geo: {
                lat: '-37.3159',
                lng: '81.1496',
            },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
            name: 'Romaguera-Crona',
            catchPhrase: 'Multi-layered client-server neural-net',
            bs: 'harness real-time e-markets',
        },
    };

    const [contact, setContact] = useState(user);
    const [contacts, setContacts] = useState(users);
    const [cart, setCart] = useState({
        discount: 0.1,
        items: [
            {
                id: 1,
                title: 'HIMYM',
                quantity: 22,
            },
            {
                id: 2,
                title: 'TBBT',
                quantity: 12,
            },
        ],
    });

    const handleClick = () => {
        // _____________________UPDDATING OBJ_____________________
        // ME
        const clone = { ...contact };
        clone.name = 'Jack the ripper';
        clone.address.zipcode = '00144';
        setContact(clone);

        // REFACTOR
        // setContact({
        //     ...contact,
        //     name: 'valerio',
        //     address: { ...user.address, zipcode: '00121' },
        // });

        // ___________________UPDATING ARR OF OBJ___________________
        const array = [...contacts];
        const result = array.find((item) => item.id === 2);
        if (result) {
            result.name = 'Mark Landers';
            setContacts(array);
        }

        // REFACTOR
        // setContacts(
        //     contacts.map((item) =>
        //         item.id === 2 ? { ...item, name: 'Julian Ross' } : item
        //     )
        // );

        // __________________________EXERCISE__________________________
        // const cloneCart = { ...cart };
        // const res = cloneCart.items.find((item) => item.id === 2);
        // if (res) {
        //     res.quantity = 100;
        //     setCart(cloneCart);
        // }

        setCart({
            ...cart,
            items: cart.items.map((item) =>
                item.id === 1 ? { ...item, quantity: 99 } : item
            ),
        });

        // console.log(cart);
    };

    const btnProps: IBtn = {
        type: 'button',
        label: 'Update contact',
        onEmitEvent: handleClick,
        classes: {
            contextual: 'primary',
            size: 'md',
        },
    };

    return (
        <div>
            <h1>Managing Components State</h1>
            <div className="my-3">{JSON.stringify(contact)}</div>
            <Button {...btnProps} />
        </div>
    );
};

export default ManagingComponentsState;
