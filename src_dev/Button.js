
class Button extends React.Component {
    constructor(props) {
        super(props);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleClearButtonClick = this.handleClearButtonClick.bind(this);
    }

    handleButtonClick(e) { 
        this.props.onButtonClick(e);
    }

    handleClearButtonClick(e) {
        this.props.onClearButtonClick(e);
    }

    render() {
        return(
            <div className="buttons_wrapper">
                <button className="add_comment_button" onClick={this.handleButtonClick}>Submit comment</button>
                <button className="clear_comments_button" onClick={this.handleClearButtonClick}>Clear</button>
            </div>
        );
    }
}

Button.propTypes = {
    onButtonClick: propTypes.func,
    onClearButtonClick: propTypes.func
}

export default Button;