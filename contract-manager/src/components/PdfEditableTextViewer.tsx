import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useAxios } from "./Context/AuthContext/SimpleAxiosContextWithAuth";
import { PdfDocument } from "./PdfDocumentModel";
import ToastNotification from "../components/ToastNotification";

function PdfEditableTextViewer({
  pdfDocument,
  readOnly,
  userRole,
}: {
  pdfDocument: PdfDocument | undefined;
  readOnly: boolean;
  userRole: string;
}) {
  const [showToast, setShowToast] = useState(false);

  const handleCloseToast = () => {
    setShowToast(false);
  };
  const [document, setDocument] = useState(pdfDocument);
  const { axiosApi } = useAxios();
  // Set initial content when component mounts
  useEffect(() => {
    setDocument(pdfDocument);
  }, [pdfDocument]);

  const handleTextChange = (event: any) => {
    if (document !== undefined) {
      const newDoc: PdfDocument = {
        ...document,
        text: event.currentTarget.value,
      };
      setDocument(newDoc);
    }
  };

  const handleSign = (e: any) => {
    e.preventDefault();
    try {
      if (!document) return; // Do nothing if no document selected
      setShowToast(true);
      /*axiosApi.put(`/pdf/${document.PDF_ID}`, {
        doc_signed: "yes",
      });*/
    } catch (error) {
      console.error("Error signing PDF:", error);
    }
  };


  const handleSave = (e: any) => {
    e.preventDefault();
    try {
      if (!document) return; // Do nothing if no document selected

      axiosApi.put(`/pdf/${document.PDF_ID}`, {
        text: document.text,
      });
    } catch (error) {
      console.error("Error saving PDF text:", error);
    }
  };

  return (
    <>
      {document && (
        <Form.Control
          className="p-3 h-100"
          onChange={handleTextChange}
          as="textarea"
          value={document.text}
          readOnly={readOnly}
          disabled={readOnly}
          spellCheck={false}
        />
      )}
      {document && !readOnly && (
        <Row className="d-flex justify-content-between mt-2">
          <Col>
            <Button className="mt-2" variant="success" onClick={handleSave}>
              Save
            </Button>
          </Col>
          <Col>
            {userRole === "CEO" && (
              <Button className="mt-2" variant="outline-dark" onClick={handleSign}>E-sign</Button>
            )}
            {showToast && (
            <ToastNotification
              title={"Success"}
              text={"Sent to sign"}
             onClose={handleCloseToast}
            />
            )}
          </Col>
        </Row>
      )}
    </>
  );
}

export default PdfEditableTextViewer;
