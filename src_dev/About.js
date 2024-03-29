import React from "react";

function About() {
    document.title = 'About | RolyPolly';

    return (
        <div className="about_wrapper">
            <h3 className="rolypolly_subtitle">About</h3>
            <p className="body_text">
                RolyPolly is a web app made by{' '}
                <a
                    href="http://adamgunn.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Adam's personal website"
                >
                    Adam Gunn
                </a>
                , a student at the University of Michigan studing computer
                science.
            </p>
            <p className="body_text">
                The app was made primarily using MongoDB, Express, React, and
                Node.JS.
            </p>
            <p className="body_text">
                Feel free to email{' '}
                <a
                    href="mailto:asgunn@umich.edu"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    asgunn@umich.edu
                </a>{' '}
                with any questions or concerns.
            </p>
        </div>
    );
}

export default About;
