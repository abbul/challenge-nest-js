import { UserApi } from "../domain/user-api";
import { User } from "../domain/user";
import { SearchCommon } from "../../share/domain/search";

export class SearchUsers {
    constructor(
        private userApi: UserApi
    ) { }

    async execute(params?: SearchCommon): Promise<User[]> {
        const paramsFormatted = {
            per_page: params?.per_page || 30,
            page: params?.page || 1,
            q: params?.q || '', 
        };
        return this.userApi.searchUsers(paramsFormatted);
    }
}