import { Button, Col, Form, Row } from "react-bootstrap";
import Layout from "../Layout/Layout";
import ContractsSidebar from "../components/ContractsSidebar";
import { useSimpleAuth } from "../components/Context/AuthContext/useSimpleAuthHook";
import { useEffect, useState } from "react";
import { SimpleLoginModel } from "../components/Context/AuthContext/SimpleLoginModel";
import { useAxios } from "../components/Context/AuthContext/SimpleAxiosContextWithAuth";
import { SimpleUserModel } from "../components/Context/AuthContext/SimpleUserModel";
import {
  PdfDocument,
  PdfDocumentListItem,
} from "../components/PdfDocumentModel";
import PdfTextViewer from "../components/PdfTextViewer";
// TODO for login page: implement login form (with username and password);
// Call the simple auth hook here and on submit use the login function
// (copy and change the example with text field and password field instead of select)

type UserDictionary = { [id: string]: SimpleUserModel };

function TestPage() {
  // const dummyPdfDocuments: PdfDocumentListItem[] = [
  //   {
  //     fileName: "Document 1",
  //     PDF_ID: "1",
  //   },
  //   {
  //     fileName: "Document 2",
  //     PDF_ID: "2",
  //   },
  //   {
  //     fileName: "Document 3",
  //     PDF_ID: "3",
  //   },
  // ];

  //login task
  //const { login } = useSimpleAuth();
  // const [username, setUsername] = useState<string>("1");
  // const [password, setPassword] = useState<string>("1");

  // const handleSubmit = (formData: any) => {
  //   formData.preventDefault();
  //   console.log(username);
  //   const loginModel: SimpleLoginModel = {
  //     username: username,
  //     password: password,
  //   };

  //   //login(loginModel);
  // };

  const { axiosApi } = useAxios();
  const [currentDocument, setCurrentDocument] = useState<PdfDocument>();

  const [users, setUsers] = useState<UserDictionary>({});
  useEffect(() => {
    axiosApi.get<UserDictionary>("/user").then((res) => {
      setUsers(res.data);
    });
  }, []);

  console.log(users);

  return (
    <>
      <Row>
        <Col className="md-2 sm-2 xl-2">
          {/* <ContractsSidebar
            pdfDocuments={dummyPdfDocuments}
            setCurrentDocument={setCurrentDocument}
          ></ContractsSidebar> */}
        </Col>
        {/* <Col className="md-5">
          {currentDocument?.id}
          {currentDocument?.fileName}
          {currentDocument?.text}
        </Col> */}
        <Col className="md-8 ms-0 ps=2">
          <PdfTextViewer text={currentDocument?.text}></PdfTextViewer>
        </Col>
        <Col></Col>

        {/* <Col className="md-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col> */}
      </Row>
    </>
  );
}

export default TestPage;
