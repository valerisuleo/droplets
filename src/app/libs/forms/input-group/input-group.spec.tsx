import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputGroup from './input-group';

describe('InputGroup', () => {
    const props = {
        label: 'Username',
        value: '',
        onChange: jest.fn(),
        onBlur: jest.fn(),
        name: 'username',
        type: 'text',
        validators: [],
        errorValidation: [],
    };

    it('renders the label', () => {
        const { getByLabelText } = render(<InputGroup {...props} />);
        expect(getByLabelText(props.label)).toBeInTheDocument();
    });

    it('calls onChange handler', () => {
        const { getByLabelText } = render(<InputGroup {...props} />);
        const input = getByLabelText(props.label);
        fireEvent.change(input, { target: { value: 'john' } });
        expect(props.onChange).toHaveBeenCalled();
    });

    it('calls onBlur handler', () => {
        const { getByLabelText } = render(<InputGroup {...props} />);
        const input = getByLabelText(props.label);
        fireEvent.blur(input);
        expect(props.onBlur).toHaveBeenCalled();
    });

    it('displays error message when errorValidation prop is passed', () => {
        const errorValidation = [{ msg: 'Username is required' }];
        const { getByText } = render(
            <InputGroup {...props} errorValidation={errorValidation} />
        );
        expect(getByText(errorValidation[0].msg)).toBeInTheDocument();
    });
});
