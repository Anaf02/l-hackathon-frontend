import { Button, Col, Form, Row } from "react-bootstrap";
import Layout from "../Layout/Layout";
import ContractsSidebar from "../components/ContractsSidebar";
import { useSimpleAuth } from "../components/Context/AuthContext/useSimpleAuthHook";
import { useEffect, useState } from "react";
import { SimpleLoginModel } from "../components/Context/AuthContext/SimpleLoginModel";
import { useAxios } from "../components/Context/AuthContext/SimpleAxiosContextWithAuth";
import { SimpleUserModel } from "../components/Context/AuthContext/SimpleUserModel";
// TODO for login page: implement login form (with username and password);
// Call the simple auth hook here and on submit use the login function
// (copy and change the example with text field and password field instead of select)
interface PdfDocument {
  pdfName: string;
  pdfCount: number;
  pdfLink: string;
}

function TestPage() {
  const dummyPdfDocuments: PdfDocument[] = [
    {
      pdfName: "Document 1",
      pdfCount: 1,
      pdfLink: "/document1.pdf",
    },
    {
      pdfName: "Document 2",
      pdfCount: 2,
      pdfLink: "/document2.pdf",
    },
    {
      pdfName: "Document 3",
      pdfCount: 3,
      pdfLink: "/document3.pdf",
    },
  ];

  //login task
  const { login } = useSimpleAuth();
  const [username, setUsername] = useState<string>("1");
  const [password, setPassword] = useState<string>("1");

  const handleSubmit = (formData: any) => {
    formData.preventDefault();
    console.log(username);
    const loginModel: SimpleLoginModel = {
      username: username,
      password: password,
    };

    login(loginModel);
  };

  const { axiosApi } = useAxios();

  const [users, setUsers] = useState<SimpleUserModel[]>([]);
  useEffect(() => {
    axiosApi.get<SimpleUserModel[]>("users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <>
      <Row>
        <Col>
          <ContractsSidebar pdfDocuments={dummyPdfDocuments}></ContractsSidebar>
        </Col>
        <Col className="md=5">
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
        </Col>
      </Row>
    </>
  );
}

export default TestPage;
