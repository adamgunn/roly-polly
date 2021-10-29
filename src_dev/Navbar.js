function Navbar(props) {
    return (
        <ul className="navbar_wrapper">
            <li>
                <a className="navbar_link" href="../">Home</a>
            </li>
            <li>
                <a className="navbar_link" href="../about">About</a>
            </li>
            <li>
                <a className="navbar_link" href="../new-poll">New poll</a>
            </li>
        </ul>
    );
}

export default Navbar;
