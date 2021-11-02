import { useState } from 'react';
import blackOrWhite from './blackOrWhite.js'

function Poll(props) {
    const colors = props.colors;

    const handleClick = function (e) {
        props.onVote(e.target.getAttribute('index'));
    };

    var bars = [];
    var buttons = [];
    for (var i = 0; i < props.counts.length; i++) {
        bars.push(
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
                    <div className="choice_text">
                        {String.fromCharCode(97 + i).toUpperCase() +
                            ' - ' +
                            props.options[i]}
                    </div>
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
        );
        buttons.push(
            props.connected_to_server ? (
                <button
                    className="poll_button"
                    index={i}
                    onClick={handleClick}
                    key={i}
                    style={{ backgroundColor: colors[i % colors.length] }}
                >
                    <span
                        className="poll_button_text"
                        index={i}
                        key={i}
                        style={{
                            color: blackOrWhite(colors[i % colors.length]),
                        }}
                    >
                        {String.fromCharCode(97 + i).toUpperCase()}
                    </span>
                </button>
            ) : (
                <button className="poll_button" index={i} key={i} disabled>
                    {String.fromCharCode(97 + i).toUpperCase()}
                </button>
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
            <div className="poll_buttons_wrapper">{buttons}</div>
        </div>
    );
}

export default Poll;
