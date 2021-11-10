function Home(props) {
    const isVisible = (element) => {
        var elementBox = element.getBoundingClientRect();
        const dist = -100;
        return elementBox.top - window.innerHeight < dist;
    };

    window.onscroll = () => {
        showVisible();
    };
    window.onresize = () => {
        showVisible();
    }
    window.addEventListener('DOMContentLoaded', () => {
        showVisible();
    });

    const showVisible = () => {
        var fadeins = document.querySelectorAll('.fadein_scroll');
        fadeins.forEach((fading_element) => {
            if (isVisible(fading_element)) {
                fading_element.classList.remove('fadein_scroll');
            }
        });
    };

    return (
        <div className="home_wrapper">
            <div className="home_section_wrapper home_section_wrapper1">
                <section className="home_section home_section1">
                    <h1 className="rolypolly_title fadein_scroll">
                        Ro
                        <span className="l1">l</span>
                        yPo
                        <span className="l2">l</span>
                        <span className="l3">l</span>y
                    </h1>
                    <h3 className="rolypolly_subtitle home_subtitle fadein_scroll">
                        Create and share polls in real time
                    </h3>
                    <a
                        className="create_poll_link create_poll_button fadein_scroll"
                        href="/new-poll"
                    >
                        Create&nbsp;a&nbsp;new&nbsp;Poll&nbsp;
                        <svg
                            width={25}
                            height={25}
                            className="pencil_icon"
                            viewBox="0 0 16 16"
                        >
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>
                    </a>
                </section>
            </div>
            <div className="home_section_wrapper home_section_wrapper2">
                <section className="home_section home_section2">
                    <h3 className="rolypolly_subtitle fadein_scroll">
                        Build the poll of your dreams in seconds &mdash; then
                        share it with the world
                    </h3>
                </section>
            </div>
            <div className="home_section_wrapper home_section_wrapper3">
                <section className="home_section home_section3">
                    <h3 className="rolypolly_subtitle fadein_scroll">
                        See results instantly as the votes roll in
                    </h3>
                </section>
            </div>
            <div className="home_section_wrapper home_section_wrapper4">
                <section className="home_section home_section4">
                    <h3 className="rolypolly_subtitle fadein_scroll">
                        Debate your choices in the comments section
                    </h3>
                </section>
            </div>
        </div>
    );
}

export default Home;
