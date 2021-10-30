import { useState } from 'react';

function CreatePoll(props) {
    const DEFAULT_POLL_TITLE = 'My awesome poll';
    const DEFAULT_NUM_OPTIONS = 2;
    const DEFAULT_COLORS = ['#8b0000', '#ffd700', '#006400', '#4169e1'];
    const MAX_OPTIONS = 26;

    // const submitClicked = () => {
    //     const poll_data = {
    //         title: title,
    //         colors: colors,
    //         options: options,
    //     };
    //     props.submitPoll(poll_data);
    // };

    const [num_options, setNumOptions] = useState(DEFAULT_NUM_OPTIONS);
    const [options, setOptions] = useState(
        new Array(DEFAULT_NUM_OPTIONS).fill('')
    );
    const [title, setTitle] = useState(DEFAULT_POLL_TITLE);
    const [colors, setColors] = useState(DEFAULT_COLORS);
    const [valid, setValid] = useState(false);

    const numOptionsChange = (e) => {
        const old_num_options = num_options;
        const new_num_options =
            e.target.value > MAX_OPTIONS ? MAX_OPTIONS : e.target.value;
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

    const titleChange = (e) => {
        setTitle(e.target.value);
    };

    const optionChange = (e) => {
        var options_state = options;
        options_state[e.target.getAttribute('index')] = e.target.value;
        setOptions(options_state);
        verifyEntries();
    };

    const colorChange = (e) => {
        var new_colors = e.target.value.match(
            /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)/gi
        );
        if (!new_colors || new_colors.length === 0) {
            new_colors = DEFAULT_COLORS;
        }
        setColors(new_colors);
    };

    const verifyEntries = () => {
        if (options.length < 2 || options.length > 26 || !num_options) {
            setValid(false);
            return;
        }
        for (var i = 0; i < options.length; i++) {
            if (!options[i] || options[i] == '' || options[i] == null) {
                setValid(false);
                return;
            }
        }
        setValid(true);
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
                        onChange={titleChange}
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
                        min={2}
                        max={MAX_OPTIONS}
                        onChange={numOptionsChange}
                    />
                </li>
                {options.map((option, index) => {
                    return (
                        <li className="option_input_wrapper">
                            <label
                                className="create_poll_header"
                                htmlFor={'option_' + index}
                                key={'label_' + index}
                            >
                                {'Option ' +
                                    String.fromCharCode(
                                        97 + index
                                    ).toUpperCase() +
                                    ' - required'}
                            </label>
                            <br />
                            <input
                                type="text"
                                name={'option_' + index}
                                id={'option_' + index}
                                index={index}
                                key={index}
                                onChange={optionChange}
                            />
                        </li>
                    );
                })}
                <li className="create_poll_input">
                    <label
                        className="create_poll_header"
                        htmlFor="colors_input"
                    >
                        Poll colors
                    </label>
                    <br />
                    <textarea
                        className="colors_input"
                        name="colors_input"
                        id="colors_input"
                        onChange={colorChange}
                        placeholder="#8b0000
                                    rgb(255, 215, 0)
                                    hsl(120, 100%, 20%)
                                    #4169E1"
                    ></textarea>
                </li>
                <h3 className="your_colors">Your colors</h3>
                <div className="color_samples_grid">
                    {colors.map((color) => {
                        return (
                            <div
                                className="color_sample"
                                style={{ backgroundColor: color }}
                            ></div>
                        );
                    })}
                </div>
                <input
                    type="hidden"
                    id="title_data"
                    name="submission_data"
                    value={JSON.stringify({ title: title, colors: colors, options: options })}
                />
                {valid ? (
                    <li>
                        <input value="Create!" type="submit" className="create_poll_button" />
                    </li>
                ) : (
                    <li>
                        <input value="Create!" type="submit" className="create_poll_button" disabled/>
                    </li>
                )}
            </ul>
        </form>
    );
}

export default CreatePoll;
