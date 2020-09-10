import ISpotifyTrack from "@entities/interfaces/ISpotifyTrack"

export class Track {

    public data: ISpotifyTrack;

    constructor(data: ISpotifyTrack) {
        this.data = data
    }
}

export default Track;
