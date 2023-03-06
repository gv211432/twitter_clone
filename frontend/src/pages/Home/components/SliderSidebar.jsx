import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';

const SliderSidebar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    const res = axiosInstance.post("/api/auth/logout");
    res.then(() => {
      setIsLoggedIn(false);
    });
  };
  return (
    <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Twitter Clone</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="row" style={{ justifyContent: "center" }}>
        <div style={{
          height: "10rem",
          width: "10rem",
          borderRadius: "50%",
          backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6qINZFwU7hzkmDwMnOp4_-GnUmtocMjBcRw&usqp=CAU")`
        }}
        >
        </div>
      </div>
      <div className="offcanvas-body" style={{ marginTop: "-4rem" }}>
        <div
          className=' pb-3'
          style={{ width: "3rem", padding: "0.4rem", textAlign: "center" }}>
          <FontAwesomeIcon
            icon="fa-solid fa-message"
            className='text-light'
          />
        </div>
        <Button className='btn-primary mt-3'
          onClick={() => { navigate("/"); }}
          style={{ fontSize: "1rem", width: "100%", borderRadius: "1.2rem" }}>
          <Row className='mx-auto'>
            <div className='d-flex'>
              <FontAwesomeIcon
                width={30}
                icon="fa-solid fa-house"
                className='text-light'
              />
              <span className='ps-1 pt-1' >Home</span>
            </div>
            <Col />
          </Row>
        </Button>
        <Button className='btn-primary mt-3'
          onClick={() => { navigate("/profile"); }}
          style={{ fontSize: "1rem", width: "100%", borderRadius: "1.2rem" }}>
          <Row className='mx-auto'>
            <div className='d-flex'>
              <FontAwesomeIcon
                width={24}
                icon="fa-solid fa-user"
                className='text-light'
              />
              <span className='ps-1 pt-1' >Profile</span>
            </div>
            <Col />
          </Row>
        </Button>
        <Button className='btn-primary mt-3'
          onClick={handleLogout}
          style={{ fontSize: "1rem", width: "100%", borderRadius: "1.2rem" }}>
          <Row className='mx-auto'>
            <div className='d-flex'>
              <FontAwesomeIcon
                width={28}
                icon="fa-solid fa-right-from-bracket"
                className='text-light'
              />
              <span className='ps-1 pt-1' >Logout</span>
            </div>
            <Col />
          </Row>
        </Button>
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            width: "calc(100% - 2.2rem)"
          }}
        >
          <Button className='btn-primary mt-3 mx-auto'
            style={{
              fontSize: "1rem", width: "100%",
              borderRadius: "1.2rem", marginTop: "11rem"
            }}>
            <Row className='mx-auto'>
              <div className='d-flex'>
                <FontAwesomeIcon
                  width={30}
                  icon="fa-solid fa-circle-user"
                  className='text-light'
                />
                <span className='ps-1 pt-1' >Gaurav </span>
              </div>
              <Col />
            </Row>
          </Button>
        </div>
      </div>
    </div>);
};

export default SliderSidebar;
