import SocketManager from "./SocketManager";
import Playlist from "@entities/Playlist";
import User from "@entities/User";
import { Server, Socket } from "socket.io";
import UserSocket from "./UserSocket";
import QueueItem from "@entities/QueueItem";

export default class Controller {
  socketManager: SocketManager;

  playlist = new Playlist();
  private _timer: number = Date.now();

  private _timeout: any = null;

  userSockets: UserSocket[] = [];

  constructor(io: Server) {
    this.socketManager = new SocketManager(io);
    this.socketManager.bindConnectionUserSocket(
      this.handleConnectionUserSocket
    );
  }

  handleConnectionUserSocket = (client: Socket) => {
    const userSocket: UserSocket = new UserSocket(client);
    this.userSockets.push(userSocket);

    userSocket.bindOnHello(this.handleOnHello);
    userSocket.bindOnDisconnect(this.handleOnDisconnect);
    userSocket.bindOnAddTrack(this.handleOnTrack);
    userSocket.bindOnHateTrack(this.handleOnHateTrack);
    userSocket.bindOnSkipTrack(this.handleOnSkipTrack);
  };

  handleOnDisconnect = (disconnectedUserSocket: UserSocket, data: any) => {
    console.log(
      disconnectedUserSocket.user?.display_name + " has disconnected"
    );

    const userSocketIndx = this.userSockets.findIndex(
      (userSocket) => userSocket === disconnectedUserSocket
    );
    this.userSockets.splice(userSocketIndx, 1);

    this.socketManager.broadcastUpdateConnectedUsersList(
      this.userSockets.map((userSocket) => userSocket.user)
    );
  };

  handleOnHello = (userSocket: UserSocket, data: any) => {
    userSocket.setUser(data.user);

    userSocket.updateTrackList(this.playlist.getQueueItems());

    this.socketManager.broadcastUpdateConnectedUsersList(
      this.userSockets.map((userSocket) => userSocket.user)
    );

    const queueItem = this.playlist.getCurrentQueueItem();
    if (queueItem !== undefined) {
      userSocket.changeCurrentTrack(queueItem, this.getActualTrackTimestamp());
    }
  };

  handleOnTrack = (userSocket: UserSocket, data: any) => {
    if (userSocket.user === null) {
      return;
    }

    this.playlist
      .addTrack(data.track, userSocket.user)
      .then(() => {
        const queueItem = this.playlist.getCurrentQueueItem();
        const queueItems = this.playlist.getQueueItems();

        if (queueItem === undefined) {
          this.nextTrack();
        }

        this.broadcastUpdateTrackList();
      })
      .catch((error: string) => {
        console.log(error);
        userSocket.sendNotification();
      });
  };

  handleOnHateTrack = (userSocket: UserSocket, data: any) => {
    const queueItem = this.playlist.queue.getQueueItemFromTrackId(data.trackId);

    if (queueItem !== null && userSocket.user !== null && !queueItem?.haters.some(haterId => haterId === userSocket.user?.id)) {
      queueItem.addHater(userSocket.user);
      this.broadcastUserHateTrack(queueItem.track.id);

      if(this.checkIfEnoughHaters(queueItem)){
          //Remove from playlist
          this.playlist.removeQueueItem(queueItem)
      }

      
      this.broadcastUpdateTrackList();
    }
  };

  handleOnSkipTrack = (userSocket: UserSocket, data: any) => {
    const queueItem = this.playlist.currentQueueItem;

    if (queueItem !== undefined && userSocket.user !== null) {
      queueItem.addHater(userSocket.user);
      this.broadcastUserSkipTrack();

        if(this.checkIfEnoughHaters(queueItem)){
            //Skip track
            this.nextTrack()
        }

        
      this.broadcastUpdateTrackList();
    }
  };

  getActualTrackTimestamp() {
    return Date.now() - this._timer;
  }

  nextTrack() {
    const queueItem = this.playlist.loadNextTrack();

    if (queueItem !== undefined) {
      const duration = queueItem.track.duration_ms;
      this._timer = Date.now();

      this.broadcastChangeCurrentTrack();

      clearTimeout(this._timeout);

      this._timeout = setTimeout(() => {
        this.nextTrack();
      }, duration);
    } else {
      console.log("No new track to load");
    }

    this.broadcastUpdateTrackList();
  }

  broadcastUserHateTrack(trackId: string) {
    this.socketManager.broadcastUserHateTrack(trackId);
  }

  broadcastUserSkipTrack() {
    this.socketManager.broadcastUserSkipTrack();
  }

  broadcastUpdateTrackList() {
    const queueItems = this.playlist.queue.getQueueItems();
    if (queueItems) this.socketManager.broadcastUpdateTrackList(queueItems);
  }

  broadcastChangeCurrentTrack() {
    const queueItem = this.playlist.getCurrentQueueItem();
    if (queueItem)
      this.socketManager.broadcastChangeCurrentTrack(
        queueItem,
        this.getActualTrackTimestamp()
      );
  }

  checkIfEnoughHaters(queueItem: QueueItem){
    let totalUsers = this.userSockets.length
    let haters = queueItem.haters.length
    
    return haters >= totalUsers/2
  }
}
