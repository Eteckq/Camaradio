import './LoadEnv'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import http from 'http';
import socket from 'socket.io';
import initSockets from './sockets'
import SocketManager from "./server/SocketManager"

const server = new http.Server(app);
const io = socket(server);

initSockets(io)

// let socketManager = new SocketManager(io)

// Start the server
const port = Number(process.env.PORT || 3000);
server.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
