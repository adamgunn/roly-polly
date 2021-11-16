var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function SpotifyAPI(props) {
    var title_placeholders = ['Which song has the best hook?', 'Which song is the worst?', 'Which song is the most underrated?', 'Which song has the best lyrics?', 'Which song has the best cover?', 'Which song has the best feature?', 'Which song was the most influential?'];

    var _useState = useState(''),
        _useState2 = _slicedToArray(_useState, 2),
        query = _useState2[0],
        setQuery = _useState2[1];

    var _useState3 = useState(),
        _useState4 = _slicedToArray(_useState3, 2),
        socket = _useState4[0],
        setSocket = _useState4[1];

    var _useState5 = useState(''),
        _useState6 = _slicedToArray(_useState5, 2),
        imageUrl = _useState6[0],
        setImageUrl = _useState6[1];

    var _useState7 = useState(''),
        _useState8 = _slicedToArray(_useState7, 2),
        error = _useState8[0],
        setError = _useState8[1];

    var _useState9 = useState(''),
        _useState10 = _slicedToArray(_useState9, 2),
        artist_result = _useState10[0],
        setArtistResult = _useState10[1];

    var _useState11 = useState(''),
        _useState12 = _slicedToArray(_useState11, 2),
        title_result = _useState12[0],
        setTitleResult = _useState12[1];

    var _useState13 = useState([]),
        _useState14 = _slicedToArray(_useState13, 2),
        tracks = _useState14[0],
        setTracks = _useState14[1];

    var _useState15 = useState(''),
        _useState16 = _slicedToArray(_useState15, 2),
        poll_title = _useState16[0],
        setPollTitle = _useState16[1];

    var _useState17 = useState(title_placeholders[Math.floor(Math.random() * title_placeholders.length)]),
        _useState18 = _slicedToArray(_useState17, 2),
        title_placeholder = _useState18[0],
        setTitlePlaceholder = _useState18[1];

    var queryChange = function queryChange(e) {
        setQuery(e.target.value);
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
        setQuery('');
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
                    { 'for': 'query_input', className: 'create_poll_header' },
                    'Enter a Spotify search query, e.g. "michael jackson billie jean"'
                ),
                React.createElement('br', null),
                React.createElement('input', {
                    name: 'query_input',
                    id: 'query_input',
                    value: query,
                    onChange: queryChange,
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
                query != '' ? React.createElement(
                    'button',
                    {
                        onClick: trackSearch,
                        className: 'create_poll_button search_spotify_button',
                        type: 'button'
                    },
                    'Search Spotify ',
                    React.createElement(
                        'svg',
                        {
                            width: 16,
                            height: 16,
                            className: 'spotify_icon',
                            viewBox: '0 0 16 16'
                        },
                        React.createElement('path', { d: 'M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z' })
                    )
                ) : React.createElement(
                    'button',
                    {
                        className: 'create_poll_button search_spotify_button',
                        type: 'button',
                        disabled: true
                    },
                    'Search Spotify ',
                    React.createElement(
                        'svg',
                        { className: 'spotify_icon', viewBox: '0 0 16 16' },
                        React.createElement('path', { d: 'M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z' })
                    )
                )
            ),
            React.createElement(
                'p',
                { className: 'body_text error_text' },
                error
            ),
            artist_result != '' && title_result != '' ? React.createElement(
                'div',
                { className: 'track_result_card_wrapper' },
                'Result:',
                React.createElement(
                    'div',
                    { className: 'track_card' },
                    React.createElement('img', { src: imageUrl, className: 'track_card_cover' }),
                    React.createElement(
                        'p',
                        { className: 'track_card_title body_text' },
                        title_result
                    ),
                    React.createElement(
                        'p',
                        { className: 'track_card_artist body_text' },
                        artist_result
                    ),
                    React.createElement(
                        'button',
                        {
                            onClick: addTrack,
                            className: 'create_poll_button add_track_button',
                            type: 'button'
                        },
                        React.createElement(
                            'svg',
                            {
                                width: 30,
                                height: 30,
                                className: 'plus_icon',
                                viewBox: '0 0 16 16'
                            },
                            React.createElement('path', {
                                'fill-rule': 'evenodd',
                                d: 'M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z'
                            })
                        )
                    )
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
                                    viewBox: '0 0 16 16',
                                    key: index,
                                    index: index
                                },
                                React.createElement('path', {
                                    'fill-rule': 'evenodd',
                                    d: 'M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z'
                                }),
                                React.createElement('path', {
                                    'fill-rule': 'evenodd',
                                    d: 'M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z'
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
        tracks.length >= 2 && tracks.length <= 50 ? React.createElement('input', {
            type: 'submit',
            className: 'create_poll_button create_song_poll_button',
            value: 'Create!'
        }) : React.createElement('input', {
            type: 'submit',
            className: 'create_poll_button create_song_poll_button',
            value: 'Create!',
            disabled: true
        })
    );
}

export default SpotifyAPI;