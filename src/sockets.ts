import socket, { Server, Socket } from 'socket.io';

import Queue from '@entities/Queue'

const queue = new Queue()

export default function initSockets(io: Server){
    io.on('connection', (client: Socket) => {
        console.log('new client');
        let userSpotifyId: string;

        client.on('hello', data => {
            userSpotifyId = data.id
            client.emit('updateTrackList', queue.getTracks())
        })

        client.on('addTrack', data => {
            queue.addTrack(data.trackId, userSpotifyId).then(track => {
                io.emit('updateTrackList', queue.getTracks())
            }).catch( error => {
                console.log(error);
                client.emit('notify', error)
            })
        })

        client.on('disconnect', () => {
            console.log('A user has disconnected from the socket!')
        });
    });
}