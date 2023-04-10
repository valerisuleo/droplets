import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IFormSelectField } from '../interfaces';
import Select from './select';

const mockOptions = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
];

const setup = (props: Partial<IFormSelectField> = {}) => {
    const defaultProps: IFormSelectField = {
        options: mockOptions,
        textProp: 'name',
        valueProp: 'id',
        onChange: jest.fn(),
        label: 'Test Label',
        name: 'testName',
        type: 'testType',
        value: mockOptions[0],
        ...props,
    };

    return render(<Select {...defaultProps} />);
};

describe('Select component', () => {
    it('renders without errors', () => {
        setup();
        expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    });

    it('renders correct options', () => {
        setup();
        const selectElement = screen.getByRole('combobox');
        fireEvent.change(selectElement, { target: { value: '1' } });
        expect(selectElement).toHaveValue('1');
        fireEvent.change(selectElement, { target: { value: '2' } });
        expect(selectElement).toHaveValue('2');
        fireEvent.change(selectElement, { target: { value: '3' } });
        expect(selectElement).toHaveValue('3');
    });

    it('calls onChange handler when an option is selected', () => {
        const handleChange = jest.fn();
        setup({ onChange: handleChange });
        const selectElement = screen.getByRole('combobox');
        fireEvent.change(selectElement, { target: { value: '2' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});
