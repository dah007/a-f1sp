import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/table';

const schedule = [
  {
    "date": "Mar 14-16",
    "country": "Australia",
    "venue": "Melbourne",
    "weekendStartDate": "03/14/2025"
  },
  {
    "date": "Mar 21-23",
    "country": "China",
    "venue": "Shanghai",
    "weekendStartDate": "03/21/2025"
  },
  {
    "date": "Apr 4-6",
    "country": "Japan",
    "venue": "Suzuka",
    "weekendStartDate": "04/04/2025"
  },
  {
    "date": "Apr 11-13",
    "country": "Bahrain",
    "venue": "Sakhir",
    "weekendStartDate": "04/11/2025"
  },
  {
    "date": "Apr 18-20",
    "country": "Saudi Arabia",
    "venue": "Jeddah",
    "weekendStartDate": "04/18/2025"
  },
  {
    "date": "May 2-4",
    "country": "USA",
    "venue": "Miami",
    "weekendStartDate": "05/02/2025"
  },
  {
    "date": "May 16-18",
    "country": "Italy",
    "venue": "Imola",
    "weekendStartDate": "05/16/2025"
  },
  {
    "date": "May 23-25",
    "country": "Monaco",
    "venue": "Monaco",
    "weekendStartDate": "05/23/2025"
  },
  {
    "date": "May 30 - Jun 1",
    "country": "Spain",
    "venue": "Barcelona",
    "weekendStartDate": "05/30/2025"
  },
  {
    "date": "Jun 13-15",
    "country": "Canada",
    "venue": "Montreal",
    "weekendStartDate": "06/13/2025"
  },
  {
    "date": "Jun 27-29",
    "country": "Austria",
    "venue": "Spielberg",
    "weekendStartDate": "06/27/2025"
  },
  {
    "date": "Jul 4-6",
    "country": "United Kingdom",
    "venue": "Silverstone",
    "weekendStartDate": "07/04/2025"
  },
  {
    "date": "Jul 25-27",
    "country": "Belgium",
    "venue": "Spa",
    "weekendStartDate": "07/25/2025"
  },
  {
    "date": "Aug 1-3",
    "country": "Hungary",
    "venue": "Budapest",
    "weekendStartDate": "08/01/2025"
  },
  {
    "date": "Aug 29-31",
    "country": "Netherlands",
    "venue": "Zandvoort",
    "weekendStartDate": "08/29/2025"
  },
  {
    "date": "Sept 5-7",
    "country": "Italy",
    "venue": "Monza",
    "weekendStartDate": "09/05/2025"
  },
  {
    "date": "Sept 19-21",
    "country": "Azerbaijan",
    "venue": "Baku",
    "weekendStartDate": "09/19/2025"
  },
  {
    "date": "Oct 3-5",
    "country": "Singapore",
    "venue": "Singapore",
    "weekendStartDate": "10/03/2025"
  },
  {
    "date": "Oct 17-19",
    "country": "USA",
    "venue": "Austin",
    "weekendStartDate": "10/17/2025"
  },
  {
    "date": "Oct 24-26",
    "country": "Mexico",
    "venue": "Mexico City",
    "weekendStartDate": "10/24/2025"
  },
  {
    "date": "Nov 7-9",
    "country": "Brazil",
    "venue": "Sao Paulo",
    "weekendStartDate": "11/07/2025"
  },
  {
    "date": "Nov 20-22",
    "country": "USA",
    "venue": "Las Vegas",
    "weekendStartDate": "11/20/2025"
  },
  {
    "date": "Nov 28-30",
    "country": "Qatar",
    "venue": "Lusail",
    "weekendStartDate": "11/28/2025"
  },
  {
    "date": "Dec 5-7",
    "country": "Abu Dhabi",
    "venue": "Yas Marina",
    "weekendStartDate": "12/05/2025"
  }
];

const NextYearSchedule = () => {
    return (
        <div className="flex flex-col gap-1">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Venue</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {schedule.map((race, index) => {
                        if (new Date(race.weekendStartDate) > new Date()) {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{race.date}</TableCell>
                                    <TableCell>{race.country}</TableCell>
                                    <TableCell>{race.venue}</TableCell>
                                </TableRow>
                            );
                        }
                        return null;
                    })}
                    
                    {/* <TableRow>
                        <TableCell>Mar 14-16</TableCell>
                        <TableCell>Australia</TableCell>
                        <TableCell>Melbourne</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Mar 21-23</TableCell>
                        <TableCell>China</TableCell>
                        <TableCell>Shanghai</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Apr 4-6</TableCell>
                        <TableCell>Japan</TableCell>
                        <TableCell>Suzuka</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Apr 11-13</TableCell>
                        <TableCell>Bahrain</TableCell>
                        <TableCell>Sakhir</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Apr 18-20</TableCell>
                        <TableCell>Saudi Arabia</TableCell>
                        <TableCell>Jeddah</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>May 2-4</TableCell>
                        <TableCell>USA</TableCell>
                        <TableCell>Miami</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>May 16-18</TableCell>
                        <TableCell>Italy</TableCell>
                        <TableCell>Imola</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>May 23-25</TableCell>
                        <TableCell>Monaco</TableCell>
                        <TableCell>Monaco</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="text-nowrap">May 30 - Jun 1</TableCell>
                        <TableCell>Spain</TableCell>
                        <TableCell>Barcelona</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Jun 13-15</TableCell>
                        <TableCell>Canada</TableCell>
                        <TableCell>Montreal</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Jun 27-29</TableCell>
                        <TableCell>Austria</TableCell>
                        <TableCell>Spielberg</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Jul 4-6</TableCell>
                        <TableCell>United Kingdom</TableCell>
                        <TableCell>Silverstone</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Jul 25-27</TableCell>
                        <TableCell>Belgium</TableCell>
                        <TableCell>Spa</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Aug 1-3</TableCell>
                        <TableCell>Hungary</TableCell>
                        <TableCell>Budapest</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Aug 29-31</TableCell>
                        <TableCell>Netherlands</TableCell>
                        <TableCell>Zandvoort</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Sept 5-7</TableCell>
                        <TableCell>Italy</TableCell>
                        <TableCell>Monza</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Sept 19-21</TableCell>
                        <TableCell>Azerbaijan</TableCell>
                        <TableCell>Baku</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Oct 3-5</TableCell>
                        <TableCell>Singapore</TableCell>
                        <TableCell>Singapore</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Oct 17-19</TableCell>
                        <TableCell>USA</TableCell>
                        <TableCell>Austin</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Oct 24-26</TableCell>
                        <TableCell>Mexico</TableCell>
                        <TableCell>Mexico City</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Nov 7-9</TableCell>
                        <TableCell>Brazil</TableCell>
                        <TableCell>Sao Paulo</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Nov 20-22</TableCell>
                        <TableCell>USA</TableCell>
                        <TableCell>Las Vegas</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Nov 28-30</TableCell>
                        <TableCell>Qatar</TableCell>
                        <TableCell>Lusail</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Dec 5-7</TableCell>
                        <TableCell>Abu Dhabi</TableCell>
                        <TableCell>Yas Marina</TableCell>
                    </TableRow> */}
                </TableBody>
            </Table>
        </div>
    );
};

export default NextYearSchedule;
