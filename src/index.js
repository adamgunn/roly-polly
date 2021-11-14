import './index.css';
import App from './App.js';
import Home from './Home.js';
import About from './About.js';
import Navbar from './Navbar.js';
import CreatePoll from './CreatePoll';
import SpotifyAPI from './SpotifyAPI';
import NotFound from './NotFound';

var uuidRegex = new RegExp(/^\/polls\/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}\/?$/, 'i');
var path = window.location.pathname;
ReactDOM.render(React.createElement(
    React.StrictMode,
    null,
    React.createElement(Navbar, null),
    path == '/' || path == '/home' || path == '/home/' ? React.createElement(Home, null) : path == '/about' || path == '/about/' ? React.createElement(About, null) : path == '/new-poll' || path == '/new-poll/' ? React.createElement(CreatePoll, null) : uuidRegex.test(path) ? React.createElement(App, null) : path == '/new-song-poll' || path == '/new-song-poll/' ? React.createElement(SpotifyAPI, null) : React.createElement(NotFound, null)
), document.getElementById('root'));