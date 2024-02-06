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
