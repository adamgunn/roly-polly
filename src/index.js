import './index.css';
import App from './App.js';
import Home from './Home.js';
import About from './About.js';
import Navbar from './Navbar.js';

ReactDOM.render(React.createElement(
    React.StrictMode,
    null,
    React.createElement(Navbar, null),
    window.location.pathname == '/' ? React.createElement(Home, null) : window.location.pathname == '/about' ? React.createElement(About, null) : React.createElement(App, null)
), document.getElementById('root'));