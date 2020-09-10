import Track from '@entities/Track';
import User from '@entities/User';
import QueueItem from "@entities/QueueItem"

import ISpotifyTrack from "@entities/interfaces/ISpotifyTrack"
import ISpotifyUser from "@entities/interfaces/ISpotifyUser"

export default class Queue {
  queueItems: QueueItem[];

  constructor() {
    this.queueItems = [];
  }

  addTrack(spotifyTrack: ISpotifyTrack, user: User) {
    return new Promise((resolve, reject) => {
      if(this.trackExist(spotifyTrack)){
        reject('This track is already in queue')
      } else {
        const track: Track = new Track(spotifyTrack)
        const queueItem = new QueueItem(track, user)
        this.queueItems.push(queueItem);
        resolve(queueItem)
      }
    })
  }

  getQueueItems() {
    return this.queueItems;
  }

  private trackExist(trackChecked: ISpotifyTrack): boolean{
    return this.queueItems.some(item => item.track.data.id === trackChecked.id)

  }
}
