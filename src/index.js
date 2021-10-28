import './index.css';
import App from './App.js';
import Home from './Home.js';

ReactDOM.render(React.createElement(
    React.StrictMode,
    null,
    window.location.pathname == "/" ? React.createElement(Home, null) : React.createElement(App, null)
), document.getElementById('root'));