import React from 'react'

// COMPONENTS, RESOURCES, CONSTANTS
import {Header} from "../../components";
import {useLocation} from "react-router-dom";

const HeaderContainer = () => {
    const [showSignInLink, setShowSignInLink] = React.useState<boolean>(true)
    const location  = useLocation()

    // React.useEffect(() => {
    //     setShowSignInLink(location.pathname.includes('start-forms'))
    // }, [location.pathname])

    return (
        <Header
            showSignInLink={showSignInLink}
        />
    )
}

export default HeaderContainer
