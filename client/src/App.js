import React from 'react'
import EditorPage from './components/pages/editor/EditorPage'
import { Switch, Route } from "react-router-dom"
import 'antd/dist/antd.css'
import './App.css'
import HomePage from './components/pages/home/HomePage'

function App() {
  return (
    <Switch>
      <Route path='/' component={HomePage} exact />
      <Route path='/editor' component={EditorPage} />
    </Switch>
  )
}

export default App;
  