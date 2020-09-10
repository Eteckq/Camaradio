import socket, { Server, Socket } from 'socket.io';

import User from "@entities/User"
import Queue from '@entities/Queue'
import Playlist from '@entities/Playlist'

const playlist = new Playlist()
const users: User[] = []

export default function initSockets(io: Server){
    io.on('connection', (client: Socket) => {
        console.log('new client');
        let user: User;

        client.on('hello', data => {
            user = data.user
            users.push()

            client.emit('updateTrackList', playlist.getQueueItems())
        })

        client.on('addTrack', data => {
            playlist.addTrack(data.track, user).then(queueItem => {
                io.emit('updateTrackList', playlist.getQueueItems())

                setTimeout(() => {
                    io.emit('updateTrackList', playlist.getQueueItems())
                    
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