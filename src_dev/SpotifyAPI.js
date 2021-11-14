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

    const [artist, setArtist] = useState('');
    const [track, setTrack] = useState('');
    const [socket, setSocket] = useState();
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const [artist_result, setArtistResult] = useState('');
    const [title_result, setTitleResult] = useState('');
    const [tracks, setTracks] = useState([]);
    const [poll_title, setPollTitle] = useState('');
    const [title_placeholder, setTitlePlaceholder] = useState(title_placeholders[Math.floor(Math.random() * title_placeholders.length)]);

    const artistChange = (e) => {
        setArtist(e.target.value);
    };

    

    const trackChange = (e) => {
        setTrack(e.target.value);
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
        const query = {
            track: track,
            artist: artist,
        };
        socket.emit('search-tracks', query);
    };

    const addTrack = () => {
        var tracks_state = [...tracks];
        const track_data = {
            artist: artist_result,
            title: title_result,
            url: imageUrl,
        };
        tracks_state.push(track_data);
        setTracks(tracks_state);
        setTrack('');
        setArtist('');
        setTitleResult('');
        setArtistResult('');
        setImageUrl('');
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
                    <label for="artist_input" className="create_poll_header">
                        Enter an artist
                    </label>
                    <br />
                    <input
                        name="artist_input"
                        id="artist_input"
                        value={artist}
                        onChange={artistChange}
                        className="create_poll_input"
                        type="text"
                    />
                </li>
                <li>
                    <label for="track_input" className="create_poll_header">
                        {artist != ''
                            ? 'Enter a track by ' + artist
                            : 'Enter a track'}
                    </label>
                    <br />
                    <input
                        name="track_input"
                        id="track_input"
                        value={track}
                        onChange={trackChange}
                        className="create_poll_input"
                        type="text"
                    />
                </li>
                <li>
                    {track != '' && artist != '' ? (
                        <button
                            onClick={trackSearch}
                            className="create_poll_button"
                            type="button"
                        >
                            {'Search for ' + track + ' by ' + artist}
                        </button>
                    ) : (
                        <button className="create_poll_button" type="button" disabled>
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
                                <div className="track_card" index={index}>
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
                                </div>
                            );
                        })
                    ) : (
                        <div className="no_colors">We're waiting...</div>
                    )}
                </div>
            </div>
            <input type="hidden" value={tracks}></input>
            <input type="submit" value="Submit" disabled></input>
        </form>
    );
}

export default SpotifyAPI;
