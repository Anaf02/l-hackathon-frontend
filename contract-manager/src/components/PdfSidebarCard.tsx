import React from "react";
import { Card, Button } from "react-bootstrap";
import { PdfDocument } from "./PdfDocumentModel";
import { useAxios } from "./Context/AuthContext/SimpleAxiosContextWithAuth";

interface Props {
  pdfDocument: PdfDocument;
  setCurrentDocument: (document: PdfDocument) => void;
}
// const dummyPdfDocuments: PdfDocument[] = [
//   {
//     fileName: "Document 1",
//     PDF_ID: "1",
//     text: "test1",
//   },
//   {
//     fileName: "Document 2",
//     PDF_ID: "2",
//     text: "test2",
//   },
//   {
//     fileName: "Document 3",
//     PDF_ID: "3",
//     text: "test3",
//   },
// ];

const PdfSidebarCard: React.FC<Props> = ({
  pdfDocument,
  setCurrentDocument,
}) => {
  const { axiosApi } = useAxios();

  const handleClick = (e: any) => {
    axiosApi.get<PdfDocument>(`pdf/${pdfDocument.PDF_ID}`).then((res) => {
      setCurrentDocument(res.data);
    });

    // setCurrentDocument(
    //   dummyPdfDocuments.find(
    //     (document) => document.fileName == pdfDocument.PDF_ID
    //   ) ?? {
    //     PDF_ID: "",
    //     fileName: "",
    //     text: "",
    //   }
    // );
  };

  return (
    <Card className="pdf-card">
      <Card.Body>
        <Card.Title>{pdfDocument.fileName}</Card.Title>
        <Button variant="primary" onClick={handleClick}>
          View
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PdfSidebarCard;
