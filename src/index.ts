import './LoadEnv'; // Must be the first import
import app from '@server';
import initSockets from './sockets'
import logger from '@shared/Logger';
import http from 'http';
import socket from 'socket.io';

const server = new http.Server(app);
const io = socket(server);

initSockets(io)

// Start the server
const port = Number(process.env.PORT || 3000);
server.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
