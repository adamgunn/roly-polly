class Form extends React.Component {
    constructor(props) {
        super(props);
        this.title_change = this.title_change.bind(this);
        this.comment_change = this.comment_change.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    title_change(e) {
        this.props.onTitleChange(e);
    }

    comment_change(e) {
        this.props.onCommentChange(e);
    }

    handleKeyDown(e) {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    render() {
        return (
            <div className="comment_form">
                <input
                    className="title_input"
                    type="text"
                    placeholder="Put your title here"
                    onChange={this.title_change}
                ></input>
                <textarea
                    className="content_input"
                    placeholder="Put your comment here"
                    onChange={this.comment_change}
                    onKeyDown={this.handleKeyDown}
                ></textarea>
            </div>
        );
    }
}

Form.propTypes = {
    onTitleChange: propTypes.func,
    onCommentChange: propTypes.func,
};

export default Form;
