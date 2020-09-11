import socket, { Server, Socket } from 'socket.io';

import User from '@entities/User'
import Queue from '@entities/Queue'
import Playlist from '@entities/Playlist'
import QueueItem from '@entities/QueueItem'
import App from './App'

class UserSocket {

    client: Socket
    user: User | null = null

    socketManager: SocketManager

    constructor(client: Socket, socketManager: SocketManager){
        this.client = client
        this.socketManager = socketManager

        client.on('hello', this.onHello)
        client.on('addTrack', this.onAddTrack)
    }

    setUser(user: User){
        this.user = user
    }

    // SOCKET

    // On

    onHello = (data: any) => {
        this.setUser(data.user)
        this.socketManager.userSockets.push(this)

        this.updateTrackList(this.socketManager.app.playlist.getQueueItems())

        const queueItem = this.socketManager.app.playlist.getCurrentQueueItem()
        if(queueItem !== undefined){
            this.changeCurrentTrack(queueItem, this.socketManager.app.playlist.getActualTrackTimestamp())
        }
    }

    onAddTrack = (data: any) => {
        if(this.user === null){
            return;
        }

        this.socketManager.app.playlist.addTrack(data.track, this.user).then(() => {

            const queueItem = this.socketManager.app.playlist.getCurrentQueueItem()
            const queueItems = this.socketManager.app.playlist.getQueueItems()

            this.socketManager.io.emit('updateTrackList', queueItems)
            if(queueItem !== undefined && queueItems.length === 0){
                this.changeCurrentTrack(queueItem, this.socketManager.app.playlist.getActualTrackTimestamp())
            }

        }).catch( (error: string) => {
            console.log(error);
            this.sendNotification()
        })
    }



    // Emit

    // this.app.playlist.getQueueItems()
    updateTrackList(queueItems: QueueItem[]){
        this.client.emit('updateTrackList', queueItems)
    }

    changeCurrentTrack(queueItem: QueueItem, position_ms: number){
        this.client.emit('currentTrackChange', {
            queueItem,
            position_ms
        })
    }

    // TODO
    sendNotification(){

    }
}

// tslint:disable-next-line: max-classes-per-file
export default class SocketManager {

    io: Server
    userSockets: UserSocket[] = []
    app: App

    constructor(io: Server, app: App){
        this.io = io
        this.app = app

        this.io.on('connection', (client: Socket) => {
            const userSocket: UserSocket = new UserSocket(client, this);

            client.on('disconnect', () => {
                console.log('A user has disconnected from the socket!')
                // Remove from array
            });
        });
    }
}