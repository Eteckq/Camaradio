import socket, { Server, Socket } from 'socket.io';

import User from '@entities/User'
import Queue from '@entities/Queue'
import Playlist from '@entities/Playlist'
import QueueItem from '@entities/QueueItem'
import App from './App'

class UserSocket {

    client: Socket
    user: User | null = null

    constructor(client: Socket){
        this.client = client
    }

    setUser(user: User){
        this.user = user
    }

    // SOCKET

    // On

    bindOnHello(handler: any){
        this.client.on('hello', data => {
            handler(this, data)
        })
    }

    bindOnDisconnect(handler: any){
        this.client.on('disconnect', data => {
            handler(this, data)
        })
    }

    bindOnAddTrack(handler: any){
        this.client.on('addTrack', data => {
            handler(this, data)
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
    app: App

    userSockets: UserSocket[] = []

    constructor(io: Server, app: App){
        this.io = io
        this.app = app

        this.io.on('connection', (client: Socket) => {
            const userSocket: UserSocket = new UserSocket(client);

            userSocket.bindOnHello(this.handleOnHello)
            userSocket.bindOnDisconnect(this.handleOnDisconnect)
            userSocket.bindOnAddTrack(this.handleOnTrack)
        });
    }

    handleOnDisconnect = (userSocket: UserSocket, data: any) => {
        console.log(userSocket.user?.display_name + ' has disconnected');
    }

    handleOnHello = (userSocket: UserSocket, data: any) => {
        userSocket.setUser(data.user)

        this.userSockets.push(userSocket)

        userSocket.updateTrackList(this.app.playlist.getQueueItems())

        const queueItem = this.app.playlist.getCurrentQueueItem()
        if(queueItem !== undefined){
            userSocket.changeCurrentTrack(queueItem, this.app.playlist.getActualTrackTimestamp())
        }
    }

    handleOnTrack = (userSocket: UserSocket, data: any) => {
        if(userSocket.user === null){
            return;
        }

        this.app.playlist.addTrack(data.track, userSocket.user).then(() => {

            const queueItem = this.app.playlist.getCurrentQueueItem()
            const queueItems = this.app.playlist.getQueueItems()

            this.io.emit('updateTrackList', queueItems)
            if(queueItem !== undefined && queueItems.length === 0){
                userSocket.changeCurrentTrack(queueItem, this.app.playlist.getActualTrackTimestamp())
            }
        }).catch( (error: string) => {
            console.log(error);
            userSocket.sendNotification()
        })
    }
}