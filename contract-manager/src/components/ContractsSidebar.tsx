import { Nav } from "react-bootstrap";
import "./ContractsSidebar.css";
import PdfSidebarCard from "./PdfSidebarCard";

interface PdfDocument {
  pdfName: string;
  pdfCount: number;
  pdfLink: string;
}

interface Props {
  pdfDocuments: PdfDocument[];
}

function ContractsSidebar({ pdfDocuments }: Props) {
  return (
    <>
      <Nav
        className="col-md-2 d-none d-md-block bg-light sidebar"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div className="sidebar-sticky"></div>
        {pdfDocuments.map((pdfDocument, index) => (
          <PdfSidebarCard
            key={index}
            pdfDocument={pdfDocument}
          ></PdfSidebarCard>
        ))}
      </Nav>
    </>
  );
}

export default ContractsSidebar;