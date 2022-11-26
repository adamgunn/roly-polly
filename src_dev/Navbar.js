import React from "react";

function Navbar() {
    return (
        <ul className="navbar_wrapper">
            <li className="navbar_link">
                <a href="../">
                    <img
                        src="../static/favicon.svg"
                        className="rolypolly_logo"
                    />
                </a>
            </li>
            <li className="navbar_link">
                <a href="../about">About</a>
            </li>
            <li className="navbar_link create_poll_dropdown">
                <a>Create Poll</a>
                <ul className="create_poll_dropdown_links">
                    <li className="dropdown_link">
                        <a href="../new-poll">Regular Poll</a>
                    </li>
                    <li className="dropdown_link">
                        <a href="../new-song-poll">Song Poll</a>
                        <svg
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="music_note"
                            viewBox="0 0 16 16"
                        >
                            <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z" />
                            <path fillRule="evenodd" d="M9 3v10H8V3h1z" />
                            <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5V2.82z" />
                        </svg>
                    </li>
                </ul>
            </li>
        </ul>
    );
}

export default Navbar;
