import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { PdfDocument } from "./PdfDocumentModel";

interface Props {
  pdfDocument?: PdfDocument; // Making pdfDocument optional
}

function PdfImportantText({ pdfDocument }: Props) {
  const isSigned = pdfDocument?.doc_signed === "yes";

  return (
    <>
      {pdfDocument && (
        <Card className="mt-5 text-wrap" style={{ width: "18rem" }}>
          <Card.Header className="fw-bold">
            Important contract information
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Status:{isSigned ? " signed " : " not signed "}
              <span style={{ color: isSigned ? "green" : "red" }}>●</span>
            </ListGroup.Item>
            <ListGroup.Item>Contract Partner:</ListGroup.Item>
            <ListGroup.Item>Deadline:</ListGroup.Item>
            <ListGroup.Item>Start date:</ListGroup.Item>
            <ListGroup.Item>Price:</ListGroup.Item>
          </ListGroup>
        </Card>
      )}
    </>
  );
}

export default PdfImportantText;
