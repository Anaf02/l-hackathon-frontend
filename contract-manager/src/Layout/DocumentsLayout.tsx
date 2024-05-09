//TODO:
// - Add layout components (grid with top bar, left and right sidebar and content)
// - Add left sidebar component (this is good for both layouts) containing the list of documents
// - Add Pdf document viewer in the middle (good for both again) contents section
// - Add two top bars (one for legal one for finance) if role == finance call one top bar otherwise call the other
// - Add a right sidebar one for each role, the right sidebarbar for legal contains only plaintext labels the other one contains a form (2 separate components called based on role)
// - Layout should receive documents as a prop from the outside (i.e. from the Contracts page)
// - On document list item click => display document in viewer and change right bar details. => implement using a useState Hook where on click you set current document to the one clicked
// - Right bar receives current document as prop, document viewer receives document as a prop.

import { Col, Row } from "react-bootstrap";
import ContractsSidebar from "../components/ContractsSidebar";
import { PdfDocument } from "../components/PdfDocumentModel";
import { useEffect, useState } from "react";
import PdfTextViewer from "../components/PdfTextViewer";
import PdfEditableTextViewer from "../components/PdfEditableTextViewer";

interface Props {
  pdfDocuments: PdfDocument[];
  isLoading: boolean;
  // userRole: string;
}

function DocumentsLayout({ pdfDocuments, isLoading }: Props) {
  const [documents, setDocuments] = useState(pdfDocuments);

  useEffect(() => setDocuments(pdfDocuments), [pdfDocuments]);
  const [currentDocument, setCurrentDocument] = useState<PdfDocument>();

  return (
    <>
      <Row>
        <Col>{/* top bar with search and upload */}</Col>
      </Row>
      <Row>
        <Col>
          <ContractsSidebar
            pdfDocuments={documents}
            setCurrentDocument={setCurrentDocument}
            isLoading={isLoading}
          ></ContractsSidebar>
        </Col>
        <Col>
          {/*TODO: document viewer area for the pdf text that is received, and additional save button for finance*/}
          <PdfTextViewer text={currentDocument?.text}></PdfTextViewer>
          <PdfEditableTextViewer
            text={currentDocument?.text}
          ></PdfEditableTextViewer>
        </Col>
        <Col>{/* TODO: right sideBar */}</Col>
      </Row>
    </>
  );
}

export default DocumentsLayout;
