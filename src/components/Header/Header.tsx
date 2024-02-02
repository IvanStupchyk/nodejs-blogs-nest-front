import React from 'react';
import './styles.scss'
import signInIcon from "../../assets/icons/sign-in.svg";
import {URLS} from "../../constants/apiRouter";
import {Link} from "react-router-dom";

type HeaderType = {
    isAuth: boolean
    handleLogout: () => void
}
function Header(props: HeaderType) {
    return (
        <div className="header__container df-between">
            <h1>Blogger Platform</h1>
            {
                props.isAuth
                    ? <div style={{cursor: 'pointer'}} onClick={props.handleLogout}>Log out</div>
                    : <Link to={URLS.Sign_In} className='df-center'>
                        <img src={signInIcon} className='header__sign-in-icon' alt='sign in icon'/>
                        <span className='header__sign-in-link'>Sign In</span>
                    </Link>
            }
        </div>
    );
}

export default Header;