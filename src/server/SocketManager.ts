import socket, { Server, Socket } from 'socket.io';

import User from '@entities/User'
import Queue from '@entities/Queue'
import Playlist from '@entities/Playlist'

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

        let queueItem = this.socketManager.app.playlist.getCurrentQueueItem()
        if(queueItem !== undefined){
            this.changeCurrentTrack(queueItem, this.socketManager.app.playlist.getActualTrackTimestamp())
        }
    }

    onAddTrack = (data: any) => {
        if(this.user === null){
            return;
        }

        this.socketManager.app.playlist.addTrack(data.track, this.user).then(() => {
            
            let queueItem = this.socketManager.app.playlist.getCurrentQueueItem()
            let queueItems = this.socketManager.app.playlist.getQueueItems()

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
<<<<<<< Updated upstream
=======
    userSockets: UserSocket[] = []
    app: App
>>>>>>> Stashed changes

    // Controller
    playlist = new Playlist()
    users: User[] = []

    constructor(io: Server){
        this.io = io
    }

    init(){
        this.io.on('connection', (client: Socket) => {
            let userSocket: UserSocket = new UserSocket(client, this);

<<<<<<< Updated upstream
            client.on('hello', data => {
                user = data.user
                this.users.push()
=======
            /* client.on('hello', data => {
                userSocket.setUser(data.user)
                this.userSockets.push(userSocket)

                client.emit('updateTrackList', this.app.playlist.getQueueItems())
>>>>>>> Stashed changes

                client.emit('updateTrackList', this.playlist.getQueueItems())
            })

            client.on('addTrack', data => {
<<<<<<< Updated upstream
                this.playlist.addTrack(data.track, user).then(queueItem => {
                    this.io.emit('updateTrackList', this.playlist.getQueueItems())
=======
                if(userSocket.user === null){
                    return;
                }
                this.app.playlist.addTrack(data.track, userSocket.user).then(() => {
                    this.io.emit('updateTrackList', this.app.playlist.getQueueItems())
>>>>>>> Stashed changes

                    setTimeout(() => {
                        this.io.emit('updateTrackList', this.playlist.getQueueItems())

                        this.io.emit('currentTrackChange', {
                            queueItem,
                            position_ms: 210
                        })
                    }, 2000);

                }).catch( error => {
                    console.log(error);
                    client.emit('notify', error)
                })


            }) */

            client.on('disconnect', () => {
                console.log('A user has disconnected from the socket!')
                // Remove from array
            });
        });
    }
}