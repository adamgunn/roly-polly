import './index.css';
import App from './App.js';
import Home from './Home.js';
import About from './About.js';
import Navbar from './Navbar.js';
import CreatePoll from './CreatePoll';
import NotFound from './NotFound';

const uuidRegex = new RegExp(
    /^\/polls\/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}\/?$/,
    'i'
);
const path = window.location.pathname;
ReactDOM.render(
    <React.StrictMode>
        <Navbar />
        {path == '/' || path == '/home' || path == '/home/' ? (
            <Home />
        ) : path == '/about' || path == '/about/' ? (
            <About />
        ) : path == '/new-poll' || path == '/new-poll/' ? (
            <CreatePoll />
        ) : uuidRegex.test(path) ? (
            <App />
        ) : (
            <NotFound />
        )}
    </React.StrictMode>,
    document.getElementById('root')
);
