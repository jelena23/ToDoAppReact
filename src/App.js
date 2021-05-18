import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";
import Todos from "./components/Todos";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ResponsiveNav from "./components/ResponsiveNav";

function App() {
  //exact is used so that it renders the exact path
  const [forceNavRerender, setForceNavRerender] = useState(false);
  return (
    <Router>
      <div className="App">
        <ResponsiveNav
          forceNavRerender={forceNavRerender}
          setForceNavRerender={setForceNavRerender}
        />
        <Switch>
          <Route path="/about" exact component={About} />
          <Route path="/register" exact component={Register} />
          <Route path="/login">
            <Login setForceNavRerender={setForceNavRerender} />
          </Route>
          <Route path="/profile" exact component={Profile} />
          <Route path="/todos" exact render={() => <Todos />} />
          {/* <Route path="/datetime" exact component={DateTime} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
