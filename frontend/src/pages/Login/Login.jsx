import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Login.css";
import axiosInstance from '../../helpers/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';


const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: ""
  });
  // handles the login request
  const handleSubmit = async (e) => {
    if (userDetails.username && userDetails.password) {
      // alert(JSON.stringify(userDetails));
      const res = await axiosInstance.post("/api/auth/login", userDetails);
      toast(res?.data?.msg);
      if (res.status == 200) {
        setUserDetails({
          name: "",
          email: "",
          username: "",
          password: "",
        });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } else {
      toast("Please fill all the fields!");
    }
  };

  return (
    <Container className='ms-auto'>
      <Row className='main-box mx-auto' style={{ marginTop: "4rem" }}>
        <Col
          className='bg-primary col-12 col-sm-12 col-lg-4 logo-part'
          style={{ fontSize: "1rem" }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
            }}>
            <div
              className='img-fluid position-relative top-50 start-50 translate-middle'
              style={{ width: "8rem", padding: "1rem" }}>
              <FontAwesomeIcon
                icon="fa-solid fa-message"
                className='text-light'
              />
            </div>
          </div>
        </Col>
        <Col className='m-3'>
          <Form>
            <br />
            <br />
            <h2 style={{ fontWeight: "900" }}>Login</h2>
            <br />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email or username"
                value={userDetails.username}
                onChange={(e) => setUserDetails(p => ({ ...p, username: e.target.value }))}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password"
                value={userDetails.password}
                onChange={(e) => setUserDetails(p => ({ ...p, password: e.target.value }))}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember me" checked />
                </Form.Group>
              </Col>
              <Col>
                No Account! <NavLink to={"/register"}>Register Now</NavLink>
              </Col>
            </Row>
            <Button variant="primary" type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              Submit
            </Button>
          </Form>
          <br />
          <br />
        </Col>
      </Row>
      <ToastContainer />
    </Container>

  );
};

export default Login;
