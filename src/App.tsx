import React from 'react'

// COMPONENTS, RESOURCES, CONSTANTS
import './styles/app.scss'
import './styles/main.scss'
import Routing from './routers/Routing'
import HeaderContainer from "./containers/HeaderContainer/HeaderContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import {useRefreshTokenMutation} from "./services/auth.api";
import {useActions} from "./hooks/useActions";
import {authChecking, refreshTokenSetData} from "./utils/utils";

const App = () => {
    const [refreshTokens, { data: refreshTokenResponse }] = useRefreshTokenMutation()
    const { loginUserAC, setOwnUserDataAC } = useActions()

    React.useEffect(() => {
        authChecking(loginUserAC, setOwnUserDataAC, refreshTokens)
    }, [])

    React.useEffect(() => {
        if (refreshTokenResponse) {
            refreshTokenSetData(refreshTokenResponse, loginUserAC, setOwnUserDataAC)
        }
    }, [refreshTokenResponse])

    return <div className="App">
        <HeaderContainer/>
        <Routing/>
        <Sidebar/>
    </div>
}

export default App
