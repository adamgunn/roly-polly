import './index.css';
import App from './App.js';
import Home from './Home.js';
import About from './About.js';
import Navbar from './Navbar.js';

ReactDOM.render(
    <React.StrictMode>
        <Navbar />
        {window.location.pathname == '/' ? (
            <Home />
        ) : window.location.pathname == '/about' ? (
            <About />
        ) : (
            <App />
        )}
    </React.StrictMode>,
    document.getElementById('root')
);
