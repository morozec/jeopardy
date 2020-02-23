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
    <Router>

      <div className="App">

        <Switch>
          {/* <Route exact path="/question" render={(props) => <Question {...props} xxx={true} />} /> */}

          <Route exact path="/reg">
            <Registration />
          </Route>

          <Route path="/" render={(props) => <MainBoard {...props} />} />         

        </Switch>
      </div>
    </Router>
  );
}

export default App;
