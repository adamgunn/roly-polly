function Navbar(props) {
    return React.createElement(
        "ul",
        { className: "navbar_wrapper" },
        React.createElement(
            "li",
            { className: "navbar_link" },
            React.createElement(
                "a",
                { href: "../" },
                "Home"
            )
        ),
        React.createElement(
            "li",
            { className: "navbar_link" },
            React.createElement(
                "a",
                { href: "../about" },
                "About"
            )
        ),
        React.createElement(
            "li",
            { className: "navbar_link" },
            React.createElement(
                "a",
                { href: "../new-poll" },
                "New Poll"
            )
        )
    );
}

export default Navbar;