import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';
import UserContext from '../../../context/userContext';
import config from '../../../config';

const SliderSidebar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { userDetails } = useContext(UserContext);

  const handleLogout = async (e) => {
    const res = axiosInstance.post("/api/auth/logout");
    res.then(() => {
      setIsLoggedIn(false);
      navigate("/");
    });
  };

  return (
    <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
          <Row
            className=' pb-3'
          // style={{ width: "3rem", padding: "0.4rem", textAlign: "center" }}
          >
            <span>
              <FontAwesomeIcon
                width={60}
                height={60}
                icon="fa-solid fa-message"
                className='text-light pe-2'
              />
              Twitter Clone
            </span>
          </Row>
        </h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="row" style={{ justifyContent: "center" }}>
        <div style={{
          height: "10rem",
          width: "10rem",
          borderRadius: "50%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: userDetails?.profile_pic_url ? `url("${config.baseURI}/api/user/files/${userDetails?.profile_pic_url}")`
            : `url("https://th.bing.com/th/id/OIP.muQNuK_IB08mkrHJGc2dPQHaHa?w=173&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7")`
        }}
        >
        </div>
      </div>
      <div className="offcanvas-body" style={{ marginTop: "1rem" }}>
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
            width: "calc(100% - 3.6rem)"
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
      </div>
    </div>);
};

export default SliderSidebar;
