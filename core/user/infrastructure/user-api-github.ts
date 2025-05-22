import { UserApi } from "../domain/user-api";
import { User } from "../domain/user";
import axios from "axios";
import { SearchCommon } from "../../share/domain/search";
import { SearchUsersParams } from "../domain/user-api";
    
export class UserApiGithub implements UserApi {
    async getUsers(params: SearchCommon): Promise<User[]> {
        try{
            const response = (await axios.get("https://api.github.com/users", {params})).data
            return response.map((u: any)=>  User.fromDTO(u))
        }catch(error){
            throw error
        }
    }

    async searchUsers(params: SearchUsersParams): Promise<User[]> {
        try{
            const response = (await axios.get("https://api.github.com/search/users", {params: { q: params.q, per_page: params.per_page, page: params.page }})).data
            const users = response.items.map((u: any)=>  User.fromDTO(u))
            return users
        }catch(error){
            throw error
        }
    }

    async getUser(username: string): Promise<User | null> {
        try{
            const response = (await axios.get(`https://api.github.com/users/${username}`)).data
            return User.fromDTO(response)
        }catch(error){
            throw error
        }
    }
}