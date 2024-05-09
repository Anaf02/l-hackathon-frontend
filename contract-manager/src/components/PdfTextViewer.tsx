import { Col, Form } from "react-bootstrap";
import { PdfDocument } from "./PdfDocumentModel";

function PdfTextViewer({ text }: { text: string | undefined }) {
  return (
    <>
      <Col
        dangerouslySetInnerHTML={{ __html: text?.replace(/\n/g, "<br>") || "" }}
      />
    </>
  );
}

export default PdfTextViewer;
