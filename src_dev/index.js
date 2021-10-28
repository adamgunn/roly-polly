import './index.css';
import App from './App.js';
import Home from './Home.js';

ReactDOM.render(
    <React.StrictMode>
        {window.location.pathname == "/" ? 
        <Home /> :
        <App />}
    </React.StrictMode>,
    document.getElementById('root')
);