import React from 'react'
import {useNavigate} from "react-router-dom";

// COMPONENTS, RESOURCES, CONSTANTS
import {useUserRegistrationMutation} from "../../services/auth.api";
import {RegistrationFormPage} from "../../pages";
import * as EmailValidator from 'email-validator';
import {URLS} from "../../constants/apiRouter";

const RegistrationFormContainer = () => {
    const [
        userRegistration,
        { status, isSuccess,  error }]
        = useUserRegistrationMutation()

    const navigation = useNavigate()
    const [login, setLogin] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');

    const [loginError, setLoginError] = React.useState<string>('')
    const [emailError, setEmailError] = React.useState<string>('')
    const [passwordError, setPasswordError] = React.useState<string>('')
    const [confirmPasswordError, setConfirmPasswordError] = React.useState<string>('')
    const [serverError, setServerError] = React.useState<string>('')

    if (error && !serverError.length && 'status' in error){
        // @ts-ignore
        setServerError(error.data?.errorsMessages[0]?.message)
    }

    const [openRegistrationPopup, setOpenRegistrationPopup] = React.useState(false);

    const closeRegistrationPopup = React.useCallback(() => {
        setOpenRegistrationPopup(false)
        navigation(URLS.Sign_In)
    }, [])

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!login ) {
            setLoginError('Enter login')
        } else if (login.length < 3 || login.length > 10) {
            setLoginError('The number of characters must be from 3 to 10')
        } else {
            setLoginError('')
        }

        if (!email || email.length > 100) {
            setEmailError('Enter correct email')
        } else if (!EmailValidator.validate(email)) {
            setEmailError('It should be an email')
        } else {
            setEmailError('')
        }

        if (!password || password.length > 40) {
            setPasswordError('Enter correct password')
        } else if (password !== confirmPassword) {
            setPasswordError('Password does not match')
        } else if (password.length < 6 || password.length > 20) {
            setPasswordError('The number of characters must be from 6 to 20')
        } else {
            setPasswordError('')
        }

        if (!confirmPassword) {
            setConfirmPasswordError('Confirm password')
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Password does not match')
        } else {
            setConfirmPasswordError('')
        }

        if (login && password && email && !loginError.length && !passwordError.length && !emailError.length) {
            userRegistration({
                login,
                password,
                email
            })
        }
    }

    React.useEffect(() => {
        if (isSuccess) {
            setOpenRegistrationPopup(true)

            setTimeout(() => {
                setOpenRegistrationPopup(false)
                navigation(URLS.Sign_In)
            }, 10000)
        }
    }, [isSuccess])

    return (
        <RegistrationFormPage
            handleSubmit={handleSubmit}
            login={login}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            loginError={loginError}
            emailError={emailError}
            passwordError={passwordError}
            confirmPasswordError={confirmPasswordError}
            setLogin={setLogin}
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            status={status}
            openRegistrationPopup={openRegistrationPopup}
            closeRegistrationPopup={closeRegistrationPopup}
            serverError={serverError}
        />
    )
}

export default React.memo(RegistrationFormContainer)
