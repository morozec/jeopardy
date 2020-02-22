import React from 'react';
import './App.css';
import Gameboard from './components/Gameboard';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Registration from './components/Registration';
import TopicsTable from './components/TopicsTable';

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

          <Route exact path="/topics" render={(props)=><TopicsTable {...props} />}/>

          <Route path="/" render={(props) => <Gameboard {...props} />} />         

        </Switch>
      </div>
    </Router>
  );
}

export default App;
