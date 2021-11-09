import { useState } from 'react';
import blackOrWhite from './blackOrWhite.js';

function Poll(props) {
    const colors = props.colors;
    const [selection, setSelection] = useState(null);

    const handleClick = function (e) {
        if (selection != null) props.onVote(selection);
    };

    const handleChoice = function (e) {
        setSelection(e.target.getAttribute('index'));
    };

    var bars = [];
    for (var i = 0; i < props.counts.length; i++) {
        bars.push(
            !props.already_voted ? (
                <div className="no_vote_option">
                    <input
                        type="radio"
                        name="option"
                        id={'option_' + i}
                        index={i}
                        onClick={handleChoice}
                        className="vote_radio"
                    />
                    <label className="radio_label" htmlFor={'option_' + i}>
                        {props.options[i]}
                    </label>
                    <div className="radio_inner"></div>
                </div>
            ) : (
                <div className="bar_graph_bar_wrapper ">
                    <div
                        style={{
                            backgroundColor: colors[i % colors.length],
                            width:
                                (props.counts[i] === 0
                                    ? 0.5
                                    : (props.counts[i] / props.num_votes) * 100
                                ).toString() + '%',
                        }}
                        className="bar_graph_bar"
                        key={i}
                    ></div>
                    <div className="bar_graph_text">
                        <div className="choice_text">{props.options[i]}</div>
                        <div className="vote_count">
                            {(props.num_votes === 0
                                ? '0.0'
                                : ((props.counts[i] / props.num_votes) * 100)
                                      .toFixed(1)
                                      .toString()) +
                                '% (' +
                                props.counts[i].toString() +
                                (props.counts[i] === 1 ? ' vote)' : ' votes)')}
                        </div>
                    </div>
                </div>
            )
        );
    }

    return (
        <div className="poll_wrapper">
            {props.connected_to_server ? (
                <div></div>
            ) : (
                <svg
                    width={32}
                    height={32}
                    className="not_connected"
                    viewBox="0 0 16 16"
                >
                    <path d="M10.706 3.294A12.545 12.545 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c.63 0 1.249.05 1.852.148l.854-.854zM8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065 8.448 8.448 0 0 1 3.51-1.27L8 6zm2.596 1.404.785-.785c.63.24 1.227.545 1.785.907a.482.482 0 0 1 .063.745.525.525 0 0 1-.652.065 8.462 8.462 0 0 0-1.98-.932zM8 10l.933-.933a6.455 6.455 0 0 1 2.013.637c.285.145.326.524.1.75l-.015.015a.532.532 0 0 1-.611.09A5.478 5.478 0 0 0 8 10zm4.905-4.905.747-.747c.59.3 1.153.645 1.685 1.03a.485.485 0 0 1 .047.737.518.518 0 0 1-.668.05 11.493 11.493 0 0 0-1.811-1.07zM9.02 11.78c.238.14.236.464.04.66l-.707.706a.5.5 0 0 1-.707 0l-.707-.707c-.195-.195-.197-.518.04-.66A1.99 1.99 0 0 1 8 11.5c.374 0 .723.102 1.021.28zm4.355-9.905a.53.53 0 0 1 .75.75l-10.75 10.75a.53.53 0 0 1-.75-.75l10.75-10.75z" />
                </svg>
            )}
            <div className="bar_graph_wrapper">
                <h1 className="poll_title">{props.title}</h1>
                {bars}
            </div>
            <div className="poll_buttons_wrapper">
                {props.connected_to_server &&
                !props.already_voted &&
                selection != null ? (
                    <button
                        className="vote_button"
                        onClick={handleClick}
                        style={{
                            backgroundColor: colors[selection % colors.length],
                            color: blackOrWhite(
                                colors[selection % colors.length]
                            ),
                        }}
                    >
                        Vote!
                    </button>
                ) : !props.already_voted ? (
                    <button className="vote_button" disabled>
                        Vote!
                    </button>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}

export default Poll;
