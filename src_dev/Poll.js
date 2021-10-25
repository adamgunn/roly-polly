import { useState } from "react";


function Poll(props) {
    
    const [colors, setColors] = useState(["darkred", "gold", "darkgreen", "royalblue"]);
    const [title, setTitle] = useState(props.title);

    const handleClick = (e) => {
        props.onVote(e.target.getAttribute("index"));
    }
 
    var bars = [];
    var buttons = [];
    for (var i = 0; i < props.counts.length; i++) {
        bars.push(
            <div className="bar_graph_bar_wrapper">
                <div style={{ backgroundColor: colors[i % colors.length],
                                width: ((props.counts[i] === 0) ? 0.5 : props.counts[i] / props.num_votes * 100).toString() + "%" }}
                    className="bar_graph_bar"
                    key={i}>
                </div>
                <div className="bar_graph_text">
                    <div className="choice_letter">{String.fromCharCode(97 + i).toUpperCase()}</div>
                    <div className="vote_count">
                    {((props.num_votes === 0) ? "0.0" : (props.counts[i] / props.num_votes * 100).toFixed(1).toString()) + "% (" + 
                        (props.counts[i]).toString() + ((props.counts[i] === 1) ? " vote)" :" votes)")}
                    </div>
                </div>
            </div>
        );
        buttons.push(
            props.connected_to_server ?
            <button className="poll_button" index={i} onClick={handleClick} key={i}
                    style={{ backgroundColor: colors[i % colors.length]}}>
                {String.fromCharCode(97 + i).toUpperCase()}
            </button> :
            <button className="poll_button_disabled" index={i} onClick={handleClick} key={i}>
                {String.fromCharCode(97 + i).toUpperCase()}
            </button>
        );
    }
    return (
        <div className="poll_wrapper">
            <div className="bar_graph_wrapper">
                <h1 className="poll_title">{title}</h1>
                {bars}
            </div>
            <div className="poll_buttons_wrapper">
                {buttons}
            </div>
        </div>
    );
}

export default Poll; 