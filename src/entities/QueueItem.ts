import Track from "@entities/Track"
import User from "@entities/User"

export default class QueueItem {

    public track: Track;
    public user: User;

    public haters: string[] = []

    constructor(track: Track, user: User) {
        this.track = track
        this.user = user
    }

    addHater(user: User){
        this.haters.push(user.id)
    }
}
