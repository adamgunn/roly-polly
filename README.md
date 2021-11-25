roly-polly
==

*Create and share polls in real time*

<img src="http://rolypolly.herokuapp.com/static/favicon.svg" alt="drawing" width="130"/>

**Built by Adam Gunn**

What's in this repo?
--

- `/src_dev` - the JSX React code that is written by me
- `/src` - the JS React code that is compiled from `/src_dev` by Babel, as well as my `index.css` stylesheet
- `/dist` - the `main.js` file created by webpack from `/src` as well as some other static files used by the app
- `server.js` - the Node.js/Express code for the backend
- `PollData.js` - defines the poll data object stored in the MongoDB database
- `index.html` - the HTML file displayed on the browser
- Various config files

What libraries are used?
--

- [React.js](https://reactjs.org), for the frontend, along with HTML and CSS
- [Node.js](https://nodejs.org/) and [Express](https://www.npmjs.com/package/express), for the backend
- [socket.io](https://www.npmjs.com/package/socket.io), for the real-time update functionality
- [mongoose](https://www.npmjs.com/package/mongoose), to connect to the MongoDB database
- [spotify-web-api-node](https://www.npmjs.com/package/spotify-web-api-node), to connect to the Spotify Web API
- [node-vibrant](https://www.npmjs.com/package/node-vibrant), to extract colors from the album covers
- [Mantine](https://www.npmjs.com/package/@mantine/core), for the color picker component
- [UUID](https://www.npmjs.com/package/uuid), to build the unique identifier for each poll
