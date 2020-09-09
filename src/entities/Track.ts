export class Track {

    public trackId: string;
    public userId: string;

    constructor(trackId: string, userId: string) {
        this.trackId = trackId
        this.userId = userId
    }
}

export default Track;
