import React from "react";
import propTypes from "prop-types";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.title_change = this.title_change.bind(this);
        this.comment_change = this.comment_change.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.state = {
            title: '',
            comment: '',
        };
    }

    title_change(e) {
        this.props.onTitleChange(e);
        this.setState({ title: e.target.value });
    }

    comment_change(e) {
        this.props.onCommentChange(e);
        this.setState({ comment: e.target.value });
    }

    handleKeyDown(e) {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    handleButtonClick(e) {
        this.props.onButtonClick(e);
        if (this.state.title != '' && this.state.comment != '') {
            this.setState({ title: '' });
            this.setState({ comment: '' });
        }
        const textarea = document.getElementById('content_input');
        textarea.style.height = 'inherit';
        textarea.style.height = `${e.target.scrollHeight}px`;
    }

    render() {
        return (
            <div className="button_and_form_wrapper">
                <div className="comment_form">
                    <input
                        className="title_input"
                        type="text"
                        placeholder="Put your title here"
                        onChange={this.title_change}
                        value={this.state.title}
                    ></input>
                    <textarea
                        className="content_input"
                        id="content_input"
                        placeholder="Put your comment here"
                        onChange={this.comment_change}
                        onKeyDown={this.handleKeyDown}
                        value={this.state.comment}
                    ></textarea>
                </div>
                <div className="buttons_wrapper">
                    {this.props.connected_to_server &&
                    this.state.title != '' &&
                    this.state.comment != '' ? (
                        <button
                            className="add_comment_button"
                            onClick={this.handleButtonClick}
                        >
                            Submit comment
                        </button>
                    ) : (
                        <button
                            className="add_comment_button"
                            onClick={this.handleButtonClick}
                            disabled
                        >
                            Submit comment
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

Form.propTypes = {
    onTitleChange: propTypes.func,
    onCommentChange: propTypes.func,
    onButtonClick: propTypes.func,
    connected_to_server: propTypes.bool,
};

export default Form;
