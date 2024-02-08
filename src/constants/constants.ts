export enum lsKeys {
    AccessToken = 'accessToken',
}

export enum SubscriptionStatus {
    None = 'None',
    Subscribed = 'Subscribed',
    Unsubscribed = 'Unsubscribed',
}

export const websiteUrlRegex = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/

export enum likeStatus {
    None = 'None',
    Like = 'Like',
    Dislike = 'Dislike',
}