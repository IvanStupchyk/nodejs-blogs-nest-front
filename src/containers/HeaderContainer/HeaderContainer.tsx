import React from 'react'
import {useNavigate} from "react-router-dom";

// COMPONENTS, RESOURCES, CONSTANTS
import {Header} from "../../components";
import {useAppSelector} from "../../store/storeToolkit";
import {useLogoutMutation} from "../../services/auth.api";
import {useActions} from "../../hooks/useActions";
import {lsKeys} from "../../constants/constants";
import {URLS} from "../../constants/apiRouter";

const HeaderContainer = () => {
    const isAuth = useAppSelector((state) => state.auth.isAuth)
    const login = useAppSelector((state) => state.auth.login)

    const [logout, { isSuccess }] = useLogoutMutation()
    const { logoutUserAC } = useActions()

    const navigation = useNavigate()

    const [anchorMenuEl, setAnchorMenuEl] = React.useState(null)
    const openMenu = Boolean(anchorMenuEl)

    const handleOpenMenu = React.useCallback((event: any) => {
        setAnchorMenuEl(event.currentTarget)
    }, [])

    const handleCloseMenu = React.useCallback(() => {
        setAnchorMenuEl(null)
    }, [])

    const handleLogout = React.useCallback(() => {
        if (isAuth) {
            logout()
            navigation(URLS.Sign_In)
            handleCloseMenu()
        }
    }, [isAuth])

    React.useEffect(() => {
        if (isSuccess) {
            logoutUserAC()
            localStorage.removeItem(lsKeys.AccessToken)
        }
    }, [isSuccess])

    return (
        <Header
            login={login}
            isAuth={isAuth}
            handleLogout={handleLogout}
            openMenu={openMenu}
            handleCloseMenu={handleCloseMenu}
            handleOpenMenu={handleOpenMenu}
            anchorMenuEl={anchorMenuEl}
        />
    )
}

export default React.memo(HeaderContainer)
