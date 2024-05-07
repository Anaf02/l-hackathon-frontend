import React, { useState, useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";

function PdfEditableTextViewer({ text }: { text: string | undefined }) {
  const [editableText, setEditableText] = useState(text || "");

  // Set initial content when component mounts
  useEffect(() => {
    setEditableText(text || "");
  }, [text]);

  const handleTextChange = (event: React.FocusEvent<HTMLDivElement>) => {
    setEditableText(event.target.innerText);
  };

  const handleSave = () => {
    // Handle save action, e.g., send the modified text to the backend
    console.log("Modified text:", editableText);
  };

  return (
    <>
      {text && (
        <Col
          className="mt-4 p-3 md-7 editable-text"
          contentEditable={!!text} // Apply contentEditable only if text has value
          onBlur={handleTextChange}
          dangerouslySetInnerHTML={{
            __html: editableText?.replace(/\n/g, "<br>") || "&nbsp;", // Add a non-breaking space if editableText is empty
          }}
        />
      )}
      {text && <Button onClick={handleSave}>Save</Button>}
    </>
  );
}

export default PdfEditableTextViewer;
