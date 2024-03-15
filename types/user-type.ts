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
    pictures: {
        avatar: string;
        banner: string;
    };
    socials?: any | null;
    stripe?: any | null;
    oauth?: any | null;
};

export type { UserType };
