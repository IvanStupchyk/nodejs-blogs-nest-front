import React, {Dispatch, SetStateAction} from 'react';

// COMPONENTS, RESOURCES, CONSTANTS
import './styles.scss'
import {URLS} from "../../constants/apiRouter";
import {Link} from "react-router-dom";
import {
    Button,
    Container,
    TextField,
    Typography
} from "@mui/material";
import spinner from "../../assets/loaders/spinner.svg";
import GeneralPopup from "../../components/GeneralPopup/GeneralPopup";

type RegistrationFormPageProps = {
    handleSubmit: (event: React.FormEvent) => void
    login: string
    email: string
    password: string
    confirmPassword: string
    passwordError: string
    confirmPasswordError: string
    emailError: string
    loginError: string
    serverError: string | undefined
    setLogin: Dispatch<SetStateAction<string>>
    setEmail: Dispatch<SetStateAction<string>>
    setPassword: Dispatch<SetStateAction<string>>
    setConfirmPassword: Dispatch<SetStateAction<string>>
    status: string
    openRegistrationPopup: boolean
    closeRegistrationPopup: () => void
}
const RegistrationFormPage = (props: RegistrationFormPageProps) => {
    const {
        handleSubmit,
        login,
        email,
        password,
        confirmPassword,
        loginError,
        emailError,
        passwordError,
        confirmPasswordError,
        setLogin,
        setEmail,
        setPassword,
        setConfirmPassword,
        status,
        openRegistrationPopup,
        closeRegistrationPopup,
        serverError
    } = props

    return (
        <div className="registration_form__container_global width-all df-center">
            <GeneralPopup
                openPopup={openRegistrationPopup}
                title={'Email sent'}
                message={`We have sent a link to confirm your email to ${email}`}
                closePopup={closeRegistrationPopup}
            />
            <div className={`registration_form__container ${status === 'pending' && 'hide_style'}`}>
                <Container component="main" maxWidth="xs">
                    <Typography
                        variant="h6"
                        style={{
                            marginBottom: '10px'
                        }}
                    >
                        Registration
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Login"
                            variant="standard"
                            fullWidth
                            style={{
                                marginBottom: '20px',
                                height: '50px'
                            }}
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            error={!!loginError}
                            helperText={loginError}
                        />
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
                            label="Confirm password"
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

                        <div className='sign_in_form__login_warning_container'>
                            {
                                status === 'rejected' &&
                                <p className='sign_in_form__login_warning'>
                                    {serverError}
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
                            Sign Up
                        </Button>
                    </form>
                </Container>
                <div className='df-column-center margin-top-30'>
                    <p className='sign_in_form__sign_up_label margin-btm-15'>Remembered about your existing account?</p>
                    <Link to={URLS.Sign_In} className='sign_in_form__sign_up_link'>
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default React.memo(RegistrationFormPage)