import React from 'react'
import {useNavigate, useSearchParams} from "react-router-dom";

// COMPONENTS, RESOURCES, CONSTANTS
import {useChangePasswordMutation,} from "../../services/auth.api";
import {URLS} from "../../constants/apiRouter";
import PasswordRecoveryPage from "../../pages/PasswordRecoveryPage/PasswordRecoveryPage";

const PasswordRecoveryContainer = () => {
    const [changePassword, { status, isSuccess }] = useChangePasswordMutation()

    const [password, setPassword] = React.useState<string>('');
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');

    const [passwordError, setPasswordError] = React.useState<string>('')
    const [confirmPasswordError, setConfirmPasswordError] = React.useState<string>('')

    const [openPopup, setOpenPopup] = React.useState<boolean>(false);

    const navigation = useNavigate()
    const [searchParams] = useSearchParams();

    const closePopup = React.useCallback(() => {
        setOpenPopup(false)
        navigation(URLS.Sign_In)
    }, [])

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        let isError = false

        if (!password || password.length > 40) {
            setPasswordError('Enter correct password')
            isError = true
        } else if (password !== confirmPassword) {
            setPasswordError('Password does not match')
            isError = true
        } else if (password.length < 6 || password.length > 20) {
            setPasswordError('The number of characters must be from 6 to 20')
        } else {
            setPasswordError('')
        }

        if (!confirmPassword) {
            setConfirmPasswordError('Confirm password')
            isError = true
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Password does not match')
            isError = true
        } else {
            setConfirmPasswordError('')
        }

        console.log('isError', isError)
        if (password && !isError) {
            changePassword({
                newPassword: password,
                recoveryCode: searchParams.get('recoveryCode') ?? ''
            })
        }
    }

    React.useEffect(() => {
        if (isSuccess) {
            setOpenPopup(true)

            setTimeout(() => {
                setOpenPopup(false)
                navigation(URLS.Sign_In)
            }, 4000)
        }
    }, [isSuccess])


    return (
        <PasswordRecoveryPage
            password={password}
            confirmPassword={confirmPassword}
            passwordError={passwordError}
            confirmPasswordError={confirmPasswordError}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            status={status}
            handleSubmit={handleSubmit}
            openPopup={openPopup}
            closePopup={closePopup}
        />
    )
}

export default React.memo(PasswordRecoveryContainer)
