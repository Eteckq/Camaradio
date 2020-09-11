import socket, { Server, Socket } from 'socket.io';

import User from '@entities/User'
import Queue from '@entities/Queue'
import Playlist from '@entities/Playlist'
import QueueItem from '@entities/QueueItem'
import App from './App'

export default class UserSocket {

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