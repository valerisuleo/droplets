/* eslint-disable react/jsx-pascal-case */
import { useState } from 'react';
import { IListGroup } from './interface';
import Styles from './list-group-styles';

const ListGroup = ({
    collection,
    propKey,
    propText,
    onEmitEvent,
}: IListGroup) => {
    const [activeIndex, setActiveIndex] = useState(-1);

    return (
        // <Styles.ul>
        //     {collection.map((item, i) => (
        //         <Styles.li
        //             onClick={() => {
        //                 onEmitEvent(item);
        //                 setActiveIndex(i);
        //             }}
        //             key={item[propKey]}
        //             classActive={i === activeIndex}
        //         >
        //             {item[propText]}
        //         </Styles.li>
        //     ))}
        // </Styles.ul>

         <ul className="list-group">
                    {collection.map((item, i) => (
                        <li
                            onClick={() => {
                                onEmitEvent(item);
                                setActiveIndex(i);
                            }}
                            key={item[propKey]}
                            className={
                                activeIndex === i
                                    ? `list-group-item active`
                                    : 'list-group-item'
                            }
                        >
                            {item[propText]}
                        </li>
                    ))}
                </ul>
    );
};

export default ListGroup;
