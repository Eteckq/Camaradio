import Track from '@entities/Track'

export default class Queue {
    queue: Track[]

    constructor(){
        this.queue = []
    }

    addTrack(trackId: string, userId: string){
        this.queue.push(new Track(trackId, userId))
    }

    getTracksId(){
        return this.queue.map(track => track.trackId)
    }

}
