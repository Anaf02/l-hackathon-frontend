import { Button, Col, Form,Container, Row  } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useAxios } from "../components/Context/AuthContext/SimpleAxiosContextWithAuth";
import { SimpleUserModel } from "../components/Context/AuthContext/SimpleUserModel";
import "./Login.css";
import "./Home.css";
import ToastNotification from "../components/ToastNotification";
import { useNavigate } from "react-router-dom";
import { simpleAuthContext } from "../components/Context/AuthContext/SimpleAuthContext";



function Login() {

  const [username, setUsername] = useState<string>("1");
  const [password, setPassword] = useState<string>("1");
  const [users, setUsers] = useState<SimpleUserModel[]>([]);
  const navigate = useNavigate();
  const { login } = useContext(simpleAuthContext);
  const { axiosApi } = useAxios();

  console.log("test");
  useEffect(() => {
    if (axiosApi) {
      axiosApi.get<SimpleUserModel[]>("user").then((res) => {
        setUsers(res.data);
      }).catch((error) => {
        console.error("Error fetching users", error);
      });
      console.log(users);
    }
  }, [axiosApi]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginModel = { username, password };
    //console.log(loginModel);
    //console.log("test");
    //console.log(users);
    const userExists = Object.values(users).some(user => user.username === username && user.password === password);
    if (userExists) {
        //const user = Object.values(users).find(user => user.username === username && user.password === password);
        console.log("Login successful!");
        navigate('/Contracts');  // Navigate to the Contracts page on successful login
    } else {
        console.log("Login failed!");  // Debug log for a failed login
        setShowToast(true);  // Show the toast notification on failure
    }
  };

  const [showToast, setShowToast] = useState(false);

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <>
      <img
        src="/pictures/login_Background.webp"
        id="backgroundPicture"
      />
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
