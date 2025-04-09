import React, { useState, useRef, useEffect } from 'react';

export type OptionProps = {
    label: string;
    value: string;
};

interface IDropdownProps {
    options: { label: string; value: string }[];
    onFilterChange: (selectedOptions: string[]) => void;
}

const Dropdown: React.FC<IDropdownProps> = ({ options, onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelected(value);
        setSelectedOptions((prevSelectedOptions) =>
            prevSelectedOptions.includes(value)
                ? prevSelectedOptions.filter((option) => option !== value)
                : [...prevSelectedOptions, value],
        );
    };

    const [selected, setSelected] = useState<string>('Drivers');

    useEffect(() => {
        onFilterChange(selectedOptions);
    }, [selectedOptions, onFilterChange]);

    return (
        <div id="dropdown" className="relative inline-block text-left w-[300px]" ref={dropdownRef}>
            <div>
                <button
                    type="button"
                    className="inline-flex w-full min-w-[300px] p-2 pt-3 select select-bordered"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={toggleDropdown}
                >
                    {selected}
                </button>
            </div>
            {isOpen && (
                <div
                    className="absolute right-0 z-50 mt-2 origin-top-right border-2 rounded-md shadow-lg dropDownOptions border-base-300 h-fit w-fit bg-base-100"
                    data-testid="testidDropdownOptions"
                >
                    <div
                        className="py-1 bg-base-200"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        {options?.map((option) => (
                            <label key={option.label} className="flex items-center px-4 py-2 text-base dropdownOption">
                                <input
                                    className="w-4 h-4 transition duration-150 ease-in-out form-checkbox"
                                    onChange={handleCheckboxChange}
                                    type="checkbox"
                                    value={option.value}
                                />
                                <span className="ml-2">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
