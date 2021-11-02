function Home(props) {
    return React.createElement(
        "div",
        { className: "home_wrapper" },
        React.createElement(
            "div",
            { className: "home_section_wrapper home_section_wrapper1" },
            React.createElement(
                "section",
                { className: "home_section home_section1" },
                React.createElement(
                    "h1",
                    { className: "rolypolly_title" },
                    "Ro",
                    React.createElement(
                        "span",
                        { className: "l1" },
                        "l"
                    ),
                    "yPo",
                    React.createElement(
                        "span",
                        { className: "l2" },
                        "l"
                    ),
                    React.createElement(
                        "span",
                        { className: "l3" },
                        "l"
                    ),
                    "y"
                ),
                React.createElement(
                    "h3",
                    { className: "rolypolly_subtitle home_subtitle" },
                    "Create and share polls in real time"
                ),
                React.createElement(
                    "a",
                    {
                        className: "create_poll_link create_poll_button",
                        href: "/new-poll"
                    },
                    "Create a new Poll"
                )
            )
        ),
        React.createElement(
            "div",
            { className: "home_section_wrapper home_section_wrapper2" },
            React.createElement(
                "section",
                { className: "home_section home_section2" },
                React.createElement(
                    "h3",
                    { className: "rolypolly_subtitle" },
                    "Build the poll of your dreams in seconds \u2014 then share it with the world"
                )
            )
        ),
        React.createElement(
            "div",
            { className: "home_section_wrapper home_section_wrapper3" },
            React.createElement(
                "section",
                { className: "home_section home_section3" },
                React.createElement(
                    "h3",
                    { className: "rolypolly_subtitle" },
                    "See results instantly as the votes roll in"
                )
            )
        ),
        React.createElement(
            "div",
            { className: "home_section_wrapper home_section_wrapper4" },
            React.createElement(
                "section",
                { className: "home_section home_section4" },
                React.createElement(
                    "h3",
                    { className: "rolypolly_subtitle" },
                    "Debate your choices in the comments section"
                )
            )
        )
    );
}

export default Home;