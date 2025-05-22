import { FavoriteApi } from "../domain/favorite-api";
import { Favorite } from "../domain/favorite";

/**
 * Se implemento el patron singleton para interactuar con el mismo array de favoritos.
 */
export class FavoriteApiMemory implements FavoriteApi {
    private static instance: FavoriteApiMemory;
    private favorites: Favorite[] = [];

    private constructor() { }

    public static getInstance(): FavoriteApiMemory {
        if (!FavoriteApiMemory.instance) {
            FavoriteApiMemory.instance = new FavoriteApiMemory();
        }
        return FavoriteApiMemory.instance;
    }

    async createFavorite(favorite: Favorite): Promise<void> {
        this.favorites.push(favorite);
    }

    async getFavorites(): Promise<Favorite[]> {
        return this.favorites;
    }

    async getFavorite(username: string): Promise<Favorite | null> {
        const favorite = this.favorites.find(favorite => favorite.username === username);
        return favorite || null;
    }
}
