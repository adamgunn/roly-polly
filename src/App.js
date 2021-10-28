var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import Comment from './Comment.js';
import Form from './Form.js';
import Button from './Button.js';
import Poll from './Poll.js';
import CreatePoll from './CreatePoll.js';

function App(props) {
  var _React$createElement;

  useEffect(function () {
    setSocket(io(window.location.host));
    return function () {
      socket.disconnect();
    };
  }, []);

  var pollId = window.location.pathname.slice(7);

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      socket = _useState2[0],
      setSocket = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      comments = _useState4[0],
      setComments = _useState4[1];

  var _useState5 = useState(''),
      _useState6 = _slicedToArray(_useState5, 2),
      title_input = _useState6[0],
      setTitleInput = _useState6[1];

  var _useState7 = useState(''),
      _useState8 = _slicedToArray(_useState7, 2),
      comment_input = _useState8[0],
      setCommentInput = _useState8[1];

  var _useState9 = useState(''),
      _useState10 = _slicedToArray(_useState9, 2),
      last_title = _useState10[0],
      setLastTitle = _useState10[1];

  var _useState11 = useState(''),
      _useState12 = _slicedToArray(_useState11, 2),
      last_comment = _useState12[0],
      setLastComment = _useState12[1];

  var _useState13 = useState(false),
      _useState14 = _slicedToArray(_useState13, 2),
      connected = _useState14[0],
      setConnected = _useState14[1];

  var _useState15 = useState(false),
      _useState16 = _slicedToArray(_useState15, 2),
      poll_created = _useState16[0],
      setPollCreated = _useState16[1];

  var _useState17 = useState(""),
      _useState18 = _slicedToArray(_useState17, 2),
      poll_title = _useState18[0],
      setPollTitle = _useState18[1];

  var _useState19 = useState([]),
      _useState20 = _slicedToArray(_useState19, 2),
      colors = _useState20[0],
      setColors = _useState20[1];

  var _useState21 = useState([]),
      _useState22 = _slicedToArray(_useState21, 2),
      options = _useState22[0],
      setOptions = _useState22[1];

  var counts_empty = [];
  for (var i = 0; i < 4; ++i) {
    counts_empty.push(0);
  }

  var _useState23 = useState(counts_empty),
      _useState24 = _slicedToArray(_useState23, 2),
      counts = _useState24[0],
      setCounts = _useState24[1];

  var _useState25 = useState(0),
      _useState26 = _slicedToArray(_useState25, 2),
      num_votes = _useState26[0],
      setNumVotes = _useState26[1];

  var handleButtonClick = function handleButtonClick(e) {
    e.preventDefault();
    if (title_input && comment_input && (title_input !== last_title || comment_input !== last_comment)) {
      var joined = comments.concat({ title: title_input, content: comment_input });
      setComments(joined);
      setLastTitle(title_input);
      setLastComment(comment_input);
      if (socket == null) return;
      socket.emit('send-comment', joined);
      var data = {
        counts_data: counts,
        comments_data: joined
      };
      socket.emit('save-poll', data);
    } else if (!title_input && comment_input) {
      alert("Please include a title. Otherwise, what are we going to call your comment?");
    } else if (title_input && !comment_input) {
      alert("What comment? You only included a title.");
    } else if (title_input === last_title && comment_input === last_comment && title_input && comment_input) {
      alert("Okay, now you're getting a little repetitive...");
    }
  };

  useEffect(function () {
    if (socket == null) return;
    var interval = setInterval(function () {
      if (connected || !socket.connected) {
        setConnected(socket.connected);
      } else {
        console.log("reconnecting");
        socket.once('load-poll', function (poll) {
          setPollCreated(poll.poll_created_data);
          if (poll.poll_created_data) {
            setPollTitle(poll.title_data);
            setOptions(poll.options_data);
            setCounts(poll.counts_data);
            setColors(poll.colors_data);
            setNumVotes(poll.counts_data.reduce(reducer));
            setComments(poll.comments_data);
          }
        });
        socket.emit('get-poll', pollId);
        setConnected(true);
      }
    }, 1000);

    return function () {
      return clearInterval(interval);
    };
  }, [socket, connected]);

  var handleTitleChange = function handleTitleChange(e) {
    setTitleInput(e.target.value);
  };

  var handleCommentChange = function handleCommentChange(e) {
    setCommentInput(e.target.value);
  };

  var handleClearButtonClick = function handleClearButtonClick(e) {
    e.preventDefault();
    setComments([]);
    setLastTitle('');
    setLastComment('');
    if (socket == null) return;
    socket.emit('send-comment', comments);
    var data = {
      counts_data: counts,
      comments_data: comments
    };
    socket.emit('save-poll', data);
  };

  var reducer = function reducer(prev, curr) {
    return prev + curr;
  };

  var voteChange = function voteChange(index) {
    var counts_state = counts;
    counts_state[index]++;
    setCounts(counts_state);
    setNumVotes(num_votes + 1);
    if (socket == null) return;
    socket.emit("send-vote", counts);
    var data = {
      counts_data: counts,
      comments_data: comments
    };
    socket.emit('save-poll', data);
  };

  useEffect(function () {
    if (socket == null) return;
    var addVote = function addVote(counts_input) {
      setCounts(counts_input);
      setNumVotes(counts_input.reduce(reducer));
    };

    socket.on("receive-vote", addVote);

    return function () {
      socket.off("receive-vote", addVote);
    };
  }, [socket]);

  useEffect(function () {
    if (socket == null) return;
    var addComment = function addComment(comments_input) {
      setComments(comments_input);
    };

    socket.on("receive-comment", addComment);

    return function () {
      socket.off("receive-comment", addComment);
    };
  }, [socket]);

  useEffect(function () {
    if (socket == null) return;
    socket.once('poll-created', function (poll) {
      setPollCreated(poll.poll_created_data);
      if (poll.poll_created_data) {
        setPollTitle(poll.title_data);
        setOptions(poll.options_data);
        setCounts(poll.counts_data);
        setColors(poll.colors_data);
        setNumVotes(poll.counts_data.reduce(reducer));
        setComments(poll.comments_data);
      }
    });
  }, [socket]);

  useEffect(function () {
    if (socket == null) return;
    socket.once('load-poll', function (poll) {
      setPollCreated(poll.poll_created_data);
      if (poll.poll_created_data) {
        setPollTitle(poll.title_data);
        setOptions(poll.options_data);
        setCounts(poll.counts_data);
        setColors(poll.colors_data);
        setNumVotes(poll.counts_data.reduce(reducer));
        setComments(poll.comments_data);
      }
    });
    socket.emit('get-poll', pollId);
  }, [socket, pollId]);

  var createNewPoll = function createNewPoll(data) {
    if (socket == null || !connected) return;
    setPollTitle(data.title);
    setOptions(data.options);
    setColors(data.colors);
    counts_empty = [];
    for (var i = 0; i < data.options.length; i++) {
      counts_empty.push(0);
    }
    setCounts(counts_empty);
    setPollCreated(true);
    var poll_data = {
      counts_data: counts_empty,
      comments_data: comments,
      options_data: data.options,
      colors_data: data.colors,
      title_data: data.title,
      poll_created_data: true
    };
    socket.emit('create-poll', poll_data);
  };

  return poll_created ? React.createElement(
    'div',
    { className: 'app_wrapper' },
    connected ? React.createElement(
      'p',
      { className: 'connected' },
      'Connected'
    ) : React.createElement(
      'p',
      { className: 'not_connected' },
      'Not connected'
    ),
    React.createElement(Poll, (_React$createElement = { title: 'Which is the best letter?', key: 0, onVote: voteChange }, _defineProperty(_React$createElement, 'title', poll_title), _defineProperty(_React$createElement, 'counts', counts), _defineProperty(_React$createElement, 'num_votes', num_votes), _defineProperty(_React$createElement, 'options', options), _defineProperty(_React$createElement, 'colors', colors), _defineProperty(_React$createElement, 'connected_to_server', connected), _React$createElement)),
    React.createElement(Form, { onTitleChange: handleTitleChange, onCommentChange: handleCommentChange }),
    React.createElement(Button, { onButtonClick: handleButtonClick, connected_to_server: connected }),
    React.createElement(
      'div',
      { className: 'comments_container' },
      React.createElement(
        'h1',
        { className: 'comments_header' },
        'Comments'
      ),
      comments.length === 0 ? React.createElement(
        'p',
        { className: 'no_comments' },
        'No comments? Be the change you want to see in the world...'
      ) : comments.map(function (comment, index) {
        return React.createElement(Comment, { key: index, title: comment.title, content: comment.content });
      })
    )
  ) : React.createElement(
    'div',
    { className: 'app_wrapper' },
    React.createElement(CreatePoll, { submitPoll: createNewPoll })
  );
}

export default App;