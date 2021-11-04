function SpotifyAPI(props) {
    return React.createElement(
        "form",
        { method: "get", action: "/search-album", className: "spotify_search" },
        React.createElement(
            "label",
            { "for": "search_box", className: "create_poll_header" },
            "Enter an album"
        ),
        React.createElement("input", { name: "search_box", id: "search_box", type: "text" }),
        React.createElement("input", { type: "submit", value: "Search" })
    );
}

export default SpotifyAPI;