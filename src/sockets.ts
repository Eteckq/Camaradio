import socket, { Server, Socket } from 'socket.io';

import User from "@entities/User"
import Queue from '@entities/Queue'

const queue = new Queue()
const users: User[] = []

export default function initSockets(io: Server){
    io.on('connection', (client: Socket) => {
        console.log('new client');
        let user: User;

        client.on('hello', data => {
            user = new User(data.id)
            users.push()

            client.emit('updateTrackList', queue.getTracks())
        })

        client.on('addTrack', data => {
            queue.addTrack(data.trackId, user.id).then(track => {
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