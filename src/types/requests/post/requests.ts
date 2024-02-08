import {likeStatus} from "../../../constants/constants";

export type LoginRequestResponse = {
    accessToken: string
}

export type LoginRequestPayload = {
    loginOrEmail: string,
    password: string,
}

export type RefreshTokenRequestResponse = {
    accessToken: string
}

export type UserRegistrationRequestPayload = {
    login: string,
    password: string,
    email: string,
}

export type EmailConfirmRequestPayload = {
    code: string,
}

export type ResendConfirmCodeRequestPayload = {
    email: string,
}

export type ChangePasswordRequestPayload = {
    recoveryCode: string,
    newPassword: string,
}

export type BlogCreateRequestPayload = {
    name: string;
    description: string;
    websiteUrl: string;
};

export type BlogUpdateRequestPayload = {
    id: string
    name: string;
    description: string;
    websiteUrl: string;
};

export type PostLikeRequestPayload = {
    id: string;
    likeStatus: likeStatus
};


export type CreatePostRequestPayload = {
    blogId: string
    title: string
    shortDescription: string
    content: string
};

export type UpdatePostRequestPayload = {
    blogId: string
    postId: string
    title: string
    shortDescription: string
    content: string
};

export type DeletePostRequestPayload = {
    blogId: string
    postId: string
};

export type CreateCommentRequestPayload = {
    postId: string
    content: string
};

export type UpdateCommentRequestPayload = {
    commentId: string
    content: string
};