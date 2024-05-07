import { Col, Form } from "react-bootstrap";
import { PdfDocument } from "./PdfDocumentModel";

function PdfTextViewer({ text }: { text: string | undefined }) {
  return (
    <>
      <Col
        className="mt-4 md-7 p-3"
        dangerouslySetInnerHTML={{ __html: text?.replace(/\n/g, "<br>") || "" }}
      />
    </>
  );
}

export default PdfTextViewer;
