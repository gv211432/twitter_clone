import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tweet from './components/Tweet';
import "./Home.css";
import Sidebar from './components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from '../Profile/Profile';
import axiosInstance from '../../helpers/axiosInstance';
import NewTweetModal from './components/NewTweetModal';

const Home = ({ setIsLoggedIn }) => {
  const [showTweetModal, setShowTweetModal] = useState(false);
  const [allTweets, setAllTweets] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const rightWindowRef = useRef();
  const [rightWindowWidth, setRigthWindowWidth] = useState(0);

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
      toast("Already logged in...");
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleNewTweet = async (e) => {
    setShowTweetModal(true);
  };

  const fetchData = async () => {
    const res = await axiosInstance.get("/api/tweet");
    if (res.status == 200) {
      setAllTweets(res?.data?.data);
    }
  };

  useEffect(() => {
    checkLoginStatus();
    fetchData();
  }, []);

  return (
    <>
      <Container className='container-fluid'
        style={{
          minHeight: "100vh",
          width: "100%",
          overflowY: "scroll", overflowX: "hidden",
        }} >
        <Row>
          {/* This is the sidebar with slide sidebar on small screen */}
          <Sidebar setIsLoggedIn={setIsLoggedIn} />
          <Col
            ref={node => {
              if (node) setRigthWindowWidth(node.clientWidth);
              rightWindowRef.current = node;
            }}
            className='border'
            style={{
              position: "relative",
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
              }}
              className="border p-1">
              <Col className='fs-3 fw-bold'>
                <Button className="btn btn-light border me-1 d-md-none d-lg-none" type="button" data-bs-toggle="offcanvas"
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
                Home
              </Col>
              <Col className='mx-auto col-md-3' />
              <Col className=' ml-auto col-auto'>
                <Button className='btn-primary ps-4 pe-4'
                  onClick={handleNewTweet}
                >Tweet</Button></Col>
              <ToastContainer />
            </Row>
            <br />
            <Row className='pb-3 pt-3' />
            {allTweets?.map((data, index) => {
              return <Tweet
                key={data?._id}
                isDelete={data?.user[0]._id == userDetails.id}
                data={data}
                userDetails={userDetails}
                setAllTweets={setAllTweets}
              />;
            })}
          </Col>
        </Row>
      </Container >
      <NewTweetModal
        showTweetModal={showTweetModal}
        setShowTweetModal={setShowTweetModal}
        setAllTweets={setAllTweets}
        title={"New Tweet"}
      />
    </>
  );
};

export default Home;
