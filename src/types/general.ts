import {SubscriptionStatus} from "../constants/constants";

export type JwtPayloadType = {
    sub: string
    login: string
    email: string
    deviceId: string
    iat: number
    exp: number
}

type BanInfoType = {
    isBanned: boolean;
    banDate: Date | null;
};

export type ImageType = {
    url: string;
    width: number;
    height: number;
    fileSize: number;
};

export type BlogImagesViewType = {
    wallpaper: ImageType | null;
    main: ImageType[] | null;
};

export type BlogType = {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: Date;
    isMembership: boolean;
    images: BlogImagesViewType;
    subscribersCount: number;
    currentUserSubscriptionStatus: keyof typeof SubscriptionStatus;
};

export type BlogsViewType = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: Array<BlogType>;
};

type UserViewType = {
    userId: string | null;
    userLogin: string | null;
};

type BlogViewSAType = {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: Date;
    isMembership: boolean;
    banInfo: BanInfoType;
    blogOwnerInfo: UserViewType;
};

export type BlogsViewSAType = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: Array<BlogViewSAType>;
};
