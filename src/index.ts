import './LoadEnv'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import http from 'http';
import socket from 'socket.io';
import SocketManager from "./server/SocketManager"
import Controller from "./server/Controller"

const server = new http.Server(app);
const io = socket(server);

new Controller(new SocketManager(io))

// Start the server
const port = Number(process.env.PORT || 3000);

server.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
