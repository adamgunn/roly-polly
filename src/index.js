import './index.css';
import App from './App.js';
import Home from './Home.js';
import About from './About.js';
import Navbar from './Navbar.js';
import CreatePoll from './CreatePoll';
import NotFound from './NotFound';

ReactDOM.render(React.createElement(
    React.StrictMode,
    null,
    React.createElement(Navbar, null),
    window.location.pathname == '/' ? React.createElement(Home, null) : window.location.pathname == '/about' ? React.createElement(About, null) : window.location.pathname == '/new-poll' ? React.createElement(CreatePoll, null) : window.location.pathname.slice(7).match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i) ? React.createElement(App, null) : React.createElement(NotFound, null)
), document.getElementById('root'));