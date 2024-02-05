export type JwtPayloadType = {
    sub: string
    login: string
    email: string
    deviceId: string
    iat: number
    exp: number
}