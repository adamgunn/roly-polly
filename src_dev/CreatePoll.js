import { useState } from 'react';

function CreatePoll(props) {
    const DEFAULT_POLL_TITLE = "My awesome poll";
    const DEFAULT_NUM_OPTIONS = 2;
    const DEFAULT_COLORS = ["#8b0000", "#ffd700", "#006400", "#4169e1"];
    const MAX_OPTIONS = 26;

    const submitClicked = () => {
        const poll_data = {
            title: title,
            colors: colors,
            options: options
        };
        props.submitPoll(poll_data);
    };

    const [num_options, setNumOptions] = useState(DEFAULT_NUM_OPTIONS);
    const [options, setOptions] = useState(new Array(DEFAULT_NUM_OPTIONS).fill(""));
    const [title, setTitle] = useState(DEFAULT_POLL_TITLE);
    const [colors, setColors] = useState(DEFAULT_COLORS);
    const [valid, setValid] = useState(false);

    const numOptionsChange = (e) => {
        const old_num_options = num_options;
        const new_num_options = e.target.value > MAX_OPTIONS ? MAX_OPTIONS : e.target.value;
        setNumOptions(new_num_options);
        var delta = old_num_options - new_num_options;
        var new_options = options;
        if (delta > 0) {
            new_options.length = new_num_options;
        }
        else {
            while (delta++ < 0) { 
                new_options.push(""); 
            }
        }
        setOptions(new_options);
        verifyEntries();
    }

    const titleChange = (e) => {
        setTitle(e.target.value);
    }

    const optionChange = (e) => {
        var options_state = options;
        options_state[e.target.getAttribute("index")] = e.target.value;
        setOptions(options_state);
        verifyEntries();
    }

    const colorChange = (e) => {
        var new_colors = e.target.value.match(/(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)/ig);
        if (!new_colors || new_colors.length === 0) {
            new_colors = DEFAULT_COLORS;
        }
        setColors(new_colors);
    }

    const verifyEntries = () => {
        for (var i = 0; i < options.length; i++) {
            if (!options[i] || options[i] == "" || options[i] == null) {
                setValid(false);
                return;
            }
        }
        setValid(true);
    }

    return (
        <ul className="create_poll_wrapper">
            <li>
                <h1 class="create_poll_title">Create your poll</h1>
            </li>
            <li className="create_poll_input">
                <label className="create_poll_header" for="title">Poll title</label>
                <br />
                <input type="text" name="title" id="title" placeholder={DEFAULT_POLL_TITLE} onChange={titleChange} />
            </li>
            <li className="create_poll_input">
                <label className="create_poll_header" for="num_options">Number of options</label>
                <br />
                <input type="number" name="num_options" id="num_options" min={2} max={MAX_OPTIONS} onChange={numOptionsChange} />
            </li>
            {
                options.map((option, index) => {
                    return (
                        <li className="option_input_wrapper">
                            <label className="create_poll_header" for={"option_" + index} key={"label_" + index}>
                                {"Option " + String.fromCharCode(97 + index).toUpperCase() + " - required"}
                            </label>
                            <br />
                            <input type="text" name={"option_" + index} id={"option_" + index} 
                                   index={index} key={index} onChange={optionChange}/>
                        </li>
                    )
                })
            }
            <li className="create_poll_input">
                <label className="create_poll_header" for="colors_input">Poll colors (please enter as a list of whitespace-separated RGB codes)</label>
                <br />
                <textarea className="colors_input" name="colors_input" id="colors_input" onChange={colorChange} placeholder="#8b0000 #ffd700 #006400 #4169e1"></textarea>
            </li>
            <h3 className="create_poll_header">Your colors</h3>
            <div className="color_samples_grid">
                {
                    colors.map((color) => {
                        return (
                            <div className="color_sample" style={{ backgroundColor: color }}></div>
                        )
                    })
                }
            </div>
            {
                valid ?
                    <li>
                        <button className="create_poll_button" onClick={submitClicked}>Create!</button>
                    </li>
                    :
                    <li>
                        <button className="create_poll_button" disabled>Create!</button>
                    </li>
            }
        </ul>
    );
}

export default CreatePoll;