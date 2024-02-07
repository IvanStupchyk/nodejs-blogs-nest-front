import React from 'react'
import { Routes, Route } from 'react-router-dom'

// COMPONENTS, RESOURCES, CONSTANTS
import { ALL_ROUTES } from './common'
import {useAppSelector} from "../store/storeToolkit";

const Routing = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)

  const allLegalRoutes = ALL_ROUTES
      .filter((rt) => rt.isAuth ? rt.isAuth === isAuth : true)

  return (
    <Routes>
      {allLegalRoutes.map((rt) => (
        <Route key={rt.id} path={rt.path} element={<rt.component />} />
      ))}
    </Routes>
  )
}

export default Routing
