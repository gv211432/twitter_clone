import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Register.css";
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../../helpers/axiosInstance';

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    if (userDetails.name && userDetails.email && userDetails.username && userDetails.password) {
      // alert(JSON.stringify(userDetails));
      const res = await axiosInstance.post("/api/auth/register", userDetails);
      toast(res?.data?.msg);
      if (res.status == 200) {
        setUserDetails({
          name: "",
          email: "",
          username: "",
          password: "",
        });
      }
    } else {
      toast("Please fill all the fields!");
    }
  };
  return (
    <Container className='ms-auto'>
      <Row className='main-box mx-auto ' style={{ marginTop: "4rem" }}>
        <Col
          className='bg-primary col-12 col-sm-12 col-md-4 col-lg-5  logo-part'
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
                // style={{ top: "4rem" }}
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
            <h2 style={{ fontWeight: "900" }}>Register</h2>
            <br />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Full Name"
                value={userDetails.name}
                onChange={(e) => setUserDetails(p => ({ ...p, name: e.target.value }))}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email"
                value={userDetails.email}
                onChange={(e) => setUserDetails(p => ({ ...p, email: e.target.value }))}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="text" placeholder="Username"
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

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" checked label="Keep me logged in" />
            </Form.Group>

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

export default Register;
