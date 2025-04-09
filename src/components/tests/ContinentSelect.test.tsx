import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContinentSelect from '../ContinentSelect';
import { CONTINENTS } from 'constants/circuitConstants';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock scrollIntoView function
window.HTMLElement.prototype.scrollIntoView = function () {};

const mockGotoContinent = vi.fn();
const mockSetCircuit = vi.fn();
const mockSetContinent = vi.fn((continent) => continent);

const renderComponent = (continent?: string) => {
    render(
        <ContinentSelect
            continent={continent}
            map={null}
            setCircuit={mockSetCircuit}
            setContinent={mockSetContinent}
            gotoContinent={mockGotoContinent}
        />,
    );
};

describe('ContinentSelect Component', () => {
    it('should render with default text when no continent is selected', () => {
        renderComponent();
        expect(screen.getByText('Continent')).toBeInTheDocument();
    });

    it('should render with the selected continent', () => {
        renderComponent('Europe');
        expect(screen.getByText('Europe')).toBeInTheDocument();
    });

    it('should open the dropdown menu when button is clicked', async () => {
        renderComponent();
        fireEvent.click(await screen.findByText('Continent'));
        await waitFor(() => expect(screen.getByText('Continent')).toBeInTheDocument());
    });

    it.skip('should call gotoContinent with correct arguments when a continent is selected', async () => {
        renderComponent();
        fireEvent.click(await screen.findByText('Continent'));
        fireEvent.click(screen.getByText(Object.keys(CONTINENTS)[0]));
        await waitFor(() => expect(mockGotoContinent).toHaveBeenCalledWith(mockGotoContinent));
    });

    it('should display all continents in the dropdown menu', async () => {
        renderComponent();
        fireEvent.click(screen.getByText('Continent'));
        await waitFor(() => {
            Object.keys(CONTINENTS).forEach((continent) => {
                expect(screen.getByText(continent)).toBeInTheDocument();
            });
        });
    });

    it.skip('should call setContinent when a continent is selected', async () => {
        renderComponent();
        fireEvent.click(await screen.findByText('Continent'));
        fireEvent.click(screen.getByText('North America'));
        await waitFor(() => expect(mockSetContinent).toHaveBeenCalledWith('North America'));
    });

    it.skip('should call setCircuit with undefined when a continent is selected', async () => {
        renderComponent();
        fireEvent.click(await screen.findByText('Continent'));
        fireEvent.click(screen.getByText(Object.keys(CONTINENTS)[0]));
        await waitFor(() => expect(mockSetCircuit).toHaveBeenCalledWith(undefined));
    });

    it.skip('should not call gotoContinent if the same continent is selected', async () => {
        renderComponent('Europe');
        fireEvent.click(await screen.findByText('Continent'));
        fireEvent.click(screen.getByText('Europe'));
        await waitFor(() => expect(mockGotoContinent).not.toHaveBeenCalled());
    });

    it.skip('should call setCircuit with the correct argument when a continent is selected', async () => {
        renderComponent();
        fireEvent.click(await screen.findByText('Continent'));
        fireEvent.click(screen.getByText(Object.keys(CONTINENTS)[0]));
        await waitFor(() => expect(mockSetCircuit).toHaveBeenCalledWith(Object.keys(CONTINENTS)[0]));
    });
});
