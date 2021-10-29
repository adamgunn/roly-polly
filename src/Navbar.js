function Navbar(props) {
    return React.createElement(
        "ul",
        { className: "navbar_wrapper" },
        React.createElement(
            "li",
            null,
            React.createElement(
                "a",
                { className: "navbar_link", href: "../" },
                "Home"
            )
        ),
        React.createElement(
            "li",
            null,
            React.createElement(
                "a",
                { className: "navbar_link", href: "../about" },
                "About"
            )
        ),
        React.createElement(
            "li",
            null,
            React.createElement(
                "a",
                { className: "navbar_link", href: "../new-poll" },
                "New poll"
            )
        )
    );
}

export default Navbar;