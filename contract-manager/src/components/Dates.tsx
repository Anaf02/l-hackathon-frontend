import React from 'react';

interface DatesProps {
    text: string;
}

function Dates({ text }: DatesProps) {
    const dateRegex = /\d{2}.\d{2}.\d{4}/g;
    const dates = text.match(dateRegex);

    if (!dates) {
        return null; // Return null if no dates are found
    }

    const datesWithLineBreaks = dates.map((date, index) => (
        <React.Fragment key={index}>
            {date}
            <br />
        </React.Fragment>
    ));

    return datesWithLineBreaks;
}

export default Dates;