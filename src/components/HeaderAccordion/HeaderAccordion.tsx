import React from 'react';
import {Link} from "react-router-dom"

// COMPONENTS, RESOURCES, CONSTANTS
import {Button, Menu, MenuItem} from "@mui/material"
import {URLS} from "../../constants/apiRouter"
import './styles.scss'

type HeaderAccordionPropsType = {
    login: string
    handleLogout: () => void
    handleCloseMenu: () => void
    anchorMenuEl: any
    handleOpenMenu: (event: any) => void
    openMenu: boolean
}

const HeaderAccordion = (props: HeaderAccordionPropsType) => {
    const {
        login,
        handleLogout,
        handleOpenMenu,
        openMenu,
        handleCloseMenu,
        anchorMenuEl
    } = props

    return (
        <div>
            <Button
                style={{
                    color: '#000000',
                    textTransform: 'none',
                    // fontWeight: 'bold',
                    fontSize: '17px',
                    textDecoration: 'underline'
                }}
                id="basic-button"
                onClick={handleOpenMenu}
            >
                {login}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorMenuEl}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                style={{display: 'flex', justifyContent: 'center'}}
            >
                <MenuItem style={{padding: '10px 20px'}}>
                    <Link
                        to={URLS.Profile_settings}
                        style={{color: '#000000'}}
                        onClick={handleCloseMenu}
                    >
                        Profile settings
                    </Link>
                </MenuItem>
                <li style={{display: 'flex', justifyContent: 'center'}}>
                    <div className='header_accordion__logout_btn' onClick={handleLogout}>
                        Logout
                    </div>
                </li>
            </Menu>
        </div>
    );
};

export default React.memo(HeaderAccordion)