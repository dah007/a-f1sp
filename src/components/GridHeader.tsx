import React from 'react';

import { yearsDropdown } from './YearsDropdown';
import { useAppSelector } from 'hooks/reduxHooks';
import { Input } from './ui/input';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@radix-ui/react-select';

type GridHeaderProps = {
    title: string;
    onFilterTextBoxChanged: (event: React.FormEvent<HTMLInputElement>) => void;
    navigateCB: (year: string) => void;
    additionalSearchFields?: React.ReactNode;
};

const GridHeader: React.FC<GridHeaderProps> = ({
    title,
    onFilterTextBoxChanged,
    additionalSearchFields,
}: GridHeaderProps) => {
    const selectedYear = useAppSelector((state) => state.siteWide.selectedYear);
    return (
        <div className="flex flex-col gap-2">
            <div className="m-2 mt-0 text-3xl font-bold racingFont">{title}</div>
            <div className="flex gap-4 mb-0">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={selectedYear} />
                    </SelectTrigger>
                    <SelectContent>{yearsDropdown(true)}</SelectContent>
                </Select>
                <div>
                    <Input
                        className="w-full max-w-xs input input-bordered"
                        data-testid="filterTextBox"
                        id="filter-text-box"
                        onInput={onFilterTextBoxChanged}
                        placeholder="Filter..."
                        type="text"
                    />
                </div>
                {additionalSearchFields}
            </div>
        </div>
    );
};

export default GridHeader;
