import socket, { Server, Socket } from 'socket.io';

import Queue from '@entities/Queue'

const queue = new Queue()

export default function initSockets(io: Server){
    io.on('connection', (client: Socket) => {
        console.log('new client');

        client.on('hello', data => {
            console.log('hello', data);

        })

        client.on('addTrack', data => {
            queue.addTrack(data.trackId, data.userId)
        })

        client.on('disconnect', () => {
            console.log('A user has disconnected from the socket!')
        });
    });
}