import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axiosInstance from '../../../helpers/axiosInstance';

const NewTweetModal = ({ showTweetModal, setShowTweetModal,
  setAllTweets, title, tweetType, tweetData }) => {
  const [tweetContent, setTweetContent] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [selecteTweetImg, setSelecteTweetImg] = useState(null);

  const resetNewTweetModal = () => {
    // this function resets data present in new tweet window
    const img_files = (document.getElementById("input_img_files"));
    img_files.value = "";
    setSelecteTweetImg(null);
    setTweetContent("");
  };

  // this uploads img and new tweet
  const handleFileUpload = async () => {
    if (!tweetContent) {
      toast("No tweet content!!");
    }
    if (imgFile) {
      const formData = new FormData();
      formData.append('file', imgFile);
      const res = await axiosInstance.post("/api/user/upload", formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });
      if (res.status == 200 && res?.data?.file?.filename) {
        const payload = {
          content: tweetContent,
          img_urls: res?.data?.file?.filename ? [res?.data?.file?.filename] : []
        };
        const tweet_res = tweetType == "reply"
          ? await axiosInstance.post(`/api/tweet/${tweetData?._id}/reply`, payload)
          : await axiosInstance.post("/api/tweet", payload);
        console.log(tweet_res);

        if (tweet_res.status == 200) {
          resetNewTweetModal();
          setAllTweets(p => [tweet_res?.data?.data, ...p]);
          toast("Successfully tweeted..");
        }
      }
    } else {
      const payload = {
        content: tweetContent,
        img_urls: []
      };
      const tweet_res = tweetType == "reply"
        ? await axiosInstance.post(`/api/tweet/${tweetData?._id}/reply`, payload)
        : await axiosInstance.post("/api/tweet", payload);

      console.log(tweet_res);

      if (tweet_res.status == 200) {
        toast("Successfully tweeted..");
        resetNewTweetModal();
        setAllTweets(p => [tweet_res?.data?.data, ...p]);
      }
    }
  };

  return (
    <Modal show={showTweetModal} onHide={() => setShowTweetModal(false)}
      className=""
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control as="textarea"
              placeholder="What's on your mind..."
              id={"tweet_textarea"}
              rows={3}
              ref={node => {
                if (node) node.focus();
              }}
              value={tweetContent}
              onChange={(e) => setTweetContent(p => (e.target.value))}
            />
          </Form.Group>
          <Form.Group className="">
            <Form.Label>
              <FontAwesomeIcon
                width={35}
                height={35}
                icon="fa-solid fa-image"
                className='text-dark pe-2'
              />
              Select a {title} image
            </Form.Label>
          </Form.Group>
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
                setSelecteTweetImg(e.target.result);
              };
            }}
          />
          <center>
            <img className='img-fluid pt-2' hidden={!selecteTweetImg} src={selecteTweetImg} alt="Invalid Format!" />
          </center>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger"
          onClick={resetNewTweetModal}>
          Clear
        </Button>
        <Button variant="secondary" onClick={() => setShowTweetModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => {
          setShowTweetModal(false);
          handleFileUpload(); // makes calls for img upload and finally tweet
        }}>
          Tweet
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewTweetModal;
