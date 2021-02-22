import './assets/App.css';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import AddAppt from "./addappt";
import ListAppt from "./listappt";
import NavBar from "./Navbar";
import {  BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ShowCalendar from './Calendar';


function App() {

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <ShowCalendar />
        </Route>
        <Route path="/events">
          < ListAppt />
        </Route>
        <Route path="/add">
          <AddAppt />
        </Route>
        <Route path="/calendar">
          <ShowCalendar />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
