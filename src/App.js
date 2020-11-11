import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Link,
} from "react-router-dom";
import './App.css';	import './App.css';
import Login from './Login.js'
import Signup from './SignUp.js'
import Home from './Home.js'
import Todos from './Todos.js'


export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <ul>
            <Link to="/login"><div>Log In</div></Link>
            <Link to="/signup"><div>Sign Up</div></Link>
          </ul>
          <Switch>
            <Route exact path='/' render={(routerProps)=> <Home {...routerProps} />} />
            <Route exact path='/login' render={(routerProps)=> <Login {...routerProps} />} />
            <Route exact path='/signup' render={(routerProps)=> <Signup {...routerProps} />} />
            <Route exact path='/todos' render={(routerProps)=> <Todos {...routerProps} />} />
          </Switch>
        </Router>
      </div>
    )
  }
}
