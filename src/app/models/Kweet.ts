import {User} from "../models/User";

export class Kweet {
    constructor(public id: number,
                public text: string,
                public date: Date,
                public poster: User){}
}