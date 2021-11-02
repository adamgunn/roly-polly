import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Comment from './Comment.js';
import Form from './Form.js';
import Poll from './Poll.js';

function App(props) {
    const DEFAULT_NUM_OPTIONS = 2;

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
    const [last_title, setLastTitle] = useState('');
    const [last_comment, setLastComment] = useState('');
    const [connected, setConnected] = useState(false);
    const [poll_title, setPollTitle] = useState('');
    const [colors, setColors] = useState([]);
    const [options, setOptions] = useState(new Array(DEFAULT_NUM_OPTIONS).fill('Loading...'));
    const [voted, setVoted] = useState(false);

    const [counts, setCounts] = useState(new Array(DEFAULT_NUM_OPTIONS).fill(0));
    const [num_votes, setNumVotes] = useState(0);

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (
            title_input &&
            comment_input &&
            (title_input !== last_title || comment_input !== last_comment)
        ) {
            var joined = comments.concat({
                title: title_input,
                content: comment_input,
            });
            setComments(joined);
            setLastTitle(title_input);
            setLastComment(comment_input);
            if (socket == null) return;
            socket.emit('send-comment', joined);
            const data = {
                counts_data: counts,
                comments_data: joined,
            };
            socket.emit('save-poll', data);
        } else if (!title_input && comment_input) {
            alert(
                'Please include a title. Otherwise, what are we going to call your comment?'
            );
        } else if (title_input && !comment_input) {
            alert('What comment? You only included a title.');
        } else if (
            title_input === last_title &&
            comment_input === last_comment &&
            title_input &&
            comment_input
        ) {
            alert("Okay, now you're getting a little repetitive...");
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
                    setPollTitle(poll.title_data);
                    setOptions(poll.options_data);
                    setCounts(poll.counts_data);
                    setColors(poll.colors_data);
                    setNumVotes(poll.counts_data.reduce(reducer));
                    setComments(poll.comments_data);
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
            setPollTitle(poll.title_data);
            setOptions(poll.options_data);
            setCounts(poll.counts_data);
            setColors(poll.colors_data);
            setNumVotes(poll.counts_data.reduce(reducer));
            setComments(poll.comments_data);
        });
        socket.emit('get-poll', pollId);
    }, [socket, pollId]);

    return (
        <div className="app_wrapper">
            <Poll
                key={0}
                onVote={voteChange}
                title={poll_title}
                counts={counts}
                num_votes={num_votes}
                options={options}
                colors={colors}
                connected_to_server={connected}
                already_voted={voted}
            />
            <div className="comments_container">
                <h1 className="rolypolly_subtitle comments_header">Comments</h1>
                <Form
                    onTitleChange={handleTitleChange}
                    onCommentChange={handleCommentChange}
                    onButtonClick={handleButtonClick}
                    connected_to_server={connected}
                />
                {comments.length === 0 ? (
                    <p className="no_comments">
                        No comments? Be the change you want to see in the
                        world...
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
    );
}

export default App;
