import SocketManager from './SocketManager'
import Playlist from '@entities/Playlist'
import User from '@entities/User'
import { Server } from 'socket.io'

export default class Controller {
    socketManager: SocketManager

    playlist = new Playlist()
    users: User[] = []

    constructor(io: Server){
        this.socketManager = new SocketManager(io, this)
    }

    
}