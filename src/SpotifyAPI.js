var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function SpotifyAPI(props) {
    var title_placeholders = ['Which song has the best hook?', 'Which song is the worst?', 'Which song is the most underrated?', 'Which song has the best lyrics?', 'Which song has the best cover?', 'Which song has the best feature?', 'Which song was the most influential?'];

    var _useState = useState(''),
        _useState2 = _slicedToArray(_useState, 2),
        artist = _useState2[0],
        setArtist = _useState2[1];

    var _useState3 = useState(''),
        _useState4 = _slicedToArray(_useState3, 2),
        track = _useState4[0],
        setTrack = _useState4[1];

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

    var _useState11 = useState(''),
        _useState12 = _slicedToArray(_useState11, 2),
        artist_result = _useState12[0],
        setArtistResult = _useState12[1];

    var _useState13 = useState(''),
        _useState14 = _slicedToArray(_useState13, 2),
        title_result = _useState14[0],
        setTitleResult = _useState14[1];

    var _useState15 = useState([]),
        _useState16 = _slicedToArray(_useState15, 2),
        tracks = _useState16[0],
        setTracks = _useState16[1];

    var _useState17 = useState(''),
        _useState18 = _slicedToArray(_useState17, 2),
        poll_title = _useState18[0],
        setPollTitle = _useState18[1];

    var _useState19 = useState(title_placeholders[Math.floor(Math.random() * title_placeholders.length)]),
        _useState20 = _slicedToArray(_useState19, 2),
        title_placeholder = _useState20[0],
        setTitlePlaceholder = _useState20[1];

    var artistChange = function artistChange(e) {
        setArtist(e.target.value);
    };

    var trackChange = function trackChange(e) {
        setTrack(e.target.value);
    };

    var pollTitleChange = function pollTitleChange(e) {
        setPollTitle(e.target.value);
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

    var trackSearch = function trackSearch() {
        if (socket == null) return;
        socket.once('track-found', function (data) {
            setImageUrl(data.url);
            setArtistResult(data.artist);
            setTitleResult(data.title);
            setError('');
        });
        socket.once('track-not-found', function () {
            setImageUrl('');
            setArtistResult('');
            setTitleResult('');
            setError('Nothing found on spotify with those search terms.');
        });
        socket.once('error', function (err) {
            setImageUrl('');
            setArtistResult('');
            setTitleResult('');
            setError('The server encountered an arror with the Spotify API. Try refreshing?');
            console.log(err);
        });
        var query = {
            track: track,
            artist: artist
        };
        socket.emit('search-tracks', query);
    };

    var addTrack = function addTrack() {
        var tracks_state = [].concat(_toConsumableArray(tracks));
        var track_data = {
            artist: artist_result,
            title: title_result,
            url: imageUrl,
            index: tracks_state.length
        };
        tracks_state.push(track_data);
        setTracks(tracks_state);
        setTrack('');
        setArtist('');
        setTitleResult('');
        setArtistResult('');
        setImageUrl('');
    };

    var deleteTrack = function deleteTrack(e) {
        var index = e.target.getAttribute('index');
        var tracks_state = [].concat(_toConsumableArray(tracks));
        tracks_state.splice(index, 1);
        for (var i = 0; i < tracks_state.length; i++) {
            tracks_state[i].index = i;
        }
        setTracks(tracks_state);
    };

    return React.createElement(
        'form',
        {
            className: 'spotify_wrapper',
            method: 'post',
            action: '/submit-new-song-poll'
        },
        React.createElement(
            'ul',
            { className: 'create_poll_wrapper' },
            React.createElement(
                'h3',
                { className: 'rolypolly_subtitle' },
                'Create your song poll'
            ),
            React.createElement(
                'li',
                null,
                React.createElement(
                    'label',
                    { 'for': 'title_input', className: 'create_poll_header' },
                    'Enter a poll title'
                ),
                React.createElement('br', null),
                React.createElement('input', {
                    name: 'title_input',
                    id: 'title_input',
                    onChange: pollTitleChange,
                    placeholder: title_placeholder,
                    className: 'create_poll_input',
                    type: 'text'
                })
            ),
            React.createElement(
                'li',
                null,
                React.createElement(
                    'label',
                    { 'for': 'artist_input', className: 'create_poll_header' },
                    'Enter an artist'
                ),
                React.createElement('br', null),
                React.createElement('input', {
                    name: 'artist_input',
                    id: 'artist_input',
                    value: artist,
                    onChange: artistChange,
                    className: 'create_poll_input',
                    type: 'text'
                })
            ),
            React.createElement(
                'li',
                null,
                React.createElement(
                    'label',
                    { 'for': 'track_input', className: 'create_poll_header' },
                    artist != '' ? 'Enter a track by ' + artist : 'Enter a track'
                ),
                React.createElement('br', null),
                React.createElement('input', {
                    name: 'track_input',
                    id: 'track_input',
                    value: track,
                    onChange: trackChange,
                    className: 'create_poll_input',
                    type: 'text'
                })
            ),
            React.createElement(
                'li',
                null,
                React.createElement('input', {
                    type: 'hidden',
                    id: 'tracks_data',
                    name: 'tracks_data',
                    value: JSON.stringify(tracks)
                })
            ),
            React.createElement(
                'li',
                null,
                track != '' && artist != '' ? React.createElement(
                    'button',
                    {
                        onClick: trackSearch,
                        className: 'create_poll_button',
                        type: 'button'
                    },
                    'Search for ' + track + ' by ' + artist
                ) : React.createElement(
                    'button',
                    {
                        className: 'create_poll_button',
                        type: 'button',
                        disabled: true
                    },
                    'Search'
                )
            ),
            React.createElement(
                'p',
                { className: 'body_text error_text' },
                error
            ),
            imageUrl != '' ? React.createElement('img', { src: imageUrl }) : React.createElement('div', null),
            artist_result != '' && title_result != '' ? React.createElement(
                'div',
                null,
                React.createElement(
                    'p',
                    { className: 'body_text' },
                    'Result: "' + title_result + '" by ' + artist_result
                ),
                React.createElement(
                    'button',
                    {
                        onClick: addTrack,
                        className: 'create_poll_button'
                    },
                    'Add this track to the poll'
                )
            ) : React.createElement('div', null)
        ),
        React.createElement(
            'div',
            { className: 'track_cards_wrapper' },
            React.createElement(
                'h3',
                { className: 'rolypolly_subtitle' },
                'Your tracks'
            ),
            React.createElement('br', null),
            React.createElement(
                'div',
                { className: 'track_cards' },
                tracks.length > 0 ? tracks.map(function (track_option, index) {
                    return React.createElement(
                        'div',
                        {
                            className: 'track_card',
                            index: index,
                            key: index
                        },
                        React.createElement('img', {
                            src: track_option.url,
                            className: 'track_card_cover'
                        }),
                        React.createElement(
                            'p',
                            { className: 'track_card_title body_text' },
                            track_option.title
                        ),
                        React.createElement(
                            'p',
                            { className: 'track_card_artist body_text' },
                            track_option.artist
                        ),
                        React.createElement(
                            'div',
                            {
                                className: 'x_button_wrapper',
                                onClick: deleteTrack
                            },
                            React.createElement(
                                'svg',
                                {
                                    className: 'x-button',
                                    width: 20,
                                    height: 20,
                                    viewBox: '0 0 91.61 91.61',
                                    key: index,
                                    index: index
                                },
                                React.createElement('line', {
                                    className: 'cls-1',
                                    index: index,
                                    x1: '5.3',
                                    y1: '5.3',
                                    x2: '86.3',
                                    y2: '86.3'
                                }),
                                React.createElement('line', {
                                    className: 'cls-1',
                                    index: index,
                                    x1: '86.3',
                                    y1: '5.3',
                                    x2: '5.3',
                                    y2: '86.3'
                                })
                            )
                        )
                    );
                }) : React.createElement(
                    'div',
                    { className: 'no_colors' },
                    'We\'re waiting...'
                )
            )
        ),
        tracks.length >= 2 && tracks.length <= 50 ? React.createElement('input', { type: 'submit', className: 'create_poll_button', value: 'Create!' }) : React.createElement('input', { type: 'submit', className: 'create_poll_button', value: 'Create!', disabled: true })
    );
}

export default SpotifyAPI;