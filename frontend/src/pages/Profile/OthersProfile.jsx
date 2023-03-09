import React, { useEffect, useRef, useState } from 'react';
import "./Profile.css";
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Home/components/Sidebar';
import Tweet from '../Home/components/Tweet';
import Modal from 'react-bootstrap/Modal';
import Calendar from 'moedim';
import styled from 'styled-components';
import axiosInstance from '../../helpers/axiosInstance';
import config from '../../config';
import { useNavigate, useParams } from 'react-router-dom';

const OthersProfile = ({ setIsLoggedIn }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [profileDetails, setProfileDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [tweetData, setTweetData] = useState(null);
  const rightWindowRef = useRef();
  const [rightWindowWidth, setRigthWindowWidth] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  // this will trigger on window resize
  window.onresize = () => {
    if (rightWindowRef) {
      setRigthWindowWidth(rightWindowRef.current.clientWidth);
    }
  };

  useEffect(() => {
    if (userDetails && profileDetails) {
      setIsFollowing(profileDetails?.followers.includes(userDetails?.id));
    }
  }, [userDetails, profileDetails]);

  const fetchData = async () => {
    const res = await axiosInstance.get(`/api/user/${params.id}`);
    if (res.status == 200) {
      const { tweet_data, ...rest } = res?.data?.data;
      setProfileDetails(rest);
      setTweetData(tweet_data);
    }
    const res2 = await axiosInstance.get(`/api/user/own`);
    if (res2.status == 200) {
      const { tweet_data, ...rest } = res2?.data?.data;
      setUserDetails(rest);
    } else {
      setIsLoggedIn(false);
      navigate("/");
    };
  };

  const handelFollowRequest = async () => {
    if (isFollowing) {
      const res = await axiosInstance.post(`/api/user/${params.id}/unfollow`);
      if (res.status == 200) {
        setIsFollowing(false);
      }
    } else {
      const res = await axiosInstance.post(`/api/user/${params.id}/follow`);
      if (res.status == 200) {
        setIsFollowing(true);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <Container className='' style={{ minHeight: "100vh", overflowY: "scroll", overflowX: "hidden", }} >
          <Row>
            {/* Col-1 This is the sidebar with slide sidebar on small screen */}
            <Sidebar setIsLoggedIn={setIsLoggedIn} />
            {/* Col-2 This is the content area*/}
            <Col
              className='border'
              style={{
                //  border: "2px solid black",
                height: "100vh",
                overflowX: "scroll",
              }}
              ref={node => {
                if (node) setRigthWindowWidth(node.clientWidth);
                rightWindowRef.current = node;
              }}
            >
              <Row
                className="border-bottom p-1"
                style={{
                  position: "fixed",
                  width: `${rightWindowWidth}px`,
                  backgroundColor: "#EAF7FF",
                  zIndex: "2",
                }}
              >
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
                  Profile
                </Col>
              </Row>
              <br />
              <Row>
                <Row style={{ height: "13rem" }} className="bg-primary mx-auto">
                  <Col className='col-auto'
                    style={{ position: "relative" }}
                  >
                    <div style={{
                      position: "absolute",
                      height: "10rem",
                      width: "10rem",
                      top: "8rem",
                      borderRadius: "50%",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundImage: profileDetails?.profile_pic_url ? `url("${config.baseURI}/api/user/files/${profileDetails?.profile_pic_url}")`
                        : `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6qINZFwU7hzkmDwMnOp4_-GnUmtocMjBcRw&usqp=CAU")`
                    }}
                    >
                    </div>
                  </Col>
                  <Col className='col'>

                  </Col>
                </Row>
                <Row style={{ width: "100%", }} className="mx-auto">
                  <Row className=''>
                    <Col className=''></Col>
                    <Col className='col-3 offset-3 col-md-2 offset-md-2'
                      style={{ alignItems: "right" }}>
                      {isFollowing
                        ? <Button className='mt-3 bg-success text-light ps-3 pe-3'
                          onClick={handelFollowRequest}
                        >Following</Button>
                        : <Button className='mt-3 bg-dark text-light ps-3 pe-3'
                          onClick={handelFollowRequest}
                        >Follow</Button>
                      }
                    </Col>
                  </Row>
                  <Row className='pt-3'>
                    <Col className='col-auto'>
                      <br />
                      <span className='fs-5 fw-bold'>
                        {profileDetails?.name}
                      </span>
                      <br />
                      @{profileDetails?.username}
                    </Col>
                    <Col className=''>
                    </Col>
                  </Row>
                  <Row className='pt-3'>
                    <Col className='col-6'>
                      <span>
                        <FontAwesomeIcon
                          width={33}
                          height={33}
                          icon="fa-solid fa-cake-candles"
                          className='text-dark pe-2'
                        />{profileDetails?.date_of_birth}
                      </span><br />
                      <span><FontAwesomeIcon
                        width={33}
                        height={33}
                        icon="fa-solid fa-briefcase"
                        className='text-dark pe-2'
                      />{"No Work place"}</span>
                    </Col>
                    <Col className='col-6'>
                      <FontAwesomeIcon
                        width={33}
                        height={33}
                        icon="fa-solid fa-location-dot"
                        className='text-dark pe-2'
                      />{profileDetails?.location}
                    </Col>
                  </Row>
                  <Row className='pt-3 pb-2'>
                    <Col className='col-6 col-md-4 col-lg-3 fw-bolder'>
                      {profileDetails?.following?.length} Following
                    </Col>
                    <Col className='fw-bolder'>
                      {profileDetails?.followers?.length} Followers
                    </Col>
                  </Row>
                  <hr className='text-secondary' />
                  <Row className='pt-1'>
                    <center className='fs-5 fw-bolder pt-3 pb-3'>Tweets and Replies</center>
                    {tweetData?.map(data => {
                      return <Tweet
                        key={data?._id}
                        data={data}
                        userDetails={profileDetails}
                        isDelete={data?.tweetedBy == profileDetails?.id}
                      />;
                    })}
                  </Row>
                </Row>
              </Row>
            </Col>
          </Row>
        </Container>
      </div >
    </>
  );
};

export default OthersProfile;
