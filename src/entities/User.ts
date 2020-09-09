export interface IUser {
    access_token: string;
    refresh_token: string;
}

class User implements IUser {

    public access_token: string;
    public refresh_token: string;

    constructor(access_token: string, refresh_token: string) {
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    }
}

export default User;
