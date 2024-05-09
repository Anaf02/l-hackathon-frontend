import React, { useState, useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";

function PdfEditableTextViewer({
  text,
  readOnly,
}: {
  text: string | undefined;
  readOnly: boolean;
}) {
  const [editableText, setEditableText] = useState(text || "");

  // Set initial content when component mounts
  useEffect(() => {
    setEditableText(text || "");
  }, [text]);

  const handleTextChange = (event: any) => {
    setEditableText(event.target.value);
  };

  const handleSave = () => {
    // Handle save action, e.g., send the modified text to the backend
    console.log("Modified text:", editableText);
  };

  return (
    <>
      {text && (
        <Form.Control
          className="p-3 h-100"
          onChange={handleTextChange}
          as="textarea"
          defaultValue={editableText}
          readOnly={readOnly}
          disabled={readOnly}
        />
      )}
      {text && !readOnly && <Button onClick={handleSave}>Save</Button>}
    </>
  );
}

export default PdfEditableTextViewer;
