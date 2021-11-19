var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Comment from './Comment.js';
import Form from './Form.js';
import Poll from './Poll.js';
import ShareButtons from './ShareButtons.js';
import NotFound from './NotFound.js';

function App(props) {
    var DEFAULT_NUM_OPTIONS = 0;

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

    var _useState9 = useState(false),
        _useState10 = _slicedToArray(_useState9, 2),
        connected = _useState10[0],
        setConnected = _useState10[1];

    var _useState11 = useState('Loading...'),
        _useState12 = _slicedToArray(_useState11, 2),
        poll_title = _useState12[0],
        setPollTitle = _useState12[1];

    var _useState13 = useState([]),
        _useState14 = _slicedToArray(_useState13, 2),
        colors = _useState14[0],
        setColors = _useState14[1];

    var _useState15 = useState(new Array(DEFAULT_NUM_OPTIONS).fill('Loading...')),
        _useState16 = _slicedToArray(_useState15, 2),
        options = _useState16[0],
        setOptions = _useState16[1];

    var _useState17 = useState(window.localStorage.getItem(pollId)),
        _useState18 = _slicedToArray(_useState17, 2),
        voted = _useState18[0],
        setVoted = _useState18[1];

    var _useState19 = useState([]),
        _useState20 = _slicedToArray(_useState19, 2),
        images = _useState20[0],
        setImages = _useState20[1];

    var _useState21 = useState(new Array(DEFAULT_NUM_OPTIONS).fill(0)),
        _useState22 = _slicedToArray(_useState21, 2),
        counts = _useState22[0],
        setCounts = _useState22[1];

    var _useState23 = useState(0),
        _useState24 = _slicedToArray(_useState23, 2),
        num_votes = _useState24[0],
        setNumVotes = _useState24[1];

    var _useState25 = useState(true),
        _useState26 = _slicedToArray(_useState25, 2),
        valid = _useState26[0],
        setValid = _useState26[1];

    if (valid) document.title = poll_title + ' | RolyPolly';

    var handleButtonClick = function handleButtonClick(e) {
        e.preventDefault();
        if (title_input && comment_input) {
            var joined = comments.concat({
                title: title_input,
                content: comment_input
            });
            setComments(joined);
            if (socket == null) return;
            socket.emit('send-comment', joined);
            var data = {
                counts_data: counts,
                comments_data: joined
            };
            socket.emit('save-poll', data);
        }
    };

    useEffect(function () {
        if (socket == null) return;
        var interval = setInterval(function () {
            if (connected || !socket.connected) {
                setConnected(socket.connected);
            } else {
                console.log('reconnecting');
                socket.once('load-poll', function (poll) {
                    setValid(true);
                    setColors(poll.colors_data);
                    setPollTitle(poll.title_data);
                    if (poll.options_data[0].artist) {
                        var options_state = [].concat(_toConsumableArray(options));
                        var images_state = [].concat(_toConsumableArray(images));
                        poll.options_data.map(function (option) {
                            options_state.push(option.artist + ' - ' + option.title);
                            images_state.push(option.url);
                        });
                        setImages(images_state);
                        setOptions(options_state);
                    } else {
                        setOptions(poll.options_data);
                    }
                    setCounts(poll.counts_data);
                    setNumVotes(poll.counts_data.reduce(reducer));
                    setComments(poll.comments_data);
                });
                socket.on('not-found', function () {
                    setValid(false);
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

    var reducer = function reducer(prev, curr) {
        return prev + curr;
    };

    var voteChange = function voteChange(index) {
        setVoted(true);
        window.localStorage.setItem(pollId, true);
        var counts_state = counts;
        counts_state[index]++;
        setCounts(counts_state);
        setNumVotes(num_votes + 1);
        if (socket == null) return;
        socket.emit('send-vote', counts);
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

        socket.on('receive-vote', addVote);

        return function () {
            socket.off('receive-vote', addVote);
        };
    }, [socket]);

    useEffect(function () {
        if (socket == null) return;
        var addComment = function addComment(comments_input) {
            setComments(comments_input);
        };

        socket.on('receive-comment', addComment);

        return function () {
            socket.off('receive-comment', addComment);
        };
    }, [socket]);

    useEffect(function () {
        if (socket == null) return;
        socket.once('load-poll', function (poll) {
            var params = new URLSearchParams(document.location.search.substring(1));
            if (params.get('novote') === 'true') {
                setVoted(true);
                window.localStorage.setItem(pollId, true);
                window.location.replace(window.location.origin + window.location.pathname);
            }
            setValid(true);
            setColors(poll.colors_data);
            setPollTitle(poll.title_data);
            if (poll.options_data[0].artist) {
                var options_state = [].concat(_toConsumableArray(options));
                var images_state = [].concat(_toConsumableArray(images));
                poll.options_data.map(function (option) {
                    options_state.push(option.artist + ' - ' + option.title);
                    images_state.push(option.url);
                });
                setImages(images_state);
                setOptions(options_state);
            } else {
                setOptions(poll.options_data);
            }
            setCounts(poll.counts_data);
            setNumVotes(poll.counts_data.reduce(reducer));
            setComments(poll.comments_data);
        });
        socket.on('not-found', function () {
            setValid(false);
        });
        socket.emit('get-poll', pollId);
    }, [socket, pollId]);

    return React.createElement(
        'div',
        { className: 'valid_checker_wrapper' },
        valid ? React.createElement(
            'div',
            { className: 'app_wrapper' },
            React.createElement(
                'h1',
                { className: 'poll_title' },
                poll_title
            ),
            React.createElement(Poll, {
                key: 0,
                onVote: voteChange,
                counts: counts,
                num_votes: num_votes,
                colors: colors,
                images: images,
                connected_to_server: connected,
                already_voted: voted,
                options: options
            }),
            React.createElement(ShareButtons, { title: poll_title, pollId: pollId }),
            React.createElement(
                'div',
                { className: 'comments_container' },
                React.createElement(
                    'h1',
                    { className: 'rolypolly_subtitle comments_header' },
                    'Comments'
                ),
                React.createElement(Form, {
                    onTitleChange: handleTitleChange,
                    onCommentChange: handleCommentChange,
                    onButtonClick: handleButtonClick,
                    connected_to_server: connected
                }),
                comments.length === 0 ? React.createElement(
                    'p',
                    { className: 'no_comments' },
                    'No comments? Be the change you want to see in the world...'
                ) : comments.slice(0).reverse().map(function (comment, index) {
                    return React.createElement(Comment, {
                        key: index,
                        title: comment.title,
                        content: comment.content
                    });
                })
            )
        ) : React.createElement(NotFound, null)
    );
}

export default App;