import React from 'react';
import './App.css';
import MainBoard from './components/MainBoard';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Registration from './components/Registration';

function App() {
  // const testQuestion = {
  //   topic: 'ttt',
  //   text: 'qqq'
  // };
  return (
    <Router basename={process.env.PUBLIC_URL}>

      <div className="App">

        <Switch>
          <Route exact path="/game" render={(props) => <MainBoard {...props} />} />        
          
          <Route path="/">
            <Registration />
          </Route> 

        </Switch>
      </div>
    </Router>
  );
}

export default App;
