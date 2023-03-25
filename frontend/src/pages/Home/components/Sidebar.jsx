import React, { useContext } from 'react';
import SliderSidebar from './SliderSidebar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from '../../../helpers/axiosInstance';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../context/userContext';
import config from '../../../config';
import { toast, ToastContainer } from 'react-toastify';

const Sidebar = ({ setIsLoggedIn }) => {
  const { userDetails } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    setIsLoggedIn(false);
    navigate("/");
    const res = axiosInstance.post("/api/auth/logout");
    res.then(() => {
      toast("Logged out....");
    });
  };
  return (
    <>
      <Col className='mx-auto border bg-light col-md-3 col-lg-3 d-none d-sm-none d-md-block'
        style={{
          // border: "2px solid black",
          position: "relative"
        }}
      ><ToastContainer />
        <Row
          className='p-1 pt-3'
        // style={{ width: "3rem", padding: "0.4rem", textAlign: "center" }}
        >
          <center>
            <FontAwesomeIcon
              width={60}
              height={60}
              icon="fa-solid fa-message"
              className='text-primary pe-2'
            />
            <span className='d-md-none d-lg-inline'>
              Twitter Clone
            </span>
          </center>
        </Row>
        <Button className='btn menu-buttons  mt-3'
          onClick={() => { navigate("/"); }}
          style={{ fontSize: "1rem", width: "100%", borderRadius: "1.2rem" }}>
          <Row className='mx-auto'>
            <div className='d-flex'>
              <FontAwesomeIcon
                width={30}
                height={30}
                icon="fa-solid fa-house"
                className='text-dark me-2'
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
                className='text-dark me-2'
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
                className='text-dark me-2'
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
              <div className='d-flex'
                onClick={() => {
                  navigate("/profile");
                }}              >
                <FontAwesomeIcon
                  width={40}
                  height={40}
                  icon="fa-solid fa-circle-user"
                  className='text-dark me-2'
                />
                <span style={{ textAlign: "left" }} className="pt-1">
                  <span className='ps-1 text-dark' >{userDetails?.name || "No name!!"}</span>
                  <br />
                  <span className='text-dark ps-1 pt-1 text-muted' style={{ fontSize: "0.8rem", textAlign: "left" }}>
                    @{userDetails?.username || "No username!!"}
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
