import { FavoriteApi } from "../domain/favorite-api";
import { Favorite } from "../domain/favorite";

export class GetFavorites {
    constructor(
        private favoriteApi: FavoriteApi
    ) { }

    async execute(): Promise<Favorite[]> {
        return this.favoriteApi.getFavorites();
    }
}