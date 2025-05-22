
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

export interface UserSummary extends Pick<UserDTO, 'avatar_url' | 'login'> {}
export interface UserRestrictDTO extends Pick<UserDTO, 'avatar_url' | 'login'  | 'url'> {}

export class User {
    public name?: string;
    public bio?: string;
    public repos_url?: string;
    public public_repos?: number;
    public followers?: number;
    public following?: number;
    public created_at?: string;
    public is_favorite?: boolean;
    constructor(
        public avatarUrl: string,
        public login: string,
        public url: string,
    ) {}

    toDTO() {
        return {
            avatar_url: this.avatarUrl,
            login: this.login,
            url: this.url,
            name: this.name,
            bio: this.bio,
            repos_url: this.repos_url,
            public_repos: this.public_repos,
            followers: this.followers,
            following: this.following,
            created_at: this.created_at,
            is_favorite: this.is_favorite,
        };
    }

    toRestrictDTO() {
        return {
            avatar_url: this.avatarUrl,
            login: this.login,
            url: this.url,
        };
    }

    addMoreInfo(userMoreInfo: UserMoreInfo) {
        this.name = userMoreInfo.name;
        this.bio = userMoreInfo.bio;
        this.repos_url = userMoreInfo.repos_url;
        this.public_repos = userMoreInfo.public_repos;
        this.followers = userMoreInfo.followers;
        this.following = userMoreInfo.following;
        this.created_at = userMoreInfo.created_at;
        this.is_favorite = userMoreInfo.is_favorite;
    }

    static fromDTO(dto: UserDTO) {
        const user = new User(dto.avatar_url, dto.login, dto.url);
        user.addMoreInfo(dto);
        return user;
    }
}