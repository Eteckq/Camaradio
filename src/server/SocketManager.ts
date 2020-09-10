import socket, { Server, Socket } from 'socket.io';

import User from '@entities/User'
import Queue from '@entities/Queue'
import Playlist from '@entities/Playlist'

export default class SocketManager {

    io: Server

    // Controller
    playlist = new Playlist()
    users: User[] = []

    constructor(io: Server){
        this.io = io
    }

    init(){
        this.io.on('connection', (client: Socket) => {
            console.log('new client');
            let user: User;

            client.on('hello', data => {
                user = data.user
                this.users.push()

                client.emit('updateTrackList', this.playlist.getQueueItems())
            })

            client.on('addTrack', data => {
                this.playlist.addTrack(data.track, user).then(queueItem => {
                    this.io.emit('updateTrackList', this.playlist.getQueueItems())

                    setTimeout(() => {
                        this.io.emit('updateTrackList', this.playlist.getQueueItems())

                        this.io.emit('currentTrackChange', {
                            queueItem,
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
}