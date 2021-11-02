function Home(props) {
    return (
        <div className="home_wrapper">
            <div className="home_section_wrapper home_section_wrapper1">
                <section className="home_section home_section1">
                    <h1 className="rolypolly_title">
                        Ro
                        <span className="l1">l</span>
                        yPo
                        <span className="l2">l</span>
                        <span className="l3">l</span>y
                    </h1>
                    <h3 className="rolypolly_subtitle home_subtitle">
                        Create and share polls in real time
                    </h3>
                    <a
                        className="create_poll_link create_poll_button"
                        href="/new-poll"
                    >
                        Create a new Poll
                    </a>
                </section>
            </div>
            <div className="home_section_wrapper home_section_wrapper2">
                <section className="home_section home_section2">
                    <h3 className="rolypolly_subtitle">Build the poll of your dreams in seconds &mdash; then share it with the world</h3>
                </section>
            </div>
            <div className="home_section_wrapper home_section_wrapper3">
                <section className="home_section home_section3">
                <h3 className="rolypolly_subtitle">See results instantly as the votes roll in</h3>
                </section>
            </div>
            <div className="home_section_wrapper home_section_wrapper4">
                <section className="home_section home_section4">
                <h3 className="rolypolly_subtitle">Debate your choices in the comments section</h3>
                </section>
            </div>
        </div>
    );
}

export default Home;
