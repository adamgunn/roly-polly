import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function SpotifyAPI(props) {
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [socket, setSocket] = useState();
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

    const artistChange = (e) => {
        setArtist(e.target.value);
    };

    const albumChange = (e) => {
        setAlbum(e.target.value);
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

    const albumSearch = () => {
        if (socket == null) return;
        socket.once('album-found', (url) => {
            setImageUrl(url);
            setError('');
        });
        socket.once('album-not-found', () => {
            setImageUrl('');
            setError('Nothing found on spotify with those search terms.');
        });
        socket.once('error', (err) => {
            setImageUrl('');
            setError('The server encountered an arror with the Spotify API.')
            console.log(err);
        });
        const query = {
            album: album,
            artist: artist,
        };
        socket.emit('search-albums', query);
    };

    return (
        <ul className="spotify_search">
            <li>
                <label for="artist_input" className="create_poll_header">
                    Enter an artist
                </label>
                <input
                    name="artist_input"
                    id="artist_input"
                    value={artist}
                    onChange={artistChange}
                    type="text"
                />
            </li>
            <li>
                <label for="album_input" className="create_poll_header">
                    {artist != ''
                        ? 'Enter an album by ' + artist
                        : 'Enter an album'}
                </label>
                <input
                    name="album_input"
                    id="album_input"
                    value={album}
                    onChange={albumChange}
                    type="text"
                />
            </li>
            <li>
                {album != '' && artist != '' ? (
                    <button onClick={albumSearch}>
                        {'Search for ' + album + ' by ' + artist}
                    </button>
                ) : (
                    <button disabled>Search</button>
                )}
            </li>
            <p className="body_text error_text">{error}</p>
            {imageUrl != '' ? (
                <img src={imageUrl} />
            ) : (
                <div></div>
            )}
        </ul>
    );
}

export default SpotifyAPI;
