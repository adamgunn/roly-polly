import './index.css';
import App from './App.js';
import Home from './Home.js';
import About from './About.js';
import Navbar from './Navbar.js';
import CreatePoll from './CreatePoll';
import NotFound from './NotFound';

ReactDOM.render(
    <React.StrictMode>
        <Navbar />
        {window.location.pathname == '/' ? (
            <Home />
        ) : window.location.pathname == '/about' ? (
            <About />
        ) : window.location.pathname == '/new-poll' ? (
            <CreatePoll />
        ) : window.location.pathname.slice(7).match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i) ? (
            <App />
        ) : <NotFound />}
    </React.StrictMode>,
    document.getElementById('root')
);
