function Home(props) {
    var isVisible = function isVisible(element) {
        var elementBox = element.getBoundingClientRect();
        var dist = -100;
        return elementBox.top - window.innerHeight < dist;
    };

    window.onscroll = function () {
        showVisible();
    };
    window.onresize = function () {
        showVisible();
    };
    window.addEventListener('DOMContentLoaded', function () {
        showVisible();
    });

    var showVisible = function showVisible() {
        var fadeins = document.querySelectorAll('.fadein_scroll');
        fadeins.forEach(function (fading_element) {
            if (isVisible(fading_element)) {
                fading_element.classList.remove('fadein_scroll');
            }
        });
    };

    return React.createElement(
        'div',
        { className: 'home_wrapper' },
        React.createElement(
            'div',
            { className: 'home_section_wrapper home_section_wrapper1' },
            React.createElement(
                'section',
                { className: 'home_section home_section1' },
                React.createElement(
                    'h1',
                    { className: 'rolypolly_title fadein_scroll' },
                    'Ro',
                    React.createElement(
                        'span',
                        { className: 'l1' },
                        'l'
                    ),
                    'yPo',
                    React.createElement(
                        'span',
                        { className: 'l2' },
                        'l'
                    ),
                    React.createElement(
                        'span',
                        { className: 'l3' },
                        'l'
                    ),
                    'y'
                ),
                React.createElement(
                    'h3',
                    { className: 'rolypolly_subtitle home_subtitle fadein_scroll' },
                    'Create and share polls in real time'
                ),
                React.createElement(
                    'a',
                    {
                        className: 'create_poll_link create_poll_button fadein_scroll',
                        href: '/new-poll'
                    },
                    'Create\xA0a\xA0new\xA0Poll\xA0',
                    React.createElement(
                        'svg',
                        {
                            width: 25,
                            height: 25,
                            className: 'pencil_icon',
                            viewBox: '0 0 16 16'
                        },
                        React.createElement('path', { d: 'M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z' })
                    )
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'home_section_wrapper home_section_wrapper2' },
            React.createElement(
                'section',
                { className: 'home_section home_section2' },
                React.createElement(
                    'h3',
                    { className: 'rolypolly_subtitle fadein_scroll' },
                    'Build the poll of your dreams in seconds \u2014 then share it with the world'
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'home_section_wrapper home_section_wrapper3' },
            React.createElement(
                'section',
                { className: 'home_section home_section3' },
                React.createElement(
                    'h3',
                    { className: 'rolypolly_subtitle fadein_scroll' },
                    'See results instantly as the votes roll in'
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'home_section_wrapper home_section_wrapper4' },
            React.createElement(
                'section',
                { className: 'home_section home_section4' },
                React.createElement(
                    'h3',
                    { className: 'rolypolly_subtitle fadein_scroll' },
                    'Debate your choices in the comments section'
                )
            )
        )
    );
}

export default Home;