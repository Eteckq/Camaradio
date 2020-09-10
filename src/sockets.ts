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
            user = data.user
            users.push()

            client.emit('updateTrackList', queue.getQueueItems())
        })

        client.on('addTrack', data => {
            queue.addTrack(data.track, user).then(queueItem => {
                io.emit('updateTrackList', queue.getQueueItems())

                setTimeout(() => {
                    io.emit('updateTrackList', queue.getQueueItems())
                    
                    io.emit('currentTrackChange', {
                        queueItem: queueItem,
                        position_ms: 210
                    })
                }, 2000);

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