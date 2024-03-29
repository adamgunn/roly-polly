import React, { useState, useEffect } from 'react';
import { ColorPicker } from '@mantine/core';
import blackOrWhite from './blackOrWhite.js';

function CreatePoll() {
    const DEFAULT_POLL_TITLE = 'My awesome poll';
    const DEFAULT_NUM_OPTIONS = 2;
    const DEFAULT_COLORS = ['#8b0000', '#ffd700', '#006400', '#4169e1'];
    const MAX_OPTIONS = 50;
    const EMPTY_OPTIONS = Array(DEFAULT_NUM_OPTIONS).fill('');

    const [num_options, setNumOptions] = useState(DEFAULT_NUM_OPTIONS);
    const [options, setOptions] = useState(EMPTY_OPTIONS);
    const [colors, setColors] = useState([]);
    const [valid, setValid] = useState(false);
    const [picker_color, setPickerColor] = useState(DEFAULT_COLORS[0]);
    const [bad_size, setBadSize] = useState(false);
    const [creator_vote, setCreatorVote] = useState(false);

    document.title = 'Create Poll | RolyPolly';

    const numOptionsChange = (e) => {
        const old_num_options = num_options;
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
        var new_options = [...options];
        var new_colors = [...colors];
        if (delta > 0) {
            new_options.length = new_num_options;
            if (new_colors.length > new_num_options)
                new_colors.length = new_num_options;
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

    const addColor = () => {
        var colors_state = [...colors];
        if (colors.length < num_options) {
            colors_state.push(picker_color);
        }
        setColors(colors_state);
    };

    const verifyEntries = () => {
        if (
            options.length < 2 ||
            options.length > MAX_OPTIONS ||
            !num_options
        ) {
            setValid(false);
            return;
        }
        for (var i = 0; i < options.length; i++) {
            var option = document.getElementById('option_' + i).value;
            if (!option || option == '' || option == null) {
                setValid(false);
                return;
            }
        }
        setValid(true);
    };

    const verifyColors = () => {
        if (colors.length > num_options || colors.length < 1) {
            setValid(false);
            return;
        }
        verifyEntries();
    };

    useEffect(() => {
        verifyColors();
    }, [colors]);

    const deleteColor = (e) => {
        var new_colors = [...colors];
        new_colors.splice(e.target.getAttribute('index'), 1);
        setColors(new_colors);
        verifyColors();
    };

    const verify = () => {
        verifyEntries();
        verifyColors();
    };

    const toggleCreatorVote = (e) => {
        e.preventDefault();
        setCreatorVote(!creator_vote);
    };

    return (
        <form method="post" action="/submit-new-poll">
            <ul className="create_poll_wrapper">
                <li>
                    <h3 className="rolypolly_subtitle">Create your poll</h3>
                </li>
                <li className="create_poll_input">
                    <label className="create_poll_header" htmlFor="title">
                        Title
                    </label>
                    <br />
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder={DEFAULT_POLL_TITLE}
                    />
                </li>
                <li className="create_poll_input">
                    <label className="create_poll_header" htmlFor="num_options">
                        Number of options
                    </label>
                    <br />
                    <input
                        type="number"
                        name="num_options"
                        id="num_options"
                        min={DEFAULT_NUM_OPTIONS}
                        max={MAX_OPTIONS}
                        onChange={numOptionsChange}
                    />
                    {bad_size ? (
                        <p className="body_text error_text">
                            {'Number of options must be between ' +
                                DEFAULT_NUM_OPTIONS +
                                ' and ' +
                                MAX_OPTIONS}
                        </p>
                    ) : (
                        <div></div>
                    )}
                </li>
                {options.map((option, index) => {
                    return (
                        <li className="option_input_wrapper" key={index} >
                            <label
                                className="create_poll_header"
                                htmlFor={'option_' + index}
                                key={'label_' + index}
                            >
                                {'Option ' + (index + 1) + ' - required'}
                            </label>
                            <br />
                            <input
                                type="text"
                                name={'option_' + index}
                                id={'option_' + index}
                                index={index}
                                key={index}
                                onChange={verify}
                            />
                        </li>
                    );
                })}
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
                <li className="create_poll_input">
                    <p className="create_poll_header">
                        Choose 1-{num_options} colors
                    </p>
                    <div className="color_picker_wrapper">
                        <ColorPicker
                            size="xl"
                            value={picker_color}
                            onChange={setPickerColor}
                        />
                        {colors.length < num_options ? (
                            <button
                                className="add_color_button"
                                type="button"
                                onClick={addColor}
                                style={{
                                    backgroundColor: picker_color,
                                    color: blackOrWhite(picker_color),
                                }}
                            >
                                Add color
                            </button>
                        ) : (
                            <button
                                className="add_color_button"
                                type="button"
                                disabled
                            >
                                Add color
                            </button>
                        )}
                    </div>
                </li>
                <h3 className="your_colors">Your colors</h3>
                {colors.length > 0 ? (
                    <div className="color_samples_grid">
                        {colors.map((color, index) => {
                            return (
                                <div
                                    className="color_sample"
                                    style={{ backgroundColor: color }}
                                    key={index}
                                >
                                    <svg
                                        className="x-button"
                                        width={25}
                                        height={25}
                                        viewBox="0 0 91.61 91.61"
                                        key={index}
                                        index={index}
                                        onClick={deleteColor}
                                    >
                                        <line
                                            className="cls-1"
                                            style={{
                                                fill: blackOrWhite(color),
                                                stroke: blackOrWhite(color),
                                            }}
                                            index={index}
                                            x1="5.3"
                                            y1="5.3"
                                            x2="86.3"
                                            y2="86.3"
                                        />
                                        <line
                                            className="cls-1"
                                            style={{
                                                fill: blackOrWhite(color),
                                                stroke: blackOrWhite(color),
                                            }}
                                            index={index}
                                            x1="86.3"
                                            y1="5.3"
                                            x2="5.3"
                                            y2="86.3"
                                        />
                                    </svg>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="no_colors">None so far... :(</p>
                )}
                <input
                    type="hidden"
                    name="colors"
                    id="colors"
                    value={JSON.stringify(colors)}
                /> 
                <input
                    type="hidden"
                    id="creator_vote"
                    name="creator_vote"
                    value={creator_vote}
                />
                {valid && !bad_size ? (
                    <li>
                        <input
                            value="Create!"
                            type="submit"
                            className="create_poll_button"
                        />
                    </li>
                ) : (
                    <li>
                        <input
                            value="Create!"
                            type="submit"
                            className="create_poll_button"
                            disabled
                        />
                    </li>
                )}
            </ul>
        </form>
    );
}

export default CreatePoll;
