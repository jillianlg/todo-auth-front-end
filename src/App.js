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
import PrivateRoute from './PrivateRoute.js';


export default class App extends Component {
  state = {
    username: localStorage.getItem('USERNAME') || '',
    token: localStorage.getItem('TOKEN') || '',
  }

  changeTokenAndUsername = (email, token) => {
    localStorage.setItem('TOKEN', token);
    localStorage.setItem('USERNAME', email);

    this.setState({
      username: email,
      token: token
    })
  }

  render() {
    return (
      <div>
        <Router>
          <ul>
          { localStorage.getItem('USERNAME')}
            <Link to="/login"><div>Log In</div></Link>
            <Link to="/signup"><div>Sign Up</div></Link>
          </ul>
          <Switch>
            <Route exact path='/' render={(routerProps)=> <Home {...routerProps} />} />
            <Route exact path='/login' render={(routerProps)=> <Login {...routerProps} changeTokenAndUsername= {this.changeTokenAndUsername}/>} />
            <Route exact path='/signup' render={(routerProps)=> <Signup {...routerProps} changeTokenAndUsername= {this.changeTokenAndUsername}/>} />
            <PrivateRoute token={this.state.token} exact path='/todos' render={(routerProps)=> <Todos {...routerProps} token={this.state.token} />} />
          </Switch>
        </Router>
      </div>
    )
  }
}
