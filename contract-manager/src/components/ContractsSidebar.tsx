import { Nav } from "react-bootstrap";
import "./ContractsSidebar.css";
import PdfSidebarCard from "./PdfSidebarCard";
import { PdfDocument } from "./PdfDocumentModel";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

interface Props {
  pdfDocuments: PdfDocument[];
  setCurrentDocument: (document: PdfDocument) => void;
  isLoading: boolean;
}

function ContractsSidebar({
  pdfDocuments,
  setCurrentDocument,
  isLoading,
}: Props) {
  const [documents, setDocuments] = useState(pdfDocuments);
  const [filteredDocuments, setFilteredDocuments] = useState(pdfDocuments);

  useEffect(() => setFilteredDocuments(pdfDocuments), [pdfDocuments]);

  useEffect(() => setDocuments(pdfDocuments), [pdfDocuments]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Nav
        className="col-md-2 d-none d-md-block bg-light sidebar p-2"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        navbarScroll
      >
        <SearchBar
          documents={pdfDocuments}
          setFilteredDocuments={setFilteredDocuments}
        />
        <div className="sidebar-sticky mt-2"></div>
        {filteredDocuments?.map((pdfDocument, index) => (
          <PdfSidebarCard
            key={index}
            pdfDocument={pdfDocument}
            setCurrentDocument={setCurrentDocument}
          ></PdfSidebarCard>
        ))}
      </Nav>
    </>
  );
}

export default ContractsSidebar;
