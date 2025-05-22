import { FavoriteApi } from "../domain/favorite-api";
import { Favorite } from "../domain/favorite";
import { UserApi } from "core/user/domain/user-api";

export class CreateFavorite {
    constructor(
        private favoriteApi: FavoriteApi,
        private userApi: UserApi
    ) { }

    async execute(username: string): Promise<Favorite[]> {
        const user = await this.userApi.getUser(username);
        if(!user) {
            throw new Error('User not found');
        }
        const favorite = new Favorite(username, user.avatarUrl, user.login);
        await this.favoriteApi.createFavorite(favorite);
        return this.favoriteApi.getFavorites();
    }
}
