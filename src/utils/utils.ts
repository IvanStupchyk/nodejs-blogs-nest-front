import {lsKeys} from "../constants/constants";
import {jwtDecode} from "jwt-decode";
import {JwtPayloadType} from "../types/general";
import {RefreshTokenRequestResponse} from "../types/requests/post/requests";

export const authChecking = (loginUserAC: any, setOwnUserDataAC: any, refreshTokens: any) => {
    const accessToken = localStorage.getItem(lsKeys.AccessToken)

    try {
        const decodedToken = jwtDecode(accessToken ?? '') as JwtPayloadType
        const currentDate = new Date().getTime() / 1000

        if (decodedToken.exp && decodedToken.sub && currentDate < decodedToken.exp) {
            console.log('auth true')
            loginUserAC({
                authStatement: true,
            })

            setOwnUserDataAC({
                userId: decodedToken.sub,
                login: decodedToken.login,
                email: decodedToken.email,
                deviceId: decodedToken.deviceId
            })
        }

        if (decodedToken.exp && currentDate > decodedToken.exp) {
            console.log('refreshTokens')
            refreshTokens()
        }
    } catch (e) {
        console.log('--------INVALID ACCESS TOKEN----------')
    }
}

export const refreshTokenSetData = (data: RefreshTokenRequestResponse, loginUserAC: any, setOwnUserDataAC: any) => {
    try {
        const decodedToken = jwtDecode(data.accessToken ?? '') as JwtPayloadType

        localStorage.setItem(lsKeys.AccessToken, data.accessToken ?? '')
        loginUserAC({
            authStatement: true
        })
        setOwnUserDataAC({
            userId: decodedToken.sub,
            login: decodedToken.login,
            email: decodedToken.email,
            deviceId: decodedToken.deviceId
        })
    } catch (e) {
        console.log('----CAN NOT DECODE TOKEN-----')
    }
}

export const dateFormat = (lastVisit: string | Date, isPostDate?: boolean) => {
    const date = new Date(lastVisit)

    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()

    if (isPostDate) {
        return `${day}/${month}/${year} at ${hours}:${minutes}:${seconds}`
    }

    return `${hours}:${minutes} ${day}.${month}.${year}`
}
