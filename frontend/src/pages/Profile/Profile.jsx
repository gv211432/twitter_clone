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
import { useNavigate } from 'react-router-dom';

const StyledCalendar = styled(Calendar)`
  font-size: 1rem !important;
  // background-color: pink;
`;

const Profile = ({ setIsLoggedIn }) => {
  const [privateView, setPrivateView] = useState(true);
  const [showUploadPic, setShowUploadPic] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [calValue, setCalValue] = useState(new Date());
  const [openCal, setOpenCal] = useState(false);
  const [profileDetails, setProfileDetails] = useState(null);
  const [tweetData, setTweetData] = useState(null);
  const rightWindowRef = useRef();
  const [rightWindowWidth, setRigthWindowWidth] = useState(0);
  const [imgFile, setImgFile] = useState(null);
  const [selecteUserImg, setSelecteUserImg] = useState(null);
  const navigate = useNavigate();

  const resetUserProfilePic = () => {
    // this function resets data present in new tweet window
    document.getElementById("input_img_files").value = "";
    setSelecteUserImg(null);
  };

  // this uploads img and new tweet
  const handleFileUpload = async () => {
    if (imgFile) {
      const formData = new FormData();
      formData.append('file', imgFile);
      const res = await axiosInstance.post("/api/user/uploadProfilePic", formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });
      if (res.status == 200) {
        toast("User profile set successfully..");
        resetUserProfilePic();
      }else{
        setIsLoggedIn(false)
        navigate("/")
      }
    }
  };

  // this will trigger on window resize
  window.onresize = () => {
    if (rightWindowRef) {
      setRigthWindowWidth(rightWindowRef.current.clientWidth);
    }
  };

  const fetchData = async () => {
    const res = await axiosInstance.get("/api/user/own");
    if (res.status == 200) {
      const { tweet_data, ...rest } = res?.data?.data;
      setProfileDetails(rest);
      setTweetData(tweet_data);
      sessionStorage.setItem("user_datails", JSON.stringify(res?.data?.data));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditProfile = async () => {
    const res = await axiosInstance.post("/api/edit_user/own", profileDetails);
    if (res.status == 200) {
      toast(res?.data?.msg);
    }
  };

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
                      // backgroundImage: `url("data:image/png;base64,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")`
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundImage: profileDetails?.profile_pic_url ? `url("${config.baseURI}/api/user/files/${profileDetails?.profile_pic_url}")`
                        : `url("https://th.bing.com/th/id/OIP.muQNuK_IB08mkrHJGc2dPQHaHa?w=173&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7")`
                      // `url(data:image/png;base64,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)`
                      // backgroundImage: `url("https://thumbs.dreamstime.com/b/cartoon-badger-basketball-illustration-playing-47478150.jpg")`
                    }}
                    >
                      {/* <img className='img-fluid ' src="https://thumbs.dreamstime.com/b/cartoon-badger-basketball-illustration-playing-47478150.jpg" alt="" srcset="" /> */}
                    </div>
                  </Col>
                  <Col className='col'>

                  </Col>
                </Row>
                <Row style={{ width: "100%", }} className="mx-auto">
                  <Row className=''>
                    <Col className=''></Col>
                    {privateView ?
                      <Col className='col-7 offset-7 col-md-6 offset-md-6 col-lg-5 offset-lg-5'>
                        <Button className='btn mt-3 border-primary btn-light text-primary ps-3 pe-3 me-3'
                          onClick={() => setShowUploadPic(true)}
                        >Upload Profile Pic</Button>
                        <Button className='btn btn-light border-dark mt-3 text-dark ps-3 pe-3'
                          onClick={() => setShowEditProfile(true)}
                        >Edit</Button>
                      </Col>
                      : <Col className='col-3 offset-3 col-md-2 offset-md-2'
                        style={{ alignItems: "right" }}>
                        <Button className='mt-3 bg-dark text-light ps-3 pe-3'>Follow</Button>
                      </Col>
                    }
                  </Row>
                  <Row className='pt-3'>
                    <Col className='col-auto'>
                      <br />
                      <span className='fs-5 fw-bold'>
                        {profileDetails?.name || "No name!"}
                      </span>
                      <br />
                      @{profileDetails?.username || "No username!!"}
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
                        />{profileDetails?.date_of_birth || "No Date of Birth!!"}
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
                      />{profileDetails?.location || "No Location!!"}
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


          {/* this modal is used for uploading profile pic */}
          <Modal show={showUploadPic} onHide={() => setShowUploadPic(false)}
            className=""
          >
            <Modal.Header closeButton>
              <Modal.Title>Upload Profile Pic</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Control
                  id={"input_img_files"}
                  type="file"
                  name="file"
                  size="sm"
                  onChange={(e) => {
                    const reader = new FileReader();
                    setImgFile(e.target.files[0]);
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onload = (e) => {
                      setSelecteUserImg(e.target.result);
                    };
                  }}
                />
                <center>
                  <img className='img-fluid pt-2' hidden={!selecteUserImg} src={selecteUserImg} alt="Invalid Format!" />
                </center>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger"
                onClick={resetUserProfilePic}>
                Clear
              </Button>
              <Button variant="secondary" onClick={() => setShowUploadPic(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => {
                handleFileUpload();
                setShowUploadPic(false);
              }}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>


          {/* this modal is used for editing the profile */}
          <Modal show={showEditProfile} onHide={() => setShowEditProfile(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit the profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Full Name"
                    value={profileDetails?.name}
                    onChange={(e) => setProfileDetails(p => ({ ...p, name: e.target.value }))}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Loacation</Form.Label>
                  <Form.Control type="text" placeholder="Location"
                    value={profileDetails?.location}
                    onChange={(e) => setProfileDetails(p => ({ ...p, location: e.target.value }))}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Date Of Birth</Form.Label>
                  <InputGroup>
                    <Form.Control type="text" placeholder="Date Of Birth"
                      value={profileDetails?.date_of_birth}
                      onChange={(e) => setProfileDetails(p => ({ ...p, date_of_birth: e.target.value }))}
                    />
                    <InputGroup.Text>
                      <FontAwesomeIcon
                        width={30}
                        height={30}
                        icon={openCal ? "fa-solid fa-calendar" : "fa-regular fa-calendar"}
                        className='text-dark'
                        style={{ cursor: "pointer" }}
                        onClick={() => setOpenCal(p => !p)}
                      />
                    </InputGroup.Text>
                  </InputGroup>
                  <div
                    style={{
                      position: "absolute", scale: "1.6",
                      paddingTop: "2.5rem", paddingLeft: "2.5rem"
                    }}>
                    {openCal && <StyledCalendar value={calValue} className="fs-5"
                      onChange={(d) => {
                        setCalValue(d);
                        setProfileDetails(p => ({ ...p, date_of_birth: d.toString().substring(0, 16) }));
                      }} />}
                  </div>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEditProfile(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => {
                setShowEditProfile(false);
                // alert(JSON.stringify(profileDetails));
                handleEditProfile();
              }}>
                Edit
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div >
    </>
  );
};

export default Profile;
