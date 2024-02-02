import React, {Dispatch, SetStateAction} from 'react';
import {Link} from "react-router-dom";

// COMPONENTS, RESOURCES, CONSTANTS
import {URLS} from "../../constants/apiRouter";
import './styles.scss'
import {Button, Container, TextField, Typography} from "@mui/material";
import spinner from "../../assets/loaders/spinner.svg";

type SignInFormProps = {
    handleSubmit: (event: React.FormEvent) => void
    login: string
    password: string
    passwordError: string
    loginError: string
    setLogin: Dispatch<SetStateAction<string>>
    setPassword: Dispatch<SetStateAction<string>>
    status: string
}
const SignInForm = (props: SignInFormProps) => {
    const {
        handleSubmit,
        login,
        password,
        loginError,
        passwordError,
        setLogin,
        setPassword,
        status
    } = props

    return (
    <div className="sign_in_form__container">
        <Container component="main" maxWidth="xs">
            <Typography
                variant="h6"
                style={{
                    marginBottom: '10px'
                }}
            >
                Sign In
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email or Username"
                    variant="standard"
                    fullWidth
                    style={{
                        marginBottom: '30px',
                        height: '50px'
                    }}
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    error={!!loginError}
                    helperText={loginError}
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
                <div className='sign_in_form__forgot_link_container'>
                    <Link to={URLS.Forgot_password} className='sign_in_form__forgot_link'>
                        Forgot Password
                    </Link>
                </div>

                <div className='sign_in_form__login_warning_container'>
                    {
                        status === 'rejected' &&
                        <p className='sign_in_form__login_warning'>
                            Wrong login or password
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
                    Sign In
                </Button>
            </form>
        </Container>
        <div className='df-column-center margin-top-20'>
            <p className='sign_in_form__sign_up_label margin-btm-20'>Don't have an account?</p>
            <Link to={URLS.Registration} className='sign_in_form__sign_up_link'>
                Sign Up
            </Link>
        </div>
    </div>
    );
}

export default React.memo(SignInForm);