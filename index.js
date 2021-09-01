require('dotenv').config(); 

const App = require('./app');

const PORT = process.env.PORT;

const server = new App();

server.server.listen(PORT);


