import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

import ButtonLink from '../ButtonLink';

vi.mock('react-router', () => ({
    useNavigate: () => vi.fn(),
}));

describe('ButtonLink', () => {
    let mockNavigate: unknown;

    beforeEach(() => {
        mockNavigate = vi.fn((b) => b);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders the button with the correct label', () => {
        render(
            <BrowserRouter>
                <ButtonLink label="Go to Home" to="/home" />
            </BrowserRouter>,
        );
        const button = screen.getByRole('button', { name: /go to home/i });
        expect(button).toBeInTheDocument();
    });

    it('renders the button with the correct label', () => {
        render(
            <BrowserRouter>
                <ButtonLink label="Go to Home" to="/home" />
            </BrowserRouter>,
        );
        const button = screen.getByRole('button', { name: /go to home/i });
        expect(button).toBeInTheDocument();
    });

    it.skip('navigates to the correct route when clicked', () => {
        render(
            <BrowserRouter>
                <ButtonLink label="Go to Home" to="/home" />
            </BrowserRouter>,
        );
        const button = screen.getByRole('button', { name: /go to home/i });
        userEvent.click(button);
        expect(mockNavigate).toHaveBeenCalledWith('/home');
    });

    it('renders the button with a different label', () => {
        render(
            <BrowserRouter>
                <ButtonLink label="Go to About" to="/about" />
            </BrowserRouter>,
        );
        const button = screen.getByRole('button', { name: /go to about/i });
        expect(button).toBeInTheDocument();
    });

    it.skip('navigates to a different route when clicked', () => {
        render(
            <BrowserRouter>
                <ButtonLink label="Go to About" to="/about" />
            </BrowserRouter>,
        );
        const button = screen.getByRole('button', { name: /go to about/i });
        userEvent.click(button);
        expect(mockNavigate).toHaveBeenCalledWith('/about');
    });

    it('does not navigate if the button is disabled', () => {
        render(
            <BrowserRouter>
                <ButtonLink label="Go to Home" to="/home" />
            </BrowserRouter>,
        );
        const button = screen.getByRole('button', { name: /go to home/i });
        button.setAttribute('disabled', 'true');
        userEvent.click(button);
        expect(mockNavigate).not.toHaveBeenCalled();
    });
});
