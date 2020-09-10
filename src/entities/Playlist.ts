import Track from "@entities/Track"
import User from "@entities/User"
import Queue from "@entities/Queue"
import QueueItem from "@entities/QueueItem"

export default class Playlist {

    public queue: Queue;

    constructor() {
        this.queue = new Queue()
    }

    getQueueItems(){
        return this.queue.getQueueItems()
    }

    addTrack(track: Track, user: User){
        return this.queue.addTrack(track, user)
    }
}
