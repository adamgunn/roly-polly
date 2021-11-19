function NotFound(props) {
    document.title = 'Error | RolyPolly';

    return (
        <div className="not_found_wrapper">
            <h1 className="rolypolly_subtitle">Error</h1>
            <p className="body_text">Could not find anything at that URL.</p>
        </div>
    );
}

export default NotFound;
