import { User } from "../domain/user";
import { UserApi } from "../domain/user-api";   
import { SearchCommon } from "../../share/domain/search";

export class GetUsers {
    constructor(
        private userApi: UserApi
    ) { }

    async execute(params?: SearchCommon): Promise<User[]> {
        const paramsFormatted : SearchCommon = {
            per_page: params?.per_page || 30,
            page: params?.page || 1,
        };
        if(paramsFormatted.per_page < 1 || paramsFormatted.page < 1){
            throw new Error('per_page and page must be greater than 0');
        }
        return this.userApi.getUsers(paramsFormatted);
    }
}
