var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import Comment from './Comment.js';
import Form from './Form.js';
import Button from './Button.js';
import Poll from './Poll.js';

function App(props) {

  useEffect(function () {
    setSocket(io("http://localhost:3001"));
    return function () {
      socket.disconnect();
    };
  }, []);

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

  var counts_empty = [];
  for (var i = 0; i < 4; ++i) {
    counts_empty.push(0);
  }

  var _useState13 = useState(counts_empty),
      _useState14 = _slicedToArray(_useState13, 2),
      counts = _useState14[0],
      setCounts = _useState14[1];

  var _useState15 = useState(0),
      _useState16 = _slicedToArray(_useState15, 2),
      num_votes = _useState16[0],
      setNumVotes = _useState16[1];

  var handleButtonClick = function handleButtonClick(e) {
    e.preventDefault();
    if (title_input && comment_input && (title_input !== last_title || comment_input !== last_comment)) {
      var joined = comments.concat({ title: title_input, content: comment_input });
      setComments(joined);
      setLastTitle(title_input);
      setLastComment(comment_input);
    } else if (!title_input && comment_input) {
      alert("Please include a title. Otherwise, what are we going to call your comment?");
    } else if (title_input && !comment_input) {
      alert("What comment? You only included a title.");
    } else if (title_input === last_title && comment_input === last_comment && title_input && comment_input) {
      alert("Okay, now you're getting a little repetitive...");
    }
  };

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

  return React.createElement(
    'div',
    { className: 'app_wrapper' },
    React.createElement(Poll, { title: 'Which is the best letter?', num_options: '4', onVote: voteChange, counts: counts, num_votes: num_votes }),
    React.createElement(Form, { onTitleChange: handleTitleChange, onCommentChange: handleCommentChange }),
    React.createElement(Button, { onButtonClick: handleButtonClick, onClearButtonClick: handleClearButtonClick }),
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
  );
}

export default App;