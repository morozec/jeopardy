import React from 'react';
import './App.css';
import Gameboard from './components/Gameboard';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Question from './components/Question';

function App() {
  // const testQuestion = {
  //   topic: 'ttt',
  //   text: 'qqq'
  // };
  return (
    <Router>
      <div className="App">

        <Switch>
          <Route exact path="/question" render={(props) => <Question {...props} xxx={true} />} />
          <Route path="/">
            <Gameboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
