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
                email: decodedToken.email
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
            email: decodedToken.email
        })
    } catch (e) {
        console.log('----CAN NOT DECODE TOKEN-----')
    }
}