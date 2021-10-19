

class Comment extends React.Component {
    render() {
        return (
            <div className="comment_wrapper">
                <h1 className="comment_title">{this.props.title}</h1>
                <p className="comment_content">{this.props.content}</p>
            </div>
        );
    }
}

Comment.propTypes = {
    title: propTypes.string,
    content: propTypes.string
}

export default Comment;