import SocketManager from './SocketManager'
import Playlist from '@entities/Playlist'
import User from '@entities/User'

export default class Controller {
    socketManager: SocketManager

    playlist = new Playlist()
    users: User[] = []

    constructor(socketManager: SocketManager){
        this.socketManager = socketManager
    }

    
}