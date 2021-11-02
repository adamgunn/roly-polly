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
                <p className="connected">Connected</p>
            ) : (
                <p className="not_connected">Not connected</p>
            )}
            <div className="bar_graph_wrapper">
                <h1 className="poll_title">{props.title}</h1>
                {bars}
            </div>
            <div className="poll_buttons_wrapper">
                {props.connected_to_server && !props.already_voted && selection != null ? (
                    <button className="vote_button" onClick={handleClick}
                    style={{ backgroundColor: colors[selection % colors.length],
                             color: blackOrWhite(colors[selection % colors.length])}}>
                        Vote!
                    </button>
                ) : !props.already_voted ? (
                    <button className="vote_button" disabled>
                        Vote!
                    </button>
                ) : <div></div>}
            </div>
        </div>
    );
}

export default Poll;
