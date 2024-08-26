import React from 'react'

// COMPONENTS, RESOURCES, CONSTANTS
import {SignInForm} from "../../components";
import {useLoginUserMutation} from "../../services/auth.api";
import {useActions} from "../../hooks/useActions";
import {lsKeys} from "../../constants/constants";
import {jwtDecode} from "jwt-decode";
import {URLS} from "../../constants/apiRouter";
import {useNavigate} from "react-router-dom";
import {JwtPayloadType} from "../../types/general";

const SignInFormContainer = () => {
    const navigation = useNavigate()

    const [loginUser, { status, isSuccess, data: authResponse }] = useLoginUserMutation()
    const { loginUserAC, setOwnUserDataAC } = useActions()

    const [login, setLogin] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const [loginError, setLoginError] = React.useState<string>('')
    const [passwordError, setPasswordError] = React.useState<string>('')

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!login || login.length > 40) {
            setLoginError('Enter correct login')
        } else {
            setLoginError('')
        }

        if (!password || password.length > 40) {
            setPasswordError('Enter correct password')
        } else {
            setPasswordError('')
        }

        if (login && password && !loginError.length && !passwordError.length) {
            loginUser({
                loginOrEmail: login,
                password
            })
        }
    }

    React.useEffect(() => {
        if (isSuccess && authResponse) {
            try {
                const decodedToken = jwtDecode(authResponse.accessToken ?? '') as JwtPayloadType

                localStorage.setItem(lsKeys.AccessToken, authResponse.accessToken)
                loginUserAC({
                    authStatement: true
                })
                setOwnUserDataAC({
                    userId: decodedToken.sub,
                    login: decodedToken.login,
                    email: decodedToken.email,
                    deviceId: decodedToken.deviceId
                })
                navigation(URLS.Home_Route)
            } catch (e) {
                console.log('--------CAN NOT LOG IN----------')
            }
        }
    }, [isSuccess, authResponse])

    return (
        <SignInForm
            handleSubmit={handleSubmit}
            login={login}
            password={password}
            loginError={loginError}
            passwordError={passwordError}
            setLogin={setLogin}
            setPassword={setPassword}
            status={status}
        />
    )
}

export default React.memo(SignInFormContainer)
