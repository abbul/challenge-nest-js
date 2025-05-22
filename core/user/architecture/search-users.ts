import { UserApi } from "../domain/user-api";
import { User, UserRestrictDTO } from "../domain/user";

export interface BodySearchUsers {
    term: string;
    per_page?: number;
    page?: number;
}

export class SearchUsers {
    constructor(
        private userApi: UserApi
    ) { }

    async execute(body: BodySearchUsers): Promise<UserRestrictDTO[]> {
        const paramsFormatted = {
            per_page: Number(body.per_page || 30),
            page: Number(body.page || 1),
            q: body.term, 
        };
        if(paramsFormatted.per_page < 1 || paramsFormatted.page < 1){
            throw new Error('per_page and page must be greater than 0');
        }
        if(!paramsFormatted.q){
            throw new Error('term is required');
        }   
        const users = await this.userApi.searchUsers(paramsFormatted);
        return users.map((u: User) => u.toRestrictDTO());
    }
}