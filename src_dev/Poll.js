import React from "react";

class Poll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: ["darkred", "gold", "darkgreen", "royalblue"],
            title: "Which is the best letter?",
            counts: [0, 0, 0, 0],
            num_votes: 0
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        var counts_state = this.state.counts;
        counts_state[e.target.getAttribute("index")]++;
        this.setState({counts: counts_state});
        var num_votes_state = this.state.num_votes;
        num_votes_state++;
        this.setState({num_votes: num_votes_state});

    }


    render() {
        var bars = [];
        var buttons = [];
        for (var i = 0; i < this.state.counts.length; i++) {
            bars.push(
                <div className="bar_graph_bar_wrapper">
                    <div style={{ backgroundColor: this.state.colors[i % this.state.colors.length],
                                  width: ((this.state.counts[i] === 0) ? 0.5 : this.state.counts[i] / this.state.num_votes * 100).toString() + "%" }}
                        className="bar_graph_bar"
                        key={i}>
                    </div>
                    <div className="bar_graph_text">
                        <div className="choice_letter">{String.fromCharCode(97 + i).toUpperCase()}</div>
                        <div className="vote_count">
                        {((this.state.num_votes === 0) ? "0.0" : 
                         (this.state.counts[i] / this.state.num_votes * 100).toFixed(1).toString()) + "% (" + 
                         (this.state.counts[i]).toString() + ((this.state.counts[i] === 1) ? " vote)" :" votes)")}
                        </div>
                    </div>
                </div>
            );
            buttons.push(
              <button className="poll_button" index={i} onClick={this.handleClick} key={i}
                      style={{ backgroundColor: this.state.colors[i % this.state.colors.length]}}>
                  {String.fromCharCode(97 + i).toUpperCase()}
              </button>  
            );
        }
        return (
            <div className="poll_wrapper">
                <div className="bar_graph_wrapper">
                    <h1 className="poll_title">{this.state.title}</h1>
                    {bars}
                </div>
                <div className="poll_buttons_wrapper">
                    {buttons}
                </div>
            </div>
        );
    }
}

export default Poll; 