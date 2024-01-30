import React from 'react';
import './styles.scss'
import {URLS} from "../../constants/apiRouter";
import {Link} from "react-router-dom";
import {Button, Container, TextField, Typography} from "@mui/material";


const SignInForm = () => {
    const [login, setLogin] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const [loginError, setLoginError] = React.useState<string>('');
    const [passwordError, setPasswordError] = React.useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!login) {
            setLoginError('Enter login');
        } else {
            setLoginError('');
        }

        if (!password) {
            setPasswordError('Enter password');
        } else {
            setPasswordError('');
        }

        if (login && password) {
            console.log('data', { login, password });
        }
    };

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
                    <Link to={URLS.Sign_In} className='sign_in_form__forgot_link'>
                        Forgot Password
                    </Link>
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{
                        backgroundColor: '#F8346B',
                        marginTop: '40px',
                    }}
                >
                    Sign In
                </Button>
            </form>
        </Container>
        <div className='df-column-center margin-top-20'>
            <p className='sign_in_form__sign_up_label margin-btm-20'>Don't have an account?</p>
            <Link to={URLS.Sign_In} className='sign_in_form__sign_up_link'>
                Sign Up
            </Link>
        </div>
    </div>
    );
}

export default SignInForm;