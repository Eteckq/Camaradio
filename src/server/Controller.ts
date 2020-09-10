import SocketManager from './SocketManager'

export default class Controller {
    socketManager: SocketManager

    constructor(socketManager: SocketManager){
        this.socketManager = socketManager
    }
}