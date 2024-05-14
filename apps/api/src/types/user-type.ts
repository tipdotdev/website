type UserType = {
    user_id: string;
    username?: string | null;
    email: string;
    created_at: number;
    updated_at: number;
    last_login: number;
    name?: string | null;
    website?: string | null;
    bio?: string | null;
    page: any;
    pictures:
        | {
              avatar: string;
              banner: string;
          }
        | unknown;
    socials?: any | null;
    stripe?: any | null;
    oauth_github?: string | null;
    oauth_google?: string | null;
};

export type { UserType };
