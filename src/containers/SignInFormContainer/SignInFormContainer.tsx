import React from 'react'

// COMPONENTS, RESOURCES, CONSTANTS
import {SignInForm} from "../../components";
import {useLoginUserMutation} from "../../services/auth.api";
import {useActions} from "../../hooks/useActions";

const SignInFormContainer = () => {
    const [loginUser, { status,isSuccess, error, data: authResponse }] = useLoginUserMutation()
    const { loginUserAC } = useActions()
    console.log('status', status)
    console.log('error', error)
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
            localStorage.setItem('accessToken', authResponse.accessToken)
            loginUserAC({
                authStatement: true
            })
        }
    }, [isSuccess])

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
