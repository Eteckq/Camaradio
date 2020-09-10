import ISpotifyUser from "@entities/interfaces/ISpotifyUser"

export class User {

    public data: ISpotifyUser;

    constructor(data: ISpotifyUser) {
        this.data = data
    }
}

export default User;
