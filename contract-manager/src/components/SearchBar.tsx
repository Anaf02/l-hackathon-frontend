import { useState } from "react";
import { PdfDocument } from "./PdfDocumentModel";
import { Form } from "react-bootstrap";

interface SearchBarProps {
  documents: PdfDocument[];
  setFilteredDocuments: React.Dispatch<React.SetStateAction<PdfDocument[]>>;
}

function SearchBar({ documents, setFilteredDocuments }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
    const filteredDocs = documents.filter((doc) =>
      doc.fileName.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredDocuments(filteredDocs);
  };

  return (
    <Form.Control
      type="text"
      placeholder="Search"
      onChange={handleChange}
      value={searchInput}
    />
  );
}

export default SearchBar;
