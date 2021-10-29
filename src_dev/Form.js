class Form extends React.Component {
    constructor(props) {
        super(props);
        this.title_change = this.title_change.bind(this);
        this.comment_change = this.comment_change.bind(this);
    }

    title_change(e) {
        this.props.onTitleChange(e);
    }

    comment_change(e) {
        this.props.onCommentChange(e);
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
                <br />
                <textarea
                    className="content_input"
                    placeholder="Put your comment here"
                    onChange={this.comment_change}
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
