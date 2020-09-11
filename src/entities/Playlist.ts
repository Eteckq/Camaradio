import Track from '@entities/Track'
import User from '@entities/User'
import Queue from '@entities/Queue'
import QueueItem from '@entities/QueueItem'

export default class Playlist {

    public queue: Queue;
    public currentQueueItem: QueueItem | undefined = undefined;

    constructor() {
        this.queue = new Queue()
    }

    getQueueItems(): QueueItem[] {
        return this.queue.getQueueItems()
    }

    addTrack(track: Track, user: User){
        return this.queue.addTrack(track, user)/* .then(()=>{
            if(this.currentQueueItem === undefined){
                this.loadNextTrack()
            }
        }) */
    }

    loadNextTrack(){
        this.currentQueueItem = this.queue.queueItems.shift();
        return this.currentQueueItem
    }

    getCurrentQueueItem(){
        return this.currentQueueItem
    }

    removeQueueItem(queueItem: QueueItem){
        this.queue.queueItems = this.queue.queueItems.filter(item => {return item.track.id !== queueItem.track.id})
    }
}


