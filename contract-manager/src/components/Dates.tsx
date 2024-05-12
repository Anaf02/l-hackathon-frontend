import Card from 'react-bootstrap/Card';

interface DatesProps {
    text: string;
}

function Dates({ text }: DatesProps) {
    // Regular expression to match date format (DD.MM.YYYY)
    const dateRegex = /\d{2}.\d{2}.\d{4}/g;
    const dates = text.match(dateRegex); // Extract dates from the text

    return (
        <Card className="date-card">
            <Card.Body>
                <Card.Title>Dates</Card.Title>
                <Card.Text>
                    {dates && dates.map((date, index) => (
                        <div key={index}>{date}</div>
                    ))}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Dates;