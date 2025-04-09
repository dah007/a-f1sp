import { JSX, useEffect, useState } from 'react';

import CustomLink from './CustomLink';

import { useGetTotalWinsQuery } from '../features/f1spRacesApi';

import { YEAR } from 'constants/constants';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

type TWin = {
    id: string;
    name: string;
    total: number;
};

const TotalWinsPod: React.FC<{ year: number }> = ({ year = YEAR }: { year: number }): JSX.Element => {
    const { data: dataTotalWins } = useGetTotalWinsQuery(year);

    const [totalWins, setTotalWins] = useState<TWin[]>();

    useEffect(() => {
        if (!dataTotalWins) return;

        setTotalWins(dataTotalWins);
    }, [dataTotalWins]);
    
    const Wins = ({ totalWins }: { totalWins: TWin[] | undefined }) => {
        if (!totalWins) return null;
        
        return totalWins.map((win, index) => (
            <TableRow key={index}>
                <TableCell>
                    <CustomLink
                        route={{
                            parent: {
                                path: 'drivers',
                                label: 'Drivers',
                            },
                            path: `driverDetail/${win.id}`,
                            label: win.name,
                        }}
                    />
                </TableCell>
                <TableCell align="right">{win.total}</TableCell>
            </TableRow>
        ));
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Driver</TableHead>
                    <TableHead className="text-right">Wins</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {totalWins?.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={2} className="text-center">
                            No data available
                        </TableCell>
                    </TableRow>
                )}
                <Wins totalWins={totalWins} />
            </TableBody>
        </Table>
    );
};

export default TotalWinsPod;
