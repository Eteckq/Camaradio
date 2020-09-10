import socket, { Server, Socket } from 'socket.io';

import User from '@entities/User'
import Queue from '@entities/Queue'
import Playlist from '@entities/Playlist'
import App from './App'
import QueueItem from '@entities/QueueItem';

export default class SocketManager {

    io: Server
    app: App

    constructor(io: Server, app: App){
        this.io = io
        this.app = app

        this.io.on('connection', (client: Socket) => {
            console.log('new client');
            let user: User;

            client.on('hello', data => {
                user = data.user
                this.app.users.push()

                client.emit('updateTrackList', this.app.playlist.getQueueItems())

                if(this.app.playlist.getCurrentQueueItem() !== undefined){
                    client.emit('currentTrackChange', {
                        queueItem: this.app.playlist.getCurrentQueueItem(),
                        position_ms: this.app.playlist.getActualTrackTimestamp()
                    })
                }
            })

            client.on('addTrack', data => {
                this.app.playlist.addTrack(data.track, user).then(() => {
                    this.io.emit('updateTrackList', this.app.playlist.getQueueItems())

                    if(this.app.playlist.getCurrentQueueItem() !== undefined && this.app.playlist.getQueueItems().length === 0){
                        client.emit('currentTrackChange', {
                            queueItem: this.app.playlist.getCurrentQueueItem(),
                            position_ms: 0
                        })
                    }

                }).catch( (error: string) => {
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