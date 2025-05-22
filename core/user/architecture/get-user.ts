import { UserApi } from "../domain/user-api";
import { User } from "../domain/user";
import { FavoriteApi } from "core/favorite/domain/favorite-api";
import { HttpException, HttpStatus } from "@nestjs/common";

export class GetUser {
    constructor(
        private userApi: UserApi,
        private favoriteApi: FavoriteApi
    ) { }

    async execute(username: string): Promise<User> {
        const favorite = await this.favoriteApi.getFavorite(username);
        const user = await this.userApi.getUser(username);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        user.isFavorite = favorite !== null;
        return user;
    }
}