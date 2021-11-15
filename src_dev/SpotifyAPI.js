import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function SpotifyAPI(props) {
    const title_placeholders = [
        'Which song has the best hook?',
        'Which song is the worst?',
        'Which song is the most underrated?',
        'Which song has the best lyrics?',
        'Which song has the best cover?',
        'Which song has the best feature?',
        'Which song was the most influential?',
    ];

    const [query, setQuery] = useState('');
    const [socket, setSocket] = useState();
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const [artist_result, setArtistResult] = useState('');
    const [title_result, setTitleResult] = useState('');
    const [tracks, setTracks] = useState([]);
    const [poll_title, setPollTitle] = useState('');
    const [title_placeholder, setTitlePlaceholder] = useState(
        title_placeholders[
            Math.floor(Math.random() * title_placeholders.length)
        ]
    );

    const queryChange = (e) => {
        setQuery(e.target.value);
    };

    const pollTitleChange = (e) => {
        setPollTitle(e.target.value);
    };

    useEffect(() => {
        setSocket(io(window.location.host));
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket == null) return;
    }, [socket]);

    const trackSearch = () => {
        if (socket == null) return;
        socket.once('track-found', (data) => {
            setImageUrl(data.url);
            setArtistResult(data.artist);
            setTitleResult(data.title);
            setError('');
        });
        socket.once('track-not-found', () => {
            setImageUrl('');
            setArtistResult('');
            setTitleResult('');
            setError('Nothing found on spotify with those search terms.');
        });
        socket.once('error', (err) => {
            setImageUrl('');
            setArtistResult('');
            setTitleResult('');
            setError(
                'The server encountered an arror with the Spotify API. Try refreshing?'
            );
            console.log(err);
        });
        socket.emit('search-tracks', query);
    };

    const addTrack = () => {
        var tracks_state = [...tracks];
        const track_data = {
            artist: artist_result,
            title: title_result,
            url: imageUrl,
            index: tracks_state.length,
        };
        tracks_state.push(track_data);
        setTracks(tracks_state);
        setQuery('');
        setTitleResult('');
        setArtistResult('');
        setImageUrl('');
    };

    const deleteTrack = (e) => {
        const index = e.target.getAttribute('index');
        var tracks_state = [...tracks];
        tracks_state.splice(index, 1);
        for (var i = 0; i < tracks_state.length; i++) {
            tracks_state[i].index = i;
        }
        setTracks(tracks_state);
    };

    return (
        <form
            className="spotify_wrapper"
            method="post"
            action="/submit-new-song-poll"
        >
            <ul className="create_poll_wrapper">
                <h3 className="rolypolly_subtitle">Create your song poll</h3>
                <li>
                    <label for="title_input" className="create_poll_header">
                        Enter a poll title
                    </label>
                    <br />
                    <input
                        name="title_input"
                        id="title_input"
                        onChange={pollTitleChange}
                        placeholder={title_placeholder}
                        className="create_poll_input"
                        type="text"
                    />
                </li>
                <li>
                    <label for="query_input" className="create_poll_header">
                        Enter a Spotify search query, e.g. "michael jackson
                        billie jean"
                    </label>
                    <br />
                    <input
                        name="query_input"
                        id="query_input"
                        value={query}
                        onChange={queryChange}
                        className="create_poll_input"
                        type="text"
                    />
                </li>
                <li>
                    <input
                        type="hidden"
                        id="tracks_data"
                        name="tracks_data"
                        value={JSON.stringify(tracks)}
                    ></input>
                </li>
                <li>
                    {query != '' ? (
                        <button
                            onClick={trackSearch}
                            className="create_poll_button"
                            type="button"
                        >
                            Search
                        </button>
                    ) : (
                        <button
                            className="create_poll_button"
                            type="button"
                            disabled
                        >
                            Search
                        </button>
                    )}
                </li>
                <p className="body_text error_text">{error}</p>
                {imageUrl != '' ? <img src={imageUrl} /> : <div></div>}

                {artist_result != '' && title_result != '' ? (
                    <div>
                        <p className="body_text">
                            {'Result: "' +
                                title_result +
                                '" by ' +
                                artist_result}
                        </p>
                        <button
                            onClick={addTrack}
                            className="create_poll_button"
                            type="button"
                        >
                            Add this track to the poll
                        </button>
                    </div>
                ) : (
                    <div></div>
                )}
            </ul>
            <div className="track_cards_wrapper">
                <h3 className="rolypolly_subtitle">Your tracks</h3>
                <br />
                <div className="track_cards">
                    {tracks.length > 0 ? (
                        tracks.map((track_option, index) => {
                            return (
                                <div
                                    className="track_card"
                                    index={index}
                                    key={index}
                                >
                                    <img
                                        src={track_option.url}
                                        className="track_card_cover"
                                    />
                                    <p className="track_card_title body_text">
                                        {track_option.title}
                                    </p>
                                    <p className="track_card_artist body_text">
                                        {track_option.artist}
                                    </p>
                                    <div
                                        className="x_button_wrapper"
                                        onClick={deleteTrack}
                                    >
                                        <svg
                                            className="x-button"
                                            width={20}
                                            height={20}
                                            viewBox="0 0 91.61 91.61"
                                            key={index}
                                            index={index}
                                        >
                                            <line
                                                className="cls-1"
                                                index={index}
                                                x1="5.3"
                                                y1="5.3"
                                                x2="86.3"
                                                y2="86.3"
                                            />
                                            <line
                                                className="cls-1"
                                                index={index}
                                                x1="86.3"
                                                y1="5.3"
                                                x2="5.3"
                                                y2="86.3"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="no_colors">We're waiting...</div>
                    )}
                </div>
            </div>
            {tracks.length >= 2 && tracks.length <= 50 ? (
                <input
                    type="submit"
                    className="create_poll_button create_song_poll_button"
                    value="Create!"
                ></input>
            ) : (
                <input
                    type="submit"
                    className="create_poll_button create_song_poll_button"
                    value="Create!"
                    disabled
                ></input>
            )}
        </form>
    );
}

export default SpotifyAPI;
