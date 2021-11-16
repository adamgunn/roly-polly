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
                            className="create_poll_button search_spotify_button"
                            type="button"
                        >
                            {'Search Spotify '}
                            <svg
                                width={16}
                                height={16}
                                className="spotify_icon"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            className="create_poll_button search_spotify_button"
                            type="button"
                            disabled
                        >
                            {'Search Spotify '}
                            <svg className="spotify_icon" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z" />
                            </svg>
                        </button>
                    )}
                </li>
                <p className="body_text error_text">{error}</p>
                {artist_result != '' && title_result != '' ? (
                    <div className="track_result_card_wrapper">
                        Result:
                        <div className="track_card">
                            <img src={imageUrl} className="track_card_cover" />
                            <p className="track_card_title body_text">
                                {title_result}
                            </p>
                            <p className="track_card_artist body_text">
                                {artist_result}
                            </p>
                            <button
                                onClick={addTrack}
                                className="create_poll_button add_track_button"
                                type="button"
                            >
                                <svg
                                    width={30}
                                    height={30}
                                    className="plus_icon"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                                    />
                                </svg>
                            </button>
                        </div>
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
                                            viewBox="0 0 16 16"
                                            key={index}
                                            index={index}
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
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
