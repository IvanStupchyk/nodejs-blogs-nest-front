import {likeStatus, SubscriptionStatus} from "../constants/constants";

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

type PostLikeUserInfoType = {
    addedAt: string;
    userId: string;
    login: string;
};

type ExtendedLikesInfoViewType = {
    likesCount: number;
    dislikesCount: number;
    myStatus: likeStatus;
    newestLikes: Array<PostLikeUserInfoType>;
};

export type PostImageViewType = {
    main: ImageType[] | null;
};

export type PostViewType = {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    createdAt: Date;
    blogId: string;
    blogName: string;
    images: PostImageViewType;
    extendedLikesInfo: ExtendedLikesInfoViewType;
}

export type PostsType = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: Array<PostViewType>;
};



export type CommentatorInfoType = {
    userId: string;
    userLogin: string;
};

export type CommentLikesViewType = {
    likesCount: number;
    dislikesCount: number;
    myStatus: likeStatus;
};

export type CommentViewType = {
    id: string;
    content: string;
    commentatorInfo: CommentatorInfoType;
    likesInfo: CommentLikesViewType;
    createdAt: Date;
};

export type CommentsViewType = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: Array<CommentViewType>;
};





