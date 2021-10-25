import { useState, useEffect } from 'react';
import { io } from  "socket.io-client";
import { useParams } from "react-router-dom";
import Comment from './Comment.js';
import Form from './Form.js';
import Button from './Button.js';
import Poll from './Poll.js';

function App(props) {
  
  useEffect(() => {
      setSocket(io(window.location.host));
      return () => {
          socket.disconnect();
      }
  }, []);
  
  const pollId = window.location.pathname.slice(7);
  const [socket, setSocket] = useState();
  const [comments, setComments] = useState([]);
  const [title_input, setTitleInput] = useState(''); 
  const [comment_input, setCommentInput] = useState('');
  const [last_title, setLastTitle] = useState('');
  const [last_comment, setLastComment] = useState('');
  const [connected, setConnected] = useState(false);

  var counts_empty = [];
    for (var i = 0; i < 4; ++i) {
        counts_empty.push(0);
  }
  const [counts, setCounts] = useState(counts_empty);
  const [num_votes, setNumVotes] = useState(0);

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (title_input && comment_input &&
        (title_input !== last_title ||
        comment_input !== last_comment)) {
      var joined = comments.concat(
        {title: title_input, content: comment_input}
      );
      setComments(joined);
      setLastTitle(title_input);
      setLastComment(comment_input);
    }
    else if (!title_input && comment_input) {
      alert("Please include a title. Otherwise, what are we going to call your comment?");
    }
    else if (title_input && !comment_input) {
      alert("What comment? You only included a title.");
    }
    else if (title_input === last_title &&
             comment_input === last_comment &&
             title_input && comment_input) {
      alert("Okay, now you're getting a little repetitive...")
    }
  }

  setInterval(() => {
    if (connected || !socket.connected) {
      setConnected(socket.connected);
    }
    else {
      socket.once('load-poll', poll => {
        setCounts(poll);
        setNumVotes(poll.reduce(reducer));
      });
      setConnected(true);
    }
  }, 1000)

  const handleTitleChange = (e) => {
    setTitleInput(e.target.value);
  }

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  }

  const handleClearButtonClick = (e) => {
    e.preventDefault();
    setComments([]);
    setLastTitle('');
    setLastComment('');
  }
  const reducer = (prev, curr) => prev + curr;

  const voteChange = (index) => {
    var counts_state = counts;
    counts_state[index]++;
    setCounts(counts_state);
    setNumVotes(num_votes + 1);
    if (socket == null) return;
    socket.emit("send-vote", counts);
    socket.emit("save-poll", counts);
  }

  useEffect(() => {
    if (socket == null) return;
    const addVote = (counts_input) => {
      setCounts(counts_input);
      setNumVotes(counts_input.reduce(reducer));
    };

    socket.on("receive-vote", addVote);

    return () => {
      socket.off("receive-vote", addVote);
    }
  }, [socket]);

  useEffect(() => {
    if (socket == null) return;
    socket.once('load-poll', poll => {
      setCounts(poll);
      setNumVotes(poll.reduce(reducer));
    });
    socket.emit('get-poll', pollId);
  }, [socket, pollId]);


  return (
      <div className="app_wrapper">
          {connected ?
            <p class="connected">Connected</p> :
            <p class="not_connected">Not connected</p>}
          <Poll title="Which is the best letter?" key={0} onVote={voteChange} counts={counts} num_votes={num_votes} connected_to_server={connected}/>
          <Form onTitleChange={handleTitleChange} onCommentChange={handleCommentChange} />
          <Button onButtonClick={handleButtonClick} onClearButtonClick={handleClearButtonClick} />
          <div className="comments_container">
              <h1 className="comments_header">Comments</h1>
              {(comments.length === 0) ? <p className="no_comments">No comments? Be the change you want to see in the world...</p> :
                  comments.map((comment, index) => {
                      return <Comment key={index} title={comment.title} content={comment.content}/>;
                  }
              )}
          </div>  
      </div>
  );
}

export default App;
