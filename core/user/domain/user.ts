import { PaginationThroughLinks } from "core/share/domain/search";

export interface UserMoreInfo {
    name?: string;
    bio?: string;
    repos_url?: string;
    public_repos?: number;
    followers?: number;
    following?: number;
    created_at?: string;
    is_favorite?: boolean;
}

export interface UserDTO extends UserMoreInfo {
    avatar_url: string;
    login: string;
    url: string;
}

export type ResponseGetUsers = {
    links: PaginationThroughLinks[];
    users: UserRestrictDTO[];
};

export interface UserSummary extends Pick<UserDTO, 'avatar_url' | 'login'> {}
export interface UserRestrictDTO extends Pick<UserDTO, 'avatar_url' | 'login'  | 'url'> {}

export class User {
    public name?: string;
    public bio?: string;
    public reposUrl?: string;
    public publicRepos?: number;
    public followers?: number;
    public following?: number;
    public createdAt?: string;
    public isFavorite?: boolean;
    constructor(
        public avatarUrl: string,
        public login: string,
        public url: string,
    ) {}

    toDTO(): UserDTO {
        return {
            avatar_url: this.avatarUrl,
            login: this.login,
            url: this.url,
            name: this.name,
            bio: this.bio,
            repos_url: this.reposUrl,
            public_repos: this.publicRepos,
            followers: this.followers,
            following: this.following,
            created_at: this.createdAt,
            is_favorite: this.isFavorite,
        };
    }

    toRestrictDTO(): UserRestrictDTO {
        return {
            avatar_url: this.avatarUrl,
            login: this.login,
            url: this.url,
        };
    }

    addMoreInfo(userMoreInfo: UserMoreInfo): void {
        this.name = userMoreInfo.name;
        this.bio = userMoreInfo.bio;
        this.reposUrl = userMoreInfo.repos_url;
        this.publicRepos = userMoreInfo.public_repos;
        this.followers = userMoreInfo.followers;
        this.following = userMoreInfo.following;
        this.createdAt = userMoreInfo.created_at;
        this.isFavorite = userMoreInfo.is_favorite;
    }

    static fromDTO(dto: UserDTO): User {
        const user = new User(dto.avatar_url, dto.login, dto.url);
        user.addMoreInfo(dto);
        return user;
    }
}