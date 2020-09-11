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

    private _timeout: any = null

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
        userSocket.bindOnHateTrack(this.handleOnHateTrack)
        userSocket.bindOnSkipTrack(this.handleOnSkipTrack)
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

            this.broadcastUpdateTrackList()
        }).catch( (error: string) => {
            console.log(error);
            userSocket.sendNotification()
        })
    }

    handleOnHateTrack = (userSocket: UserSocket, data: any) => {
        let queueItem = this.playlist.queue.getQueueItemFromTrackId(data.trackId)
        
        

        if(queueItem !== null && userSocket.user !== null){
            queueItem.addHater(userSocket.user)
            this.broadcastUpdateTrackList()
            this.broadcastUserHateTrack(queueItem.track.id)
        }
    }

    handleOnSkipTrack = (userSocket: UserSocket, data: any) => {
        let queueItem = this.playlist.currentQueueItem

        if(queueItem !== undefined && userSocket.user !== null){
            queueItem.addHater(userSocket.user)
            this.broadcastUpdateTrackList()
            this.broadcastUserSkipTrack()
        }
        
    }

    getActualTrackTimestamp() {
        return Date.now() - this._timer
    }

    nextTrack(){
        const queueItem = this.playlist.loadNextTrack()

        if(queueItem !== undefined){
            //Add 2 sec to track duration to be sure track is finish for everyone
            const duration = queueItem.track.duration_ms + 2000
            this._timer = Date.now()

            this.broadcastChangeCurrentTrack()

            clearTimeout(this._timeout)

            this._timeout = setTimeout(() => {
                this.nextTrack()
            }, duration);

        } else {
            console.log('No new track to load');
        }

        this.broadcastUpdateTrackList()
    }

    broadcastUserHateTrack(trackId: string){
        this.socketManager.broadcastUserHateTrack(trackId)
    }

    broadcastUserSkipTrack(){
        this.socketManager.broadcastUserSkipTrack()
    }

    broadcastUpdateTrackList(){
        const queueItems = this.playlist.queue.getQueueItems()
        if(queueItems)
            this.socketManager.broadcastUpdateTrackList(queueItems)
    }

    broadcastChangeCurrentTrack(){
        const queueItem = this.playlist.getCurrentQueueItem()
        if(queueItem)
            this.socketManager.broadcastChangeCurrentTrack(queueItem, this.getActualTrackTimestamp())
    }
}