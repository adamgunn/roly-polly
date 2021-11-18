import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Comment from './Comment.js';
import Form from './Form.js';
import Poll from './Poll.js';
import ShareButtons from './ShareButtons.js';
import NotFound from './NotFound.js';

function App(props) {
    const DEFAULT_NUM_OPTIONS = 0;

    useEffect(() => {
        setSocket(io(window.location.host));
        return () => {
            socket.disconnect();
        };
    }, []);

    const pollId = window.location.pathname.slice(7);
    const [socket, setSocket] = useState();
    const [comments, setComments] = useState([]);
    const [title_input, setTitleInput] = useState('');
    const [comment_input, setCommentInput] = useState('');
    const [connected, setConnected] = useState(false);
    const [poll_title, setPollTitle] = useState('Loading...');
    const [colors, setColors] = useState([]);
    const [options, setOptions] = useState(
        new Array(DEFAULT_NUM_OPTIONS).fill('Loading...')
    );
    const [voted, setVoted] = useState(window.localStorage.getItem(pollId));
    const [images, setImages] = useState([]);
    const [counts, setCounts] = useState(
        new Array(DEFAULT_NUM_OPTIONS).fill(0)
    );
    const [num_votes, setNumVotes] = useState(0);
    const [valid, setValid] = useState(true);

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (title_input && comment_input) {
            var joined = comments.concat({
                title: title_input,
                content: comment_input,
            });
            setComments(joined);
            if (socket == null) return;
            socket.emit('send-comment', joined);
            const data = {
                counts_data: counts,
                comments_data: joined,
            };
            socket.emit('save-poll', data);
        }
    };

    useEffect(() => {
        if (socket == null) return;
        const interval = setInterval(() => {
            if (connected || !socket.connected) {
                setConnected(socket.connected);
            } else {
                console.log('reconnecting');
                socket.once('load-poll', (poll) => {
                    setValid(true);
                    setColors(poll.colors_data);
                    setPollTitle(poll.title_data);
                    if (poll.options_data[0].artist) {
                        var options_state = [...options];
                        var images_state = [...images];
                        poll.options_data.map((option) => {
                            options_state.push(
                                option.artist + ' - ' + option.title
                            );
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
                socket.on('not-found', () => {
                    setValid(false);
                });
                socket.emit('get-poll', pollId);
                setConnected(true);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [socket, connected]);

    const handleTitleChange = (e) => {
        setTitleInput(e.target.value);
    };

    const handleCommentChange = (e) => {
        setCommentInput(e.target.value);
    };

    const reducer = (prev, curr) => prev + curr;

    const voteChange = (index) => {
        setVoted(true);
        window.localStorage.setItem(pollId, true);
        var counts_state = counts;
        counts_state[index]++;
        setCounts(counts_state);
        setNumVotes(num_votes + 1);
        if (socket == null) return;
        socket.emit('send-vote', counts);
        const data = {
            counts_data: counts,
            comments_data: comments,
        };
        socket.emit('save-poll', data);
    };

    useEffect(() => {
        if (socket == null) return;
        const addVote = (counts_input) => {
            setCounts(counts_input);
            setNumVotes(counts_input.reduce(reducer));
        };

        socket.on('receive-vote', addVote);

        return () => {
            socket.off('receive-vote', addVote);
        };
    }, [socket]);

    useEffect(() => {
        if (socket == null) return;
        const addComment = (comments_input) => {
            setComments(comments_input);
        };

        socket.on('receive-comment', addComment);

        return () => {
            socket.off('receive-comment', addComment);
        };
    }, [socket]);

    useEffect(() => {
        if (socket == null) return;
        socket.once('load-poll', (poll) => {
            let params = new URLSearchParams(
                document.location.search.substring(1)
            );
            if (params.get('created') === 'true') {
                setVoted(true);
                window.localStorage.setItem(pollId, true);
                window.location.replace(window.location.origin + window.location.pathname);
            }
            setValid(true);
            setColors(poll.colors_data);
            setPollTitle(poll.title_data);
            if (poll.options_data[0].artist) {
                var options_state = [...options];
                var images_state = [...images];
                poll.options_data.map((option) => {
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
        socket.on('not-found', () => {
            setValid(false);
        });
        socket.emit('get-poll', pollId);
    }, [socket, pollId]);

    return (
        <div className="valid_checker_wrapper">
            {valid ? (
                <div className="app_wrapper">
                    <h1 className="poll_title">{poll_title}</h1>
                    <Poll
                        key={0}
                        onVote={voteChange}
                        counts={counts}
                        num_votes={num_votes}
                        colors={colors}
                        images={images}
                        connected_to_server={connected}
                        already_voted={voted}
                        options={options}
                    />
                    <ShareButtons title={poll_title} pollId={pollId} />
                    <div className="comments_container">
                        <h1 className="rolypolly_subtitle comments_header">
                            Comments
                        </h1>
                        <Form
                            onTitleChange={handleTitleChange}
                            onCommentChange={handleCommentChange}
                            onButtonClick={handleButtonClick}
                            connected_to_server={connected}
                        />
                        {comments.length === 0 ? (
                            <p className="no_comments">
                                No comments? Be the change you want to see in
                                the world...
                            </p>
                        ) : (
                            comments
                                .slice(0)
                                .reverse()
                                .map((comment, index) => {
                                    return (
                                        <Comment
                                            key={index}
                                            title={comment.title}
                                            content={comment.content}
                                        />
                                    );
                                })
                        )}
                    </div>
                </div>
            ) : (
                <NotFound />
            )}
        </div>
    );
}

export default App;
