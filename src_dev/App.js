import React from 'react';
import Comment from './Comment.js';
import Form from './Form.js';
import Button from './Button.js';
import Poll from './Poll.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleClearButtonClick = this.handleClearButtonClick.bind(this);

    this.state = {
      comments: [],
      title_input: '',
      comment_input: '',
      last_title: '',
      last_comment: ''
    };
  }

  handleButtonClick(e) {
    e.preventDefault();
    var title_input = this.state.title_input;
    var comment_input = this.state.comment_input;
    if (title_input && comment_input &&
        (title_input !== this.state.last_title ||
        comment_input !== this.state.last_comment)) {
      var joined = this.state.comments.concat(
        {title: this.state.title_input, content: this.state.comment_input}
      );
      this.setState({comments: joined});
      this.setState({last_title: title_input});
      this.setState({last_comment: comment_input});
    }
    else if (!title_input && comment_input) {
      alert("Please include a title. Otherwise, what are we going to call your comment?");
    }
    else if (title_input && !comment_input) {
      alert("What comment? You only included a title.");
    }
    else if (title_input === this.state.last_title &&
             comment_input === this.state.last_comment &&
             title_input && comment_input) {
      alert("Okay, now you're getting a little repetitive...")
    }
  }

  handleTitleChange(e) {
    this.setState({title_input: e.target.value});
  }

  handleCommentChange(e) {
    this.setState({comment_input: e.target.value});
  }

  handleClearButtonClick(e) {
    e.preventDefault();
    this.setState({comments: []});
    this.setState({last_title: ''});
    this.setState({last_comment: ''});
  }


  render() {
    return (
      <div className="app_wrapper">
        <Poll />
        <Form onTitleChange={this.handleTitleChange} onCommentChange={this.handleCommentChange} />
        <Button onButtonClick={this.handleButtonClick} onClearButtonClick={this.handleClearButtonClick} />
        <div className="comments_container">
          <h1 className="comments_header">Comments</h1>
          {(this.state.comments.length === 0) ? <p className="no_comments">No comments? Be the change you want to see in the world...</p> :
          this.state.comments.map((comment, index) => {
            return <Comment key={index} title={comment.title} content={comment.content}/>;
          })}
        </div>
        
      </div>
    );
  }
}

export default App;
