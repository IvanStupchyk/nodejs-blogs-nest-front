import React from 'react';
import './styles.scss'
import signInIcon from "../../assets/icons/sign-in.svg";
function Header(props: any) {
    return (
        <div className="header__container df-between">
            <h1>Blogger Platform</h1>
            <a href={''} className='df-center'>
                <img src={signInIcon} className='header__sign-in-icon' alt='sign in icon'/>
                <span className='header__sign-in-link'>Sign In</span>
            </a>
        </div>
    );
}

export default Header;