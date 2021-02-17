import React from 'react'
import { Switch, Route } from "react-router-dom"
import EditorPage from './components/pages/editor/EditorPage'
import HomePage from './components/pages/home/HomePage'
import ProfilePage from 'components/pages/profile/ProfilePage'
import 'antd/dist/antd.css'
import './App.css'

function App() {
  return (
    <Switch>
      <Route path='/' component={HomePage} exact />
      <Route path='/editor' component={EditorPage} />
      <Route path='/profile' component={ProfilePage} />
    </Switch>
  )
}

export default App;
  