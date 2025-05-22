import { SearchCommon } from "core/share/domain/search";
import { User } from "./user";

export interface SearchUsersParams extends SearchCommon {
    q: string;
}

export interface UserApi {
    getUser(username: string): Promise<User | null>;
    getUsers(params?: SearchCommon): Promise<User[]>;
    searchUsers(params: SearchUsersParams): Promise<User[]>;
}