import React from 'react'
import {useNavigate} from "react-router-dom";

// COMPONENTS, RESOURCES, CONSTANTS
import {useSendRecoveryPasswordLinkMutation} from "../../services/auth.api";
import {URLS} from "../../constants/apiRouter";
import * as EmailValidator from "email-validator";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage/ForgotPasswordPage";

const ForgotPasswordContainer = () => {
    const [sendRecoveryLink, { isSuccess, status }] = useSendRecoveryPasswordLinkMutation()

    const [email, setEmail] = React.useState<string>('');
    const [emailError, setEmailError] = React.useState<string>('');

    const [openPopup, setOpenPopup] = React.useState<boolean>(false);

    const navigation = useNavigate()

    const closePopup = React.useCallback(() => {
        setOpenPopup(false)
        navigation(URLS.Sign_In)
    }, [])

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!email) {
            setEmailError('Enter an email')
        } else if (!EmailValidator.validate(email)) {
            setEmailError('It should be an email')
        } else {
            setEmailError('')
            sendRecoveryLink({email})
        }
    }

    React.useEffect(() => {
        if (isSuccess) {
            setOpenPopup(true)

            setTimeout(() => {
                setOpenPopup(false)
                navigation(URLS.Sign_In)
            }, 6000)
        }
    }, [isSuccess])

    return (
        <ForgotPasswordPage
            email={email}
            setEmail={setEmail}
            emailError={emailError}
            handleSubmit={handleSubmit}
            openPopup={openPopup}
            closePopup={closePopup}
            status={status}
        />
    )
}

export default React.memo(ForgotPasswordContainer)
