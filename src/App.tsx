import React from 'react'
import './styles/app.scss'
import './styles/main.scss'
import Routing from './routers/Routing'
import HeaderContainer from "./containers/HeaderContainer/HeaderContainer";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => (
  <div className="App">
    <HeaderContainer />
    <Routing />
      <Sidebar/>
  </div>
)

export default App
