import styled from 'styled-components';
import { IListItemStyle } from './interface';

const Styles = {
    ul: styled.ul.attrs(() => ({
        className: 'list-group',
    }))`
        list-style: none;
    `,
    li: styled.li.attrs((props: IListItemStyle) => ({
        className: props.classActive
            ? 'list-group-item active'
            : 'list-group-item',
    }))<IListItemStyle>`
        cursor: pointer;
    `,
};

export default Styles;
