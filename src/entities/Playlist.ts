import Track from '@entities/Track'
import User from '@entities/User'
import Queue from '@entities/Queue'
import QueueItem from '@entities/QueueItem'

export default class Playlist {

    public queue: Queue;
    public currentQueueItem: QueueItem | undefined = undefined;

    private _timer: number = Date.now()

    constructor() {
        this.queue = new Queue()
    }

    getQueueItems(): QueueItem[] {
        return this.queue.getQueueItems()
    }

    addTrack(track: Track, user: User){
        return this.queue.addTrack(track, user).then(() => {
            if(this.currentQueueItem === undefined){
                this.nextTrack()
            }
        })

    }

    getActualTrackTimestamp() {
        return Date.now() - this._timer
    }

    nextTrack(){
        this.currentQueueItem = this.queue.queueItems.shift();

        if(this.currentQueueItem !== undefined){
            const duration = this.currentQueueItem.track.duration_ms + 3000

            // Prepare next track when current will be finished

            this._timer = Date.now()
            setTimeout(() => {
                this.nextTrack()
            }, duration);
        }
    }

    getCurrentQueueItem(){
        return this.currentQueueItem
    }
}


