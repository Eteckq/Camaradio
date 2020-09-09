export interface IUser {
    accessToken: string;
    refreshToken: string;
}

class User implements IUser {

    public accessToken: string;
    public refreshToken: string;

    constructor(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}

export default User;
