function NotFound(props) {
    return React.createElement(
        "div",
        { className: "not_found_wrapper" },
        React.createElement(
            "h1",
            { className: "rolypolly_subtitle" },
            "Error"
        ),
        React.createElement(
            "p",
            { className: "body_text" },
            "Could not find anything at that URL."
        )
    );
}

export default NotFound;