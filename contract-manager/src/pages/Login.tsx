import { Button, Col, Form, Container } from "react-bootstrap";
import { useState } from "react";
import "./Login.css";
import "./Home.css";
import ToastNotification from "../components/ToastNotification";
import { useNavigate } from "react-router-dom";
import { useSimpleAuth } from "../components/Context/AuthContext/useSimpleAuthHook";
import { SimpleLoginModel } from "../components/Context/AuthContext/SimpleLoginModel";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { login } = useSimpleAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: SimpleLoginModel = {
      username: username,
      password: password,
    };

    const loginSuccessfull = await login(formData);

    if (loginSuccessfull) {
      navigate("/contracts");
    } else {
      setShowToast(true);
    }
  };

  const [showToast, setShowToast] = useState(false);

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <>
      <img src="/pictures/login_Background.webp" id="backgroundPicture" />
      <Container className="login-content-container">
        <h1>Login</h1>
        <Col className="md-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
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
        {showToast && (
          <ToastNotification
            title={"Error"}
            text={"User or password incorrect. Please try again."}
            onClose={handleCloseToast}
          />
        )}
      </Container>
    </>
  );
}

export default Login;
