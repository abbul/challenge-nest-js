import { UserSummary } from "core/user/domain/user";

export interface FavoriteDTO extends UserSummary {
    username: string;
}

export class Favorite {
    constructor(
        public username: string,
        public avatarUrl: string,
        public login: string,
    ) {

    }

    public static fromDTO(dto: FavoriteDTO): Favorite {
        return new Favorite(dto.username, dto.avatar_url, dto.login);
    }

    public toDTO(): FavoriteDTO {
        return {
            avatar_url: this.avatarUrl,
            login: this.login,
            username: this.username,
        };
    }
}
