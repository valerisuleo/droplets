/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { render } from '@testing-library/react';
import Hero from './hero';
import '@testing-library/jest-dom';

describe('Hero component', () => {
    it('renders children', () => {
        const { getByText } = render(
            <Hero variant={'background'}>Hello, world!</Hero>
        );
        expect(getByText('Hello, world!')).toBeInTheDocument();
    });

    it('renders with image source', () => {
        const { container } = render(
            <Hero imageSrc="https://example.com/image.png" variant={'image'}>
                <img src="https://example.com/image.png" alt="test image" />
            </Hero>
        );
        expect(container.querySelector('img')).toHaveAttribute(
            'src',
            'https://example.com/image.png'
        );
    });

    it('renders with background color', () => {
        const { container } = render(
            <Hero backgroundColor="#f00" variant={'background'}>
                Hello, world!
            </Hero>
        );
        expect(container.firstChild).toHaveStyle('background-color: #f00');
    });
});
