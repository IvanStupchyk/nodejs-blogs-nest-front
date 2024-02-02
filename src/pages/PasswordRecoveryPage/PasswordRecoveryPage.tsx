import React, {Dispatch, SetStateAction} from 'react';

// COMPONENTS, RESOURCES, CONSTANTS
import './styles.scss'
import {Button, Container, TextField, Typography} from "@mui/material";
import spinner from "../../assets/loaders/spinner.svg";
import GeneralPopup from "../../components/GeneralPopup/GeneralPopup";

type PasswordRecoveryPagePropsType = {
    handleSubmit: (event: React.FormEvent) => void
    password: string
    confirmPassword: string
    passwordError: string
    confirmPasswordError: string
    setPassword: Dispatch<SetStateAction<string>>
    setConfirmPassword: Dispatch<SetStateAction<string>>
    status: string
    openPopup: boolean
    closePopup: () => void
}
const PasswordRecoveryPage = (props: PasswordRecoveryPagePropsType) => {
    const {
        handleSubmit,
        password,
        confirmPassword,
        passwordError,
        confirmPasswordError,
        setPassword,
        setConfirmPassword,
        status,
        openPopup,
        closePopup
    } = props

    return (
    <div className="df-center margin-top-40">
        <div className="sign_in_form__container">
            <GeneralPopup
                openPopup={openPopup}
                title={'New Password'}
                message={'Your new password has been saved successfully'}
                closePopup={closePopup}
            />
            <Container component="main" maxWidth="xs">
                <Typography
                    variant="h6"
                    style={{
                        marginBottom: '10px'
                    }}
                >
                    Create New Password
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Password"
                        type="password"
                        variant="standard"
                        fullWidth
                        style={{
                            marginBottom: '20px',
                            height: '50px'
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!passwordError}
                        helperText={passwordError}
                    />

                    <TextField
                        label="Password confirmation"
                        type="password"
                        variant="standard"
                        fullWidth
                        style={{
                            marginBottom: '20px',
                            height: '50px'
                        }}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!!confirmPasswordError}
                        helperText={confirmPasswordError}
                    />
                    <p className="forgot_password__email_label">
                        Your password must be between 6 and 20 characters
                    </p>

                    <div className='sign_in_form__login_warning_container'>
                        {
                            status === 'rejected' &&
                            <p className='sign_in_form__login_warning'>
                                Something went wrong
                            </p>
                        }
                        {
                            status === 'pending' &&
                            <img src={spinner} className='sign_in_form__spinner_container' alt='spinner icon'/>
                        }
                    </div>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={status === 'pending'}
                        fullWidth
                        style={{
                            backgroundColor: '#F8346B',
                            marginTop: '10px',
                        }}
                    >
                        Create new password
                    </Button>
                </form>
            </Container>
        </div>
    </div>
    )
}

export default React.memo(PasswordRecoveryPage);