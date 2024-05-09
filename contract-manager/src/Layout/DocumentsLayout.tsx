//TODO:
// - Add layout components (grid with top bar, left and right sidebar and content)
// - Add left sidebar component (this is good for both layouts) containing the list of documents
// - Add Pdf document viewer in the middle (good for both again) contents section
// - Add two top bars (one for legal one for finance) if role == finance call one top bar otherwise call the other
// - Add a right sidebar one for each role, the right sidebarbar for legal contains only plaintext labels the other one contains a form (2 separate components called based on role)
// - Layout should receive documents as a prop from the outside (i.e. from the Contracts page)
// - On document list item click => display document in viewer and change right bar details. => implement using a useState Hook where on click you set current document to the one clicked
// - Right bar receives current document as prop, document viewer receives document as a prop.

import { Col, Container, Form, Row } from "react-bootstrap";
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
  const [role, setRole] = useState<number>(1);

  useEffect(() => setDocuments(pdfDocuments), [pdfDocuments]);
  const [currentDocument, setCurrentDocument] = useState<PdfDocument>();

  const handleRoleChange = (event: any) => {
    setRole(event.target.value);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="2">
            <ContractsSidebar
              pdfDocuments={documents}
              setCurrentDocument={setCurrentDocument}
              isLoading={isLoading}
            />
          </Col>
          <Col md="8" className="vh-100">
            <Row>
              <Col className="mt-4 md-7 p-3">
                <Form.Select onChange={handleRoleChange}>
                  <option value="1">Finance Role</option>
                  <option value="2">Legal Role</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className="h-75">
              <Col className="mt-4 md-7 h-100">
                <PdfEditableTextViewer
                  readOnly={role == 2}
                  text={currentDocument?.text}
                />
              </Col>
            </Row>
          </Col>
          <Col md="2">
            {/* TODO: right sideBar */}
            <h1>Important information</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DocumentsLayout;
