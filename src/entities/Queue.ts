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
      if(this.getQueueItemFromTrackId(track.id) !== null){
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

  getQueueItemFromTrackId(id: string): QueueItem | null{
    for (const queueItem of this.queueItems) {
      if(queueItem.track.id === id){
        return queueItem
      }
    }

    return null
  }
}
