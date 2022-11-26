import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function SpotifyAPI() {
    const title_placeholders = [
        'Which song has the best hook?',
        'Which song is the worst?',
        'Which song is the most underrated?',
        'Which song has the best lyrics?',
        'Which song has the best cover art?',
        'Which song has the best feature?',
        'Which song was the most influential?',
        'Which is the best road trip song?',
        'Which is the best song to sing in the shower?',
        'Which song is the catchiest?',
    ];

    const [query, setQuery] = useState('');
    const [socket, setSocket] = useState();
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const [artist_result, setArtistResult] = useState('');
    const [title_result, setTitleResult] = useState('');
    const [tracks, setTracks] = useState([]);
    const [query_valid, setQueryValid] = useState(false);
    const [creator_vote, setCreatorVote] = useState(false);
    const [title_placeholder] = useState(
        title_placeholders[
            Math.floor(Math.random() * title_placeholders.length)
        ]
    );

    document.title = 'Create Song Poll | RolyPolly';

    const queryChange = (e) => {
        setQuery(e.target.value);
        setQueryValid(e.target.value != '' && /\S/.test(e.target.value));
    };

    useEffect(() => {
        setSocket(io(window.location.host));
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket == null) return;
        if (!query_valid) {
            setImageUrl('');
            setArtistResult('');
            setTitleResult('');
            return;
        }
        var loaded = false;
        socket.once('track-found', (data) => {
            loaded = true;
            setImageUrl(data.url);
            setArtistResult(data.artist);
            setTitleResult(data.title);
            setError('');
        });
        socket.once('track-not-found', () => {
            loaded = true;
            setImageUrl('');
            setArtistResult('');
            setTitleResult('');
            setError('Nothing found on spotify with those search terms.');
        });
        socket.once('error', (err) => {
            loaded = true;
            setImageUrl('');
            setArtistResult('');
            setTitleResult('');
            setError(
                'The server encountered an error with the Spotify API. Try refreshing?'
            );
            console.log(err);
        });
        socket.emit('search-tracks', query);
        setTimeout(() => {
            if (!loaded) {
                setImageUrl('');
                setArtistResult('');
                setTitleResult('Loading...');
            }
        }, 3000);
    }, [socket, query]);

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
        setQueryValid(false);
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

    const toggleCreatorVote = (e) => {
        e.preventDefault();
        setCreatorVote(!creator_vote);
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
                    <label htmlFor="title_input" className="create_poll_header">
                        Enter a poll title
                    </label>
                    <br />
                    <input
                        name="title_input"
                        id="title_input"
                        placeholder={title_placeholder}
                        className="create_poll_input"
                        type="text"
                    />
                </li>
                <li className="checkbox_wrapper" onClick={toggleCreatorVote}>
                    <input
                        name="creator_vote"
                        id="creator_vote"
                        className="checkbox"
                        type="checkbox"
                        onClick={toggleCreatorVote}
                    />
                    <span
                        className="visible_checkbox"
                        onClick={toggleCreatorVote}
                    >
                        {creator_vote ? (
                            <svg
                                width="16"
                                height="16"
                                className="checkbox_icon"
                                viewBox="0 0 16 16"
                            >
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
                            </svg>
                        ) : (
                            <svg
                                width="16"
                                height="16"
                                className="checkbox_icon"
                                viewBox="0 0 16 16"
                            >
                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                            </svg>
                        )}
                    </span>
                    <label
                        htmlFor="creator_vote"
                        className="create_poll_header"
                        onClick={toggleCreatorVote}
                    >
                        Let me vote in this poll
                    </label>
                </li>
                <li>
                    <label htmlFor="query_input" className="create_poll_header">
                        Start typing a Spotify search query, e.g. &ldquo;michael
                        jackson billie jean&rdquo;
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
                    <input
                        type="hidden"
                        id="creator_vote"
                        name="creator_vote"
                        value={creator_vote}
                    ></input>
                </li>
                <p className="body_text error_text">{error}</p>
                {title_result != '' ? (
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
                                        fillRule="evenodd"
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
                                                fillRule="evenodd"
                                                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="no_colors">We&apos;re waiting...</div>
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
