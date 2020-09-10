import Track from "@entities/Track"
import User from "@entities/User"
import Queue from "@entities/Queue"
import QueueItem from "@entities/QueueItem"

export default class Playlist {

    public queue: Queue;

    constructor() {
        this.queue = new Queue()
    }
}
