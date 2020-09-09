import { IUser } from './User';

export interface ITrack {
    id: string;
    addedBy: IUser
}

class Track implements ITrack {

    public id: string;
    public addedBy: IUser;

    constructor(id: string, addedBy: IUser) {
        this.id = id
        this.addedBy = addedBy
    }
}

export default User;
