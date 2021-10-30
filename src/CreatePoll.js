var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { useState, useEffect } from 'react';

function CreatePoll(props) {
    var DEFAULT_POLL_TITLE = 'My awesome poll';
    var DEFAULT_NUM_OPTIONS = 2;
    var DEFAULT_COLORS = ['#8b0000', '#ffd700', '#006400', '#4169e1'];
    var MAX_OPTIONS = 26;
    var EMPTY_OPTIONS = Array(DEFAULT_NUM_OPTIONS).fill('');

    var _useState = useState(DEFAULT_NUM_OPTIONS),
        _useState2 = _slicedToArray(_useState, 2),
        num_options = _useState2[0],
        setNumOptions = _useState2[1];

    var _useState3 = useState(EMPTY_OPTIONS),
        _useState4 = _slicedToArray(_useState3, 2),
        options = _useState4[0],
        setOptions = _useState4[1];

    var _useState5 = useState(DEFAULT_COLORS),
        _useState6 = _slicedToArray(_useState5, 2),
        colors = _useState6[0],
        setColors = _useState6[1];

    var _useState7 = useState(false),
        _useState8 = _slicedToArray(_useState7, 2),
        valid = _useState8[0],
        setValid = _useState8[1];

    var numOptionsChange = function numOptionsChange(e) {
        var old_num_options = num_options;
        var new_num_options = e.target.value > MAX_OPTIONS ? MAX_OPTIONS : e.target.value;
        setNumOptions(new_num_options);
        var delta = old_num_options - new_num_options;
        var new_options = options;
        if (delta > 0) {
            new_options.length = new_num_options;
        } else {
            while (delta++ < 0) {
                new_options.push('');
            }
        }
        setOptions(new_options);
        verifyEntries();
    };

    var colorChange = function colorChange(e) {
        var new_colors = e.target.value.match(/(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)/gi);
        if (!new_colors || new_colors.length === 0) {
            new_colors = DEFAULT_COLORS;
        }
        setColors(new_colors);
    };

    var verifyEntries = function verifyEntries() {
        if (options.length < 2 || options.length > MAX_OPTIONS || !num_options) {
            setValid(false);
            return;
        }
        for (var i = 0; i < options.length; i++) {
            var option = document.getElementById("option_" + i).value;
            if (!option || option == '' || option == null) {
                setValid(false);
                return;
            }
        }
        setValid(true);
    };

    return React.createElement(
        'form',
        { method: 'post', action: '/submit-new-poll' },
        React.createElement(
            'ul',
            { className: 'create_poll_wrapper' },
            React.createElement(
                'li',
                null,
                React.createElement(
                    'h3',
                    { className: 'rolypolly_subtitle' },
                    'Create your poll'
                )
            ),
            React.createElement(
                'li',
                { className: 'create_poll_input' },
                React.createElement(
                    'label',
                    { className: 'create_poll_header', htmlFor: 'title' },
                    'Title'
                ),
                React.createElement('br', null),
                React.createElement('input', {
                    type: 'text',
                    name: 'title',
                    id: 'title',
                    placeholder: DEFAULT_POLL_TITLE
                })
            ),
            React.createElement(
                'li',
                { className: 'create_poll_input' },
                React.createElement(
                    'label',
                    { className: 'create_poll_header', htmlFor: 'num_options' },
                    'Number of options'
                ),
                React.createElement('br', null),
                React.createElement('input', {
                    type: 'number',
                    name: 'num_options',
                    id: 'num_options',
                    min: DEFAULT_NUM_OPTIONS,
                    max: MAX_OPTIONS,
                    onChange: numOptionsChange
                })
            ),
            options.map(function (option, index) {
                return React.createElement(
                    'li',
                    { className: 'option_input_wrapper' },
                    React.createElement(
                        'label',
                        {
                            className: 'create_poll_header',
                            htmlFor: 'option_' + index,
                            key: 'label_' + index
                        },
                        'Option ' + String.fromCharCode(97 + index).toUpperCase() + ' - required'
                    ),
                    React.createElement('br', null),
                    React.createElement('input', {
                        type: 'text',
                        name: 'option_' + index,
                        id: 'option_' + index,
                        index: index,
                        key: index,
                        onChange: verifyEntries
                    })
                );
            }),
            React.createElement(
                'li',
                { className: 'create_poll_input' },
                React.createElement(
                    'label',
                    {
                        className: 'create_poll_header',
                        htmlFor: 'colors_input'
                    },
                    'Poll colors'
                ),
                React.createElement('br', null),
                React.createElement('textarea', {
                    className: 'colors_input',
                    name: 'colors_input',
                    id: 'colors_input',
                    onChange: colorChange,
                    placeholder: '#8b0000\r rgb(255, 215, 0)\r hsl(120, 100%, 20%)\r #4169E1'
                })
            ),
            React.createElement(
                'h3',
                { className: 'your_colors' },
                'Your colors'
            ),
            React.createElement(
                'div',
                { className: 'color_samples_grid' },
                colors.map(function (color) {
                    return React.createElement('div', {
                        className: 'color_sample',
                        style: { backgroundColor: color }
                    });
                })
            ),
            valid ? React.createElement(
                'li',
                null,
                React.createElement('input', { value: 'Create!', type: 'submit', className: 'create_poll_button' })
            ) : React.createElement(
                'li',
                null,
                React.createElement('input', { value: 'Create!', type: 'submit', className: 'create_poll_button', disabled: true })
            )
        )
    );
}

export default CreatePoll;