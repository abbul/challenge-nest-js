import { ResponseGetUsers, User } from "../domain/user";
import { UserApi } from "../domain/user-api";   
import { SearchCommon } from "../../share/domain/search";

export class GetUsers {
    constructor(
        private userApi: UserApi
    ) { }

    async execute(params?: SearchCommon): Promise<ResponseGetUsers> {
        const paramsFormatted : SearchCommon = {
            per_page: Number(params?.per_page || 30),
            page: Number(params?.page || 1),
        };
        if(paramsFormatted.per_page < 1 || paramsFormatted.page < 1){
            throw new Error('per_page and page must be greater than 0');
        }
        const users = (await this.userApi.getUsers(paramsFormatted)).map((u: User) => u.toRestrictDTO());
        return {
            links: [
                {
                    href: `http://localhost:3000/users?page=${paramsFormatted.page + 1}&per_page=${paramsFormatted.per_page}`,
                    rel: 'next',
                },
                {
                    href: `http://localhost:3000/users?page=${paramsFormatted.page - 1}&per_page=${paramsFormatted.per_page}`,
                    rel: 'prev',
                },
                {
                    href: `http://localhost:3000/users?page=1&per_page=${paramsFormatted.per_page}`,
                    rel: 'first',
                },
                {
                    href: `http://localhost:3000/users?page=${paramsFormatted.page}&per_page=${paramsFormatted.per_page}`,
                    rel: 'self',
                },
            ],  
            users
        }
    }
}
