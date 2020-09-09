import { User } from './User';

export class Track {

    public id: string;
    public addedBy: User;

    constructor(id: string, addedBy: User) {
        this.id = id
        this.addedBy = addedBy
    }
}

export default Track;
