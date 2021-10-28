
class Button extends React.Component {
    constructor(props) {
        super(props);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick(e) { 
        this.props.onButtonClick(e);
    }

    render() {
        return(
            this.props.connected_to_server ?
                <div className="buttons_wrapper">
                    <button className="add_comment_button" onClick={this.handleButtonClick}>Submit comment</button>
                </div> :
                <div className="buttons_wrapper">
                    <button className="add_comment_button" onClick={this.handleButtonClick} disabled>Submit comment</button>
                </div>
        );
    }
}

Button.propTypes = {
    onButtonClick: propTypes.func,
    connected_to_server: propTypes.bool
}

export default Button;