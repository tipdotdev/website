interface UserModel {
    user_id: string;
    email: string;
    username: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    last_login: Date;
    name?: string;
    bio?: string;
    website?: string;
    socials?: SocialsModel[]; 
    pictures?: PicturesModel;
    email_verified: boolean;
    stripe?: object; // make an interface for stripe

    posts?: object[]; // make an interface for posts
    comments?: object[]; // make an interface for comments
    likes?: object[]; // make an interface for likes
    followers?: string[]; // just an array of user ids
    following?: string[]; // just an array of user ids
    subscriptions?: string[]; // just an array of user ids

    post_count?: number;
    comment_count?: number;
    like_count?: number;
    follower_count?: number;
    following_count?: number;
    subscription_count?: number;
    subscriber_count?: number;

    income_events?: object[]; // make an interface for income events
    supporters?: SupporterModel[];
}

interface PicturesModel {
    avatar: string;
    banner?: string;
}

interface SocialsModel {
    name: string;
    url: string;
}

interface SupporterModel {
    supporter_id: string;
    user_id: string;
    created_at: Date;
    updated_at: Date;
    type: string;
}

// export user interface
export type { UserModel }