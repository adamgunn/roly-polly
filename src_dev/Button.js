
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
            this.props.connected_to_server ?
                <div className="buttons_wrapper">
                    <button className="add_comment_button" onClick={this.handleButtonClick}>Submit comment</button>
                    <button className="clear_comments_button" onClick={this.handleClearButtonClick}>Clear</button>
                </div> :
                <div className="buttons_wrapper">
                    <button className="add_comment_button" onClick={this.handleButtonClick} disabled>Submit comment</button>
                    <button className="clear_comments_button" onClick={this.handleClearButtonClick} disabled>Clear</button>
                </div>
        );
    }
}

Button.propTypes = {
    onButtonClick: propTypes.func,
    onClearButtonClick: propTypes.func,
    connected_to_server: propTypes.bool
}

export default Button;