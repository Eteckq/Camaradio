import SocketManager from './SocketManager'
import Playlist from '@entities/Playlist'
import User from '@entities/User'
import { Server, Socket } from 'socket.io'
import UserSocket from './UserSocket';
import QueueItem from '@entities/QueueItem';

export default class Controller {
    socketManager: SocketManager

    playlist = new Playlist()
    private _timer: number = Date.now()

    userSockets: UserSocket[] = []

    constructor(io: Server){
        this.socketManager = new SocketManager(io)
        this.socketManager.bindConnectionUserSocket(this.handleConnectionUserSocket)
    }

    handleConnectionUserSocket = (client:Socket) =>{
        const userSocket: UserSocket = new UserSocket(client);
        this.userSockets.push(userSocket)

        userSocket.bindOnHello(this.handleOnHello)
        userSocket.bindOnDisconnect(this.handleOnDisconnect)
        userSocket.bindOnAddTrack(this.handleOnTrack)
    }

    handleOnDisconnect = (userSocket: UserSocket, data: any) => {
        console.log(userSocket.user?.display_name + ' has disconnected');
    }

    handleOnHello = (userSocket: UserSocket, data: any) => {
        userSocket.setUser(data.user)

        userSocket.updateTrackList(this.playlist.getQueueItems())

        const queueItem = this.playlist.getCurrentQueueItem()
        if(queueItem !== undefined){
            userSocket.changeCurrentTrack(queueItem, this.getActualTrackTimestamp())
        }
    }

    handleOnTrack = (userSocket: UserSocket, data: any) => {
        if(userSocket.user === null){
            return;
        }

        this.playlist.addTrack(data.track, userSocket.user).then(() => {

            const queueItem = this.playlist.getCurrentQueueItem()
            const queueItems = this.playlist.getQueueItems()

            if(queueItem === undefined){
                this.nextTrack()
            }

            this.socketManager.broadcastUpdateTrackList(queueItems)
        }).catch( (error: string) => {
            console.log(error);
            userSocket.sendNotification()
        })
    }

    getActualTrackTimestamp() {
        return Date.now() - this._timer
    }

    nextTrack(){
        const queueItem = this.playlist.loadNextTrack()

        if(queueItem !== undefined){
            const duration = queueItem.track.duration_ms + 3000
            this._timer = Date.now()
            
            setTimeout(() => {
                this.nextTrack()
            }, 5000);

            this.socketManager.broadcastChangeCurrentTrack(queueItem, 0)
        } else {
            console.log("No new track to load");
        }
    }
}