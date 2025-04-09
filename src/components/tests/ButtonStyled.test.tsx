import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonStyled from '../ButtonStyled';
import { vi } from 'vitest';

describe('ButtonStyled Component', () => {
    it('renders correctly with children', () => {
        const { getByText } = render(<ButtonStyled>Click Me</ButtonStyled>);
        expect(getByText('Click Me')).toBeInTheDocument();
    });

    it('calls clickHandler when clicked', () => {
        const clickHandler = vi.fn();
        const { getByText } = render(<ButtonStyled clickHandler={clickHandler}>Click Me</ButtonStyled>);
        fireEvent.click(getByText('Click Me'));
        expect(clickHandler).toHaveBeenCalledTimes(1);
    });

    it('calls onClick when clicked', () => {
        const onClick = vi.fn();
        const { getByText } = render(<ButtonStyled onClick={onClick}>Click Me</ButtonStyled>);
        fireEvent.click(getByText('Click Me'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('calls both clickHandler and onClick when clicked', () => {
        const clickHandler = vi.fn();
        const onClick = vi.fn();
        const { getByText } = render(
            <ButtonStyled clickHandler={clickHandler} onClick={onClick}>
                Click Me
            </ButtonStyled>,
        );
        fireEvent.click(getByText('Click Me'));
        expect(clickHandler).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it.skip('forwards ref to the button element', () => {
        const ref = React.createRef<HTMLButtonElement>();
        const { getByText } = render(<ButtonStyled ref={ref}>Click Me</ButtonStyled>);
        expect(getByText('Click Me')).toBe(ref.current);
    });
});
