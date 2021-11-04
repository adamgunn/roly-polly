function SpotifyAPI(props) {
    return (
        <form method="get" action="/search-album" className="spotify_search">
            <label for="search_box" className="create_poll_header">Enter an album</label>
            <input name="search_box" id="search_box" type="text"/>
            <input type="submit" value="Search" />
        </form>
    )
}

export default SpotifyAPI;