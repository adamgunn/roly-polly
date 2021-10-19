import './index.css';
import App from './App.js';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Redirect,
// } from "react-router-dom";
// import { v4 as uuidV4 } from "uuid";

ReactDOM.render(
    <React.StrictMode>
        {/* <Router>
            <Switch>
                <Route path="/" exact>
                    <Redirect to={`/polls/${uuidV4()}`}></Redirect>
                </Route>
                <Route path="/polls/:id"> */}
                    <App />
                {/* </Route>
            </Switch>
        </Router> */}
    </React.StrictMode>,
    document.getElementById('root')
);