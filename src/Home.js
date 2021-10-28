function Home(props) {
    return React.createElement(
        "div",
        { className: "home_wrapper" },
        React.createElement(
            "h1",
            { className: "rolypolly_title" },
            "RolyPolly"
        ),
        React.createElement(
            "h2",
            { className: "rolypolly_subtitle" },
            "Create and share polls in real time"
        ),
        React.createElement(
            "button",
            { className: "create_poll_button", href: "/new-poll" },
            "Create a new Poll"
        )
    );
}

export default Home;