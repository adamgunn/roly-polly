var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function SpotifyAPI(props) {
    var _useState = useState(''),
        _useState2 = _slicedToArray(_useState, 2),
        artist = _useState2[0],
        setArtist = _useState2[1];

    var _useState3 = useState(''),
        _useState4 = _slicedToArray(_useState3, 2),
        album = _useState4[0],
        setAlbum = _useState4[1];

    var _useState5 = useState(),
        _useState6 = _slicedToArray(_useState5, 2),
        socket = _useState6[0],
        setSocket = _useState6[1];

    var _useState7 = useState(''),
        _useState8 = _slicedToArray(_useState7, 2),
        imageUrl = _useState8[0],
        setImageUrl = _useState8[1];

    var _useState9 = useState(''),
        _useState10 = _slicedToArray(_useState9, 2),
        error = _useState10[0],
        setError = _useState10[1];

    var artistChange = function artistChange(e) {
        setArtist(e.target.value);
    };

    var albumChange = function albumChange(e) {
        setAlbum(e.target.value);
    };

    useEffect(function () {
        setSocket(io(window.location.host));
        return function () {
            socket.disconnect();
        };
    }, []);

    useEffect(function () {
        if (socket == null) return;
    }, [socket]);

    var albumSearch = function albumSearch() {
        if (socket == null) return;
        socket.once('album-found', function (url) {
            setImageUrl(url);
            setError('');
        });
        socket.once('album-not-found', function () {
            setImageUrl('');
            setError('Nothing found on spotify with those search terms.');
        });
        socket.once('error', function (err) {
            setImageUrl('');
            setError('The server encountered an arror with the Spotify API. Try refreshing?');
            console.log(err);
        });
        var query = {
            album: album,
            artist: artist
        };
        socket.emit('search-albums', query);
    };

    return React.createElement(
        'ul',
        { className: 'spotify_search' },
        React.createElement(
            'li',
            null,
            React.createElement(
                'label',
                { 'for': 'artist_input', className: 'create_poll_header' },
                'Enter an artist'
            ),
            React.createElement('input', {
                name: 'artist_input',
                id: 'artist_input',
                value: artist,
                onChange: artistChange,
                type: 'text'
            })
        ),
        React.createElement(
            'li',
            null,
            React.createElement(
                'label',
                { 'for': 'album_input', className: 'create_poll_header' },
                artist != '' ? 'Enter an album by ' + artist : 'Enter an album'
            ),
            React.createElement('input', {
                name: 'album_input',
                id: 'album_input',
                value: album,
                onChange: albumChange,
                type: 'text'
            })
        ),
        React.createElement(
            'li',
            null,
            album != '' && artist != '' ? React.createElement(
                'button',
                { onClick: albumSearch },
                'Search for ' + album + ' by ' + artist
            ) : React.createElement(
                'button',
                { disabled: true },
                'Search'
            )
        ),
        React.createElement(
            'p',
            { className: 'body_text error_text' },
            error
        ),
        imageUrl != '' ? React.createElement('img', { src: imageUrl }) : React.createElement('div', null)
    );
}

export default SpotifyAPI;