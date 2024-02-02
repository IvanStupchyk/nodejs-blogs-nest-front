import React, {Dispatch, SetStateAction} from 'react';
import {Link} from "react-router-dom";

// COMPONENTS, RESOURCES, CONSTANTS
import {URLS} from "../../constants/apiRouter";
import './styles.scss'
import {Button, Container, TextField, Typography} from "@mui/material";
import spinner from "../../assets/loaders/spinner.svg";
import GeneralPopup from "../../components/GeneralPopup/GeneralPopup";

type ForgotPasswordPagePropsType = {
    handleSubmit: (event: React.FormEvent) => void
    email: string
    emailError: string
    setEmail: Dispatch<SetStateAction<string>>
    openPopup: boolean
    closePopup: () => void
    status: string
}
const ForgotPasswordPage = (props: ForgotPasswordPagePropsType) => {
    const {
        handleSubmit,
        email,
        setEmail,
        emailError,
        openPopup,
        closePopup,
        status
    } = props

    return (
        <div className="df-center margin-top-40">
            <GeneralPopup
                openPopup={openPopup}
                title={'Email sent'}
                message={`We have sent a link to recover your password to ${email}`}
                closePopup={closePopup}
            />
            <div className={`sign_in_form__container forgot_password__container ${status === 'pending' && 'hide_style'}`}>
                <Container component="main" maxWidth="xs">
                    <Typography
                        variant="h6"
                        style={{
                            marginBottom: '10px'
                        }}
                    >
                        Forgot Password
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            variant="standard"
                            fullWidth
                            style={{
                                marginBottom: '20px',
                                height: '50px'
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!emailError}
                            helperText={emailError}
                        />
                        <p className="forgot_password__email_label margin-btm-10">
                            Enter your email address and we will send you further instructions
                        </p>
                        <div className='sign_in_form__login_warning_container'>
                            {
                                status === 'pending' &&
                                <img src={spinner} className='sign_in_form__spinner_container' alt='spinner icon'/>
                            }
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{
                                backgroundColor: '#F8346B',
                                marginTop: '10px',
                            }}
                        >
                            Send instruction
                        </Button>

                        <div className='df-column-center margin-top-30'>
                            <Link to={URLS.Sign_In}
                                  className='forgot_password__sign_in_link sign_in_form__sign_up_link'>
                                Back to Sign In
                            </Link>
                        </div>
                    </form>
                </Container>
            </div>
        </div>
    )
}

export default React.memo(ForgotPasswordPage);