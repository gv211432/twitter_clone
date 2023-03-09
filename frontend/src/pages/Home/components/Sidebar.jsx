import React from 'react';
import SliderSidebar from './SliderSidebar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from '../../../helpers/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    const res = axiosInstance.post("/api/auth/logout");
    res.then(() => {
      setIsLoggedIn(false);
      navigate("/");
    });
  };
  return (
    <>
      <Col className='mx-auto border bg-light col-md-3 col-lg-3 d-none d-sm-none d-md-block'
        style={{
          // border: "2px solid black",
          position: "relative"
        }}
      >
        <div
          className=' pb-3'
          style={{ width: "3rem", padding: "0.4rem", textAlign: "center" }}>
          <FontAwesomeIcon
            icon="fa-solid fa-message"
            className='menu-logo'
          />
        </div>
        <Button className='btn menu-buttons  mt-3'
          onClick={() => { navigate("/"); }}
          style={{ fontSize: "1rem", width: "100%", borderRadius: "1.2rem" }}>
          <Row className='mx-auto'>
            <div className='d-flex'>
              <FontAwesomeIcon
                width={30}
                height={30}
                icon="fa-solid fa-house"
                className='text-dark'
              />
              <span className='ps-1 text-dark pt-1' >Home</span>
            </div>
            <Col />
          </Row>
        </Button>
        <Button className='btn menu-buttons mt-3'
          onClick={() => { navigate("/profile"); }}
          style={{ fontSize: "1rem", width: "100%", borderRadius: "1.2rem" }}>
          <Row className='mx-auto'>
            <div className='d-flex'>
              <FontAwesomeIcon
                width={24}
                icon="fa-solid fa-user"
                className='text-dark'
              />
              <span className='ps-1 text-dark pt-1' >Profile</span>
            </div>
            <Col />
          </Row>
        </Button>
        <Button className='btn menu-buttons mt-3'
          onClick={handleLogout}
          style={{ fontSize: "1rem", width: "100%", borderRadius: "1.2rem" }}>
          <Row className='mx-auto'>
            <div className='d-flex'>
              <FontAwesomeIcon
                width={28}
                icon="fa-solid fa-right-from-bracket"
                className='text-dark'
              />
              <span className='ps-1 text-dark pt-1'
              >Logout</span>
            </div>
            <Col />
          </Row>
        </Button>
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            width: "calc(100% - 1.6rem)"
          }}
        >
          <Button className='btn menu-buttons mt-3'
            style={{
              fontSize: "1rem", width: "100%",
              borderRadius: "1.2rem", marginTop: "11rem"
            }}>
            <Row className='mx-auto lh-1'>
              <div className='d-flex'>
                <FontAwesomeIcon
                  width={30}
                  height={30}
                  icon="fa-solid fa-circle-user"
                  className='text-dark'
                />
                <span style={{ textAlign: "left" }}>
                  <span className='ps-1 text-dark pt-1' >Gaurav Vishwakarama</span>
                  <br />
                  <span className='text-dark ps-1 pt-1 text-muted' style={{ fontSize: "0.8rem", textAlign: "left" }}>
                    @great
                  </span>
                </span>
              </div>
              <Col />
            </Row>
          </Button>
        </div>
      </Col>
      <SliderSidebar setIsLoggedIn={setIsLoggedIn} />
    </>
  );
};

export default Sidebar;
