require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require("fs");
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session-jwt');
var passport = require("passport");
require('./database/db'); // initiating connection with mongodb
const public_key = fs.readFileSync("./cert/public-key.pem");
const private_key = fs.readFileSync("./cert/private-key.pem");

// importing all routes
var indexRouter = require('./routes/index');
var helloRouter = require('./routes/hello');
var registerRouter = require('./routes/auth/register');
var loginRouter = require('./routes/auth/login');
var uploadRouter = require('./routes/user/upload');

// apis for user
var editUserRouter = require('./routes/user/edit_user');
var fetchTweetsRouter = require('./routes/user/fetch_tweets');
var fetchUserRouter = require('./routes/user/fetch_user');
var followUserRouter = require('./routes/user/follow_user');
var unfollowUserRouter = require('./routes/user/unfollow_user');

// api for tweets
var deleteTweetRouter = require('./routes/tweet/delete_tweet');
var dislikeTweetRouter = require('./routes/tweet/dislike_tweet');
var fetchAllTweetRouter = require('./routes/tweet/fetch_all_tweets');
var fetchTweetRouter = require('./routes/tweet/fetch_tweet');
var likeTweetRouter = require('./routes/tweet/like_tweet');
var replyTweetRouter = require('./routes/tweet/reply');
var retweetRouter = require('./routes/tweet/retweet');
var tweetRouter = require('./routes/tweet/tweet');

var app = express();
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000",
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.set('trust proxy', 1) // trust first proxy
// adding session middleware in express app
app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  cookie: {
    maxAge: 1000 * 60 * 10, // 10 min
    secure: false,
  },
  resave: false,
  saveUninitialized: false,
  keys: {
    public: public_key.toString(),
    private: private_key.toString(),
  },
  path: "/"
}));
app.use(passport.authenticate('session'));

// mounting all routes
app.use('/', indexRouter);
app.use('/', helloRouter);
app.use('/api', registerRouter);
app.use('/api', loginRouter);
app.use('/api', uploadRouter);

app.use('/api', editUserRouter);
app.use('/api', fetchTweetsRouter);
app.use('/api', fetchUserRouter);
app.use('/api', followUserRouter);
app.use('/api', unfollowUserRouter);

app.use('/api', deleteTweetRouter);
app.use('/api', dislikeTweetRouter);
app.use('/api', fetchAllTweetRouter);
app.use('/api', fetchTweetRouter);
app.use('/api', likeTweetRouter);
app.use('/api', replyTweetRouter);
app.use('/api', retweetRouter);
app.use('/api', tweetRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  app.set('trust proxy', 1); // trust first proxy
  req.session.cookie.secure = true; // serve secure cookies
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
