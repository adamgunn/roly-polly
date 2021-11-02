function Home(props) {
    return (
        <div className="home_wrapper">
            <h1 className="rolypolly_title">RolyPolly</h1>
            <h2 className="rolypolly_subtitle">
                Create and share polls in real time
            </h2>
            <a className="create_poll_link create_poll_button" href="/new-poll">
                Create a new Poll
            </a>
        </div>
    );
}

export default Home;
