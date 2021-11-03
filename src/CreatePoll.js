var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import { useState, useEffect } from 'react';
import { ColorPicker } from '@mantine/core';
import blackOrWhite from './blackOrWhite.js';

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

    var _useState5 = useState([]),
        _useState6 = _slicedToArray(_useState5, 2),
        colors = _useState6[0],
        setColors = _useState6[1];

    var _useState7 = useState(false),
        _useState8 = _slicedToArray(_useState7, 2),
        valid = _useState8[0],
        setValid = _useState8[1];

    var _useState9 = useState(DEFAULT_COLORS[0]),
        _useState10 = _slicedToArray(_useState9, 2),
        picker_color = _useState10[0],
        setPickerColor = _useState10[1];

    var _useState11 = useState(false),
        _useState12 = _slicedToArray(_useState11, 2),
        bad_size = _useState12[0],
        setBadSize = _useState12[1];

    var numOptionsChange = function numOptionsChange(e) {
        var old_num_options = num_options;
        var new_num_options = e.target.value;
        if (e.target.value > MAX_OPTIONS) {
            setBadSize(true);
            new_num_options = MAX_OPTIONS;
        } else if (e.target.value < DEFAULT_NUM_OPTIONS) {
            setBadSize(true);
            new_num_options = DEFAULT_NUM_OPTIONS;
        } else {
            setBadSize(false);
        }
        setNumOptions(new_num_options);
        var delta = old_num_options - new_num_options;
        var new_options = [].concat(_toConsumableArray(options));
        var new_colors = [].concat(_toConsumableArray(colors));
        if (delta > 0) {
            new_options.length = new_num_options;
            if (new_colors.length > new_num_options) new_colors.length = new_num_options;
        } else {
            while (delta++ < 0) {
                new_options.push('');
            }
            if (new_num_options != DEFAULT_NUM_OPTIONS) {
                setValid(false);
                setOptions(new_options);
                return;
            }
        }
        setOptions(new_options);
        setColors(new_colors);
        verifyEntries();
    };

    var addColor = function addColor() {
        console.log('adding color');
        var colors_state = [].concat(_toConsumableArray(colors));
        if (colors.length < num_options) {
            colors_state.push(picker_color);
        }
        setColors(colors_state);
    };

    var verifyEntries = function verifyEntries() {
        if (options.length < 2 || options.length > MAX_OPTIONS || !num_options) {
            setValid(false);
            return;
        }
        console.log(options.length);
        for (var i = 0; i < options.length; i++) {
            var option = document.getElementById('option_' + i).value;
            if (!option || option == '' || option == null) {
                setValid(false);
                return;
            }
        }
        setValid(true);
    };

    var verifyColors = function verifyColors() {
        if (colors.length > num_options || colors.length < 1) {
            setValid(false);
            return;
        }
        verifyEntries();
    };

    useEffect(function () {
        verifyColors();
    }, [colors]);

    var deleteColor = function deleteColor(e) {
        var new_colors = [].concat(_toConsumableArray(colors));
        new_colors.splice(e.target.getAttribute('index'), 1);
        setColors(new_colors);
        verifyColors();
    };

    var verify = function verify() {
        verifyEntries();
        verifyColors();
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
                }),
                bad_size ? React.createElement(
                    'p',
                    { className: 'body_text error_text' },
                    'Number of options must be between 2 and 26'
                ) : React.createElement('div', null)
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
                        onChange: verify
                    })
                );
            }),
            React.createElement(
                'li',
                { className: 'create_poll_input' },
                React.createElement(
                    'p',
                    { className: 'create_poll_header' },
                    'Choose 1-',
                    num_options,
                    ' colors'
                ),
                React.createElement(
                    'div',
                    { className: 'color_picker_wrapper' },
                    React.createElement(ColorPicker, {
                        size: 'xl',
                        value: picker_color,
                        onChange: setPickerColor
                    }),
                    colors.length < num_options ? React.createElement(
                        'button',
                        {
                            className: 'add_color_button',
                            type: 'button',
                            onClick: addColor,
                            style: {
                                backgroundColor: picker_color,
                                color: blackOrWhite(picker_color)
                            }
                        },
                        'Add color'
                    ) : React.createElement(
                        'button',
                        {
                            className: 'add_color_button',
                            type: 'button',
                            disabled: true
                        },
                        'Add color'
                    )
                )
            ),
            React.createElement(
                'h3',
                { className: 'your_colors' },
                'Your colors'
            ),
            colors.length > 0 ? React.createElement(
                'div',
                { className: 'color_samples_grid' },
                colors.map(function (color, index) {
                    return React.createElement(
                        'div',
                        {
                            className: 'color_sample',
                            style: { backgroundColor: color }
                        },
                        React.createElement(
                            'svg',
                            {
                                className: 'x-button',
                                width: 25,
                                height: 25,
                                viewBox: '0 0 91.61 91.61',
                                key: index,
                                index: index,
                                onClick: deleteColor
                            },
                            React.createElement('line', {
                                className: 'cls-1',
                                style: {
                                    fill: blackOrWhite(color),
                                    stroke: blackOrWhite(color)
                                },
                                index: index,
                                x1: '5.3',
                                y1: '5.3',
                                x2: '86.3',
                                y2: '86.3'
                            }),
                            React.createElement('line', {
                                className: 'cls-1',
                                style: {
                                    fill: blackOrWhite(color),
                                    stroke: blackOrWhite(color)
                                },
                                index: index,
                                x1: '86.3',
                                y1: '5.3',
                                x2: '5.3',
                                y2: '86.3'
                            })
                        )
                    );
                })
            ) : React.createElement(
                'p',
                { className: 'no_colors' },
                'None so far... :('
            ),
            React.createElement('input', {
                type: 'hidden',
                name: 'colors',
                id: 'colors',
                value: JSON.stringify(colors)
            }),
            valid && !bad_size ? React.createElement(
                'li',
                null,
                React.createElement('input', {
                    value: 'Create!',
                    type: 'submit',
                    className: 'create_poll_button'
                })
            ) : React.createElement(
                'li',
                null,
                React.createElement('input', {
                    value: 'Create!',
                    type: 'submit',
                    className: 'create_poll_button',
                    disabled: true
                })
            )
        )
    );
}

export default CreatePoll;