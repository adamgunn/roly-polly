function Navbar(props) {
    return (
        <ul className="navbar_wrapper">
            <li className="navbar_link">
                <a href="../">Home</a>
            </li>
            <li className="navbar_link">
                <a href="../about">About</a>
            </li>
            <li className="navbar_link">
                <a href="../new-poll">New Poll</a>
            </li>
        </ul>
    );
}

export default Navbar;
