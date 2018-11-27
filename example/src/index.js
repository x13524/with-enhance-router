import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, Switch} from 'react-router-dom'
import './index.css'
import App from './App'
import createHashHistory from 'history/createHashHistory'

ReactDOM.render(
  <Router history={createHashHistory()}>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/award/:noKolModal" component={App}/>
    </Switch>
  </Router>,
  document.getElementById('root')
)
