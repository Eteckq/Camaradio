import socket, { Server, Socket } from 'socket.io';

import User from '@entities/User'
import Queue from '@entities/Queue'
import Playlist from '@entities/Playlist'
import QueueItem from '@entities/QueueItem'
import App from './App'
import UserSocket from './UserSocket';

// tslint:disable-next-line: max-classes-per-file
export default class SocketManager {

    io: Server

    constructor(io: Server){
        this.io = io
    }
    
    bindConnectionUserSocket(handler: any){
        this.io.on('connection', handler);
    }

    broadcastUpdateTrackList(queueItems: QueueItem[]){
        this.io.emit('updateTrackList', queueItems)
    }
}