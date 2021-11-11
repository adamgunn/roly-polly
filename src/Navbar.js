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
                { className: "create_poll_dropdown" },
                "Create Poll"
            ),
            React.createElement(
                "ul",
                { className: "create_poll_dropdown_links" },
                React.createElement(
                    "li",
                    { className: "navbar_link" },
                    React.createElement(
                        "a",
                        null,
                        "Regular Poll"
                    )
                ),
                React.createElement(
                    "li",
                    { className: "navbar_link" },
                    React.createElement(
                        "a",
                        { href: "../new-album-poll" },
                        "Album Poll"
                    ),
                    React.createElement(
                        "svg",
                        {
                            width: "16",
                            height: "16",
                            fill: "currentColor",
                            className: "music_note",
                            viewBox: "0 0 16 16"
                        },
                        React.createElement("path", { d: "M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z" }),
                        React.createElement("path", { "fill-rule": "evenodd", d: "M9 3v10H8V3h1z" }),
                        React.createElement("path", { d: "M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5V2.82z" })
                    )
                )
            )
        )
    );
}

export default Navbar;