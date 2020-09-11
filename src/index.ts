import './LoadEnv'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import http from 'http';
import socket from 'socket.io';
import App from "./server/App"

const server = new http.Server(app);
const io = socket(server);

new App(io)

// Start the server
const port = Number(process.env.PORT || 3000);

server.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
