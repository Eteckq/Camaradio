import Track from '@entities/Track';
import User from '@entities/User';
import QueueItem from "@entities/QueueItem"

export default class Queue {
  queueItems: QueueItem[];

  constructor() {
    this.queueItems = [];
  }

  addTrack(track: Track, user: User):Promise<QueueItem> {
    return new Promise((resolve, reject) => {
      if(this.trackExist(track)){
        reject('This track is already in queue')
      } else {
        const queueItem = new QueueItem(track, user)
        this.queueItems.push(queueItem);
        resolve(queueItem)
      }
    })
  }

  getQueueItems() {
    return this.queueItems;
  }

  private trackExist(trackChecked: Track): boolean{
    return this.queueItems.some(item => item.track.id === trackChecked.id)

  }
}
