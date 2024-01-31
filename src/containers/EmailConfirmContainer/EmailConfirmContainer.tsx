import React from 'react'
import {useNavigate, useSearchParams} from "react-router-dom";

// COMPONENTS, RESOURCES, CONSTANTS
import {useEmailConfirmMutation, useResendConfirmCodeMutation} from "../../services/auth.api";
import {URLS} from "../../constants/apiRouter";
import EmailConfirmPopup from "../../components/EmailConfirmPopup/EmailConfirmPopup";
import ConfirmCode from "../../components/ConfirmCode/ConfirmCode";

const EmailConfirmContainer = () => {
    const [confirmEmail, { status,isSuccess, error }] = useEmailConfirmMutation()
    const [resendConfirmCode] = useResendConfirmCodeMutation()

    const [openRegistrationPopup, setOpenRegistrationPopup] = React.useState(true);

    const navigation = useNavigate()
    const [searchParams] = useSearchParams();

    const closeRegistrationPopup = React.useCallback(() => {
        setOpenRegistrationPopup(false)
        navigation(URLS.Sign_In)
    }, [])

    const handleReSendLink = React.useCallback(() => {
        resendConfirmCode({
            email: searchParams.get('email') ?? ''
        })
        setTimeout(() => {
            navigation(URLS.Sign_In)
        }, 1000)
    }, [])

    React.useEffect(() => {
        if (isSuccess) {
            setOpenRegistrationPopup(true)

            setTimeout(() => {
                setOpenRegistrationPopup(false)
                navigation(URLS.Sign_In)
            }, 6000)
        }
    }, [isSuccess])

    React.useEffect(() => {
        confirmEmail({
            code: searchParams.get('code') ?? ''
        })
    }, [])

    return (
        <>
            {
                status === 'rejected'
                ? <ConfirmCode
                        handleReSendLink={handleReSendLink}
                    />
                : <EmailConfirmPopup
                        openRegistrationPopup={openRegistrationPopup}
                        closeRegistrationPopup={closeRegistrationPopup}
                    />
            }
        </>

    )
}

export default React.memo(EmailConfirmContainer)
