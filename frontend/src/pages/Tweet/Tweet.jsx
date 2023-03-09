import React, { useEffect, useRef, useState } from 'react';
import "./Tweet.css";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Home/components/Sidebar';
import Tweet from '../Home/components/Tweet';
import Modal from 'react-bootstrap/Modal';
import axiosInstance from '../../helpers/axiosInstance';
import { useParams } from 'react-router-dom';

const TweetPage = ({ setIsLoggedIn }) => {
  const params = useParams();
  const [privateView, setPrivateView] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [showUploadPic, setShowUploadPic] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const rightWindowRef = useRef();
  const [rightWindowWidth, setRigthWindowWidth] = useState(0);
  const [currTweetData, setCurrTweetData] = useState(null);

  // this will trigger on window resize
  window.onresize = () => {
    if (rightWindowRef) {
      setRigthWindowWidth(rightWindowRef.current.clientWidth);
    }
  };

  // this check the login status of the user
  const checkLoginStatus = async () => {
    const res = await axiosInstance.get("/api/user/own");
    if (res.status == 200) {
      setIsLoggedIn(true);
      setUserDetails(res?.data?.data);
    } else {
      setIsLoggedIn(false);
    }
  };

  const fetchData = async () => {
    const res = await axiosInstance.get(`/api/tweet/${params.id}`);
    if (res.status == 200) {
      setCurrTweetData(res?.data?.data[0]);
    }
  };

  useEffect(() => {
    checkLoginStatus();
    fetchData();
  }, []);

  return (
    <>
      <div>
        <Container className='' style={{ minHeight: "100vh", overflowY: "scroll", overflowX: "hidden", }} >
          <Row>
            {/* Col-1 This is the sidebar with slide sidebar on small screen */}
            <Sidebar />
            {/* Col-2 This is the content area*/}
            <Col
              className='border'
              ref={node => {
                if (node) setRigthWindowWidth(node.clientWidth);
                rightWindowRef.current = node;
              }}
              style={{
                //  border: "2px solid black",
                height: "100vh",
                overflowX: "scroll",
              }}
            >
              <Row
                style={{
                  position: "fixed",
                  width: `${rightWindowWidth}px`,
                  backgroundColor: "#EAF7FF",
                  zIndex: "2",
                }} className="border-bottom p-1">
                <Col className='fs-3 fw-bold'>
                  <Button className="btn btn-light border me-1 d-md-none d-lg-none"
                    type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasWithBothOptions"
                    aria-controls="offcanvasWithBothOptions">
                    <FontAwesomeIcon
                      width={30}
                      height={30}
                      icon="fa-solid fa-bars"
                      className='text-dark'
                    />
                    <Col />
                  </Button>
                  Tweet
                </Col>
              </Row>
              <br />
              <Row className='mt-3 pt-3' />
              {/* <Tweet /> */}
              <Tweet
                key={currTweetData?._id}
                data={currTweetData}
                userDetails={userDetails}
              />
              <Row>
                <span className='fs-5 fw-bold'>Relpies</span>
              </Row>
              {currTweetData?.reply_arr?.map((data, i) => {
                return <Tweet
                  key={data?._id}
                  data={data}
                  userDetails={userDetails}
                  isDelete={data?.tweetedBy == userDetails?.id}
                />;
              })}
              {/* <Tweet />
              <Tweet isDelete />
              <Tweet />
              <Tweet isDelete />
              <Tweet />
              <Tweet isDelete />
              <Tweet />
              <Tweet isDelete /> */}

            </Col>
          </Row>
          {/* this modal is used for uploading profile pic */}
          <Modal show={showUploadPic} onHide={() => setShowUploadPic(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Upload Profile Pic</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowUploadPic(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => setShowUploadPic(false)}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          {/* this modal is used for editing the profile */}
          <Modal show={showEditProfile} onHide={() => setShowEditProfile(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit the profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEditProfile(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => setShowEditProfile(false)}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default TweetPage;
