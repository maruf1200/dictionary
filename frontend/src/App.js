import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddWord from './AddWord';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/lists' exact={true} component={Home}/>
          <Route path='/lists/:id' component={AddWord}/>    
        </Switch>
      </Router>
    )
  }
}

export default App;