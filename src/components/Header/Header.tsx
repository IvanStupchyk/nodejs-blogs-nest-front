import React from 'react';
import {Link} from "react-router-dom";

// COMPONENTS, RESOURCES, CONSTANTS
import signInIcon from "../../assets/icons/sign-in.svg";
import {URLS} from "../../constants/apiRouter";
import HeaderAccordion from "../HeaderAccordion/HeaderAccordion";
import './styles.scss'

type HeaderPropsType = {
    isAuth: boolean,
    openMenu: boolean,
    login: string
    handleLogout: () => void
    handleCloseMenu: () => void
    anchorMenuEl: any
    handleOpenMenu: (event: any) => void
}
function Header(props: HeaderPropsType) {
    return (
        <div className="header__container df-between">
            <h1>Blogger Platform</h1>
                {
                    props.isAuth
                        ? <HeaderAccordion
                                login={props.login}
                                handleLogout={props.handleLogout}
                                handleOpenMenu={props.handleOpenMenu}
                                openMenu={props.openMenu}
                                handleCloseMenu={props.handleCloseMenu}
                                anchorMenuEl={props.anchorMenuEl}
                             />
                            : <Link to={URLS.Sign_In} className='df-center'>
                            <img src={signInIcon} className='header__sign-in-icon' alt='sign in icon'/>
                            <span className='header__sign-in-link'>Sign In</span>
                        </Link>
                }
        </div>
    );
}

export default React.memo(Header)