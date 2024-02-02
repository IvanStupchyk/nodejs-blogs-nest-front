import React from 'react'

// COMPONENTS, RESOURCES, CONSTANTS
import {Header} from "../../components";
import {useAppSelector} from "../../store/storeToolkit";
import {useLogoutMutation} from "../../services/auth.api";
import {useActions} from "../../hooks/useActions";
import {lsKeys} from "../../constants/constants";

const HeaderContainer = () => {
    const isAuth = useAppSelector((state) => state.auth.isAuth)
    const [logout, { isSuccess }] = useLogoutMutation()
    const { logoutUserAC } = useActions()


    const handleLogout = React.useCallback(() => {
        if (isAuth) {
            logout()
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
            isAuth={isAuth}
            handleLogout={handleLogout}
        />
    )
}

export default HeaderContainer
