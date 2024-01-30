import React from 'react'
import {NavLink, useLocation} from 'react-router-dom'

// COMPONENTS, RESOURCES, CONSTANTS
import './styles.scss'
import {ASIDE_ROUTES} from "../../routers/navigation";

const Sidebar = () => {
  const [hideSideBar, setHideSideBar] = React.useState<boolean>(false)
  const location  = useLocation()

  React.useEffect(() => {
      setHideSideBar(location.pathname.includes('start-forms'))
  }, [location.pathname])

  return (<nav className={`df-column-center navigation__container ${hideSideBar && 'hide'} `}>
    {ASIDE_ROUTES.map((el) => (
        el.permission.concat('').includes('ALL')
            ? (
                <NavLink key={el.id} to={el.url} className="navigation__element">
                  <span>{el.title}</span>
                  <div className="navigation__element_highlight"></div>
                </NavLink>
            )
            : ''
    ))}
  </nav>)
}

export default Sidebar
