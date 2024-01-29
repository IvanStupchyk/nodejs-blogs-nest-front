import React from 'react'
import { NavLink } from 'react-router-dom'

// COMPONENTS, RESOURCES, CONSTANTS
import './styles.scss'
import {ASIDE_ROUTES} from "../../routers/navigation";

const Sidebar = () => (
  <nav className="df-column-center navigation__container">
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
  </nav>
)

export default Sidebar
