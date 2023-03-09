import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '../../../config';
import axiosInstance from '../../../helpers/axiosInstance';
import NewTweetModal from './NewTweetModal';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import "./Tweet.css";

const Tweet = ({ isDelete, data, userDetails, setAllTweets }) => {
  const navigate = useNavigate();
  const [showTweetModal, setShowTweetModal] = useState(false);
  const [tweetData, setTweetData] = useState(data);
  const [liked, setLiked] = useState(tweetData?.likes?.includes(userDetails?.id) || false);
  const [commented, setCommented] = useState(tweetData?.replies?.includes(userDetails?.id) || false);
  const [reTweeted, setReTweedted] = useState(tweetData?.retweetedBy?.includes(userDetails?.id) || false);

  // this function will update the latest data on tweet
  const updateTweetData = async () => {
    const res = await axiosInstance.get(`/api/tweet/${data?._id}`);
    if (res.status == 200) {
      setTweetData(p => ({
        ...p,
        likes: res?.data?.data[0].likes,
        replies: res?.data?.data[0].replies,
        retweetedBy: res?.data?.data[0].retweetedBy,
      }));
    }
  };

  const handleTweetDelete = async () => {
    const res = await axiosInstance.delete(`/api/tweet/${tweetData?._id}`);
    if (res.status = 200) {
      toast("Tweet deleted successfully..");
      setAllTweets(p => p.filter((d, i) => (d._id != tweetData?._id)));
    }
  };

  const handleTweetLike = async () => {
    if (liked) axiosInstance.post(`/api/tweet/${tweetData?._id}/dislike`);
    else axiosInstance.post(`/api/tweet/${tweetData?._id}/like`);
    updateTweetData();
    setLiked(p => !p);
  };
  const handleTweetComment = async () => {
    setShowTweetModal(true);
  };
  const handleTweetRetweet = async () => {
    if (!reTweeted) {
      const res = await axiosInstance.post(`/api/tweet/${tweetData?._id}/retweet`);
      if (res.status) {
        toast("Retweeted successfully");
        setTweetData(p => ({ ...p, retweetedBy: [...p?.retweetedBy, userDetails?._id] }));
      }
    } else {
      toast("Already retweed!");
    };
  };
  const handleTweetDetailsOpen = async () => {
    navigate(`/tweet/${tweetData?._id}`);
  };

  return (
    <div>
      <Row style={{ borderRadius: "0.4rem" }} className="m-1 border tweet-row"
      >
        <Col className='fs-3 fw-bold col-auto pt-3' >
          <FontAwesomeIcon
            width={40}
            height={40}
            icon="fa-solid fa-circle-user"
            className='text-dark '
          />
        </Col>
        <Col className='ml-auto lh-2 p-1'>
          <div className='d-flex ps-n1'>
            <FontAwesomeIcon
              width={25}
              height={25}
              icon="fa-solid fa-retweet"
              className='text-success '
              style={{ cursor: "pointer" }}
            />
            <span className='ps-1 pe-3 pt-1 text-muted'
              style={{ fontSize: "0.8rem" }}
            >{"Retweeted by Ram"}
            </span>
          </div>
          <Row style={{ fontSize: "1rem" }}>
            <span>
              <NavLink className={"tweet_username"} to={`/profile/${tweetData?.tweetedBy}`}>
                <span className='fw-bold text-dark tweet_username'>
                  @{tweetData?.tweetedByUsername + " " || "Anonymous "}
                </span>
              </NavLink>
              - <span
                className='text-muted'
                style={{ fontSize: "0.95rem" }}>{new Date(tweetData?.createdAt).toString().substring(0, 16)}</span>
              {isDelete ? <span
                className='ps-2 col-0 offset-0 col-sm-1 offset-sm-1 col-md-2 offset-md-2 col-lg-5 offset-lg-5 col-xl-7 offset-xl-7'
                style={{}}
              >
                <FontAwesomeIcon
                  width={28}
                  height={28}
                  icon="fa-solid fa-trash"
                  className='text-secondary'
                  onMouseEnter={(e) => e.target.clas}
                  onClick={handleTweetDelete}
                  style={{ cursor: "pointer" }}
                /></span> : null}
            </span>
          </Row>
          <Row className='ml-auto lh-0 p-2' style={{ cursor: "pointer" }} onClick={handleTweetDetailsOpen}
          >
            {tweetData?.content || "No tweetData!!"}
          </Row>
          <Row className='ml-auto lh-0' style={{ cursor: "pointer" }} onClick={handleTweetDetailsOpen}
          >
            {tweetData?.image?.length ? <img className='img-fluid'
              style={{
                maxHeight: "500px",
                minHeight: "80px",
                maxWidth: "500px",
                minWidth: "80px",
              }}
              src={`${config.baseURI}/api/user/files/${tweetData?.image[0]}`} alt="tweet" /> : null}
          </Row>
          <Row className='pt-2'>
            <div className='d-flex'>
              <div onClick={handleTweetLike}>
                <FontAwesomeIcon
                  width={30}
                  height={30}
                  icon={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
                  className='text-danger'
                  style={{ cursor: "pointer" }}
                />
              </div>
              <span className='ps-1 pe-3 pt-1' >{tweetData?.likes?.length}</span>
              <div onClick={handleTweetComment}>
                <FontAwesomeIcon
                  width={30}
                  height={30}
                  icon={commented ? "fa-solid fa-comment" : "fa-regular fa-comment"}
                  className='text-primary'
                  style={{ cursor: "pointer" }}
                />
              </div>
              <span className='ps-1 pt-1 pe-3' >{tweetData?.replies?.length}</span>
              <div onClick={handleTweetRetweet}>
                <FontAwesomeIcon
                  width={30}
                  height={30}
                  icon="fa-solid fa-retweet"
                  className='text-success '
                  style={{ cursor: "pointer" }}
                />
              </div>
              <span className='ps-1 pt-1 pe-3' >{tweetData?.retweetedBy?.length}</span>
            </div>
            <Col />
          </Row>
        </Col>
      </Row>
      <NewTweetModal
        showTweetModal={showTweetModal}
        setShowTweetModal={setShowTweetModal}
        setAllTweets={setAllTweets}
        title={"Reply"}
        tweetType={"reply"}
        tweetData={tweetData}
      />
    </div >
  );
};

export default Tweet;
