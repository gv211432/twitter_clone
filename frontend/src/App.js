import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Home from './pages/Home/Home';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Profile from './pages/Profile/Profile';
import Tweet from './pages/Tweet/Tweet';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import { useEffect, useState } from 'react';
import axiosInstance from './helpers/axiosInstance';
import { toast } from 'react-toastify';
import TweetPage from './pages/Tweet/Tweet';
import OthersProfile from './pages/Profile/OthersProfile';
config.autoAddCss = false;
library.add(far, fas);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const checkLoginStatus = async () => {
    const res = await axiosInstance.get("/api/user/own");
    if (res.status == 200) {
      setIsLoggedIn(true);
      setUserDetails(res?.data?.data);
      // toast("Already logged in...");
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          {isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn} /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        </>
      ),
    },
    {
      path: "/profile/:id",
      element: <>
        <OthersProfile setIsLoggedIn={setIsLoggedIn} />
      </>
    },
    {
      path: "/profile",
      element: <>
        <Profile setIsLoggedIn={setIsLoggedIn} />
      </>
    },
    {
      path: "/register",
      element: <>
        <Register />
      </>
    },

    {
      path: "/tweet/:id",
      element: <>
        <TweetPage />
      </>
    },
    {
      path: "*",
      element: <>
        {isLoggedIn ? <Home /> : <Login />}
      </>,
    },
  ]);

  return (<div
    style={{
      width: "100%",
      overflow: "hidden"
    }}>
    <RouterProvider router={router} />
  </div>
  );
}

export default App;
