import socket, { Server, Socket } from 'socket.io';

export default function initSockets(io: Server){
    io.on('connection', (client: Socket) => {
        console.log("new client");
        
        client.on('hello', data => {
            console.log('hello', data);

        })

        client.on('disconnect', () => {
            console.log('A user has disconnected from the socket!')
        });
    });
}