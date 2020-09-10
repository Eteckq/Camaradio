import socket, { Server, Socket } from 'socket.io';

import User from '@entities/User'
import Queue from '@entities/Queue'
import Playlist from '@entities/Playlist'

export default class SocketManager {

    io: Server

    

    constructor(io: Server){
        this.io = io

        this.io.on('connection', (client: Socket) => {
            console.log('new client');
            let user: User;

            client.on('hello', data => {
                user = data.user
                this.users.push()

                client.emit('updateTrackList', this.playlist.getQueueItems())

                if(this.playlist.getCurrentQueueItem() !== undefined){
                
                    client.emit('currentTrackChange', {
                        queueItem: this.playlist.getCurrentQueueItem(),
                        position_ms: this.playlist.getActualTrackTimestamp()
                    })
                }
            })

            client.on('addTrack', data => {
                this.playlist.addTrack(data.track, user).then(queueItem => {
                    this.io.emit('updateTrackList', this.playlist.getQueueItems())

                    if(this.playlist.getCurrentQueueItem() !== undefined && this.playlist.getQueueItems().length === 0){
                        client.emit('currentTrackChange', {
                            queueItem: this.playlist.getCurrentQueueItem(),
                            position_ms: 0
                        })
                    }

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