function About(props) {
    return React.createElement(
        "div",
        { className: "about_wrapper" },
        React.createElement(
            "h3",
            { className: "rolypolly_subtitle" },
            "About"
        ),
        React.createElement(
            "p",
            { className: "body_text" },
            "RolyPolly is a web app made by",
            ' ',
            React.createElement(
                "a",
                {
                    href: "http://adamgunn.net",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: "Adam's personal website"
                },
                "Adam Gunn"
            ),
            ", a sophomore at the University of Michigan studing computer science."
        ),
        React.createElement(
            "p",
            { className: "body_text" },
            "The app was made primarily using MongoDB, Express, React, and Node.JS, and deployed on Heroku."
        ),
        React.createElement(
            "p",
            { className: "body_text" },
            "Feel free to email",
            ' ',
            React.createElement(
                "a",
                {
                    href: "mailto:asgunn@umich.edu",
                    target: "_blank",
                    rel: "noopener noreferrer"
                },
                "asgunn@umich.edu"
            ),
            ' ',
            "with any questions or concerns."
        )
    );
}

export default About;