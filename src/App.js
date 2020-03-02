import React, { Component } from "react";
import GroupPage from "./pages/GroupPage";
import "./App.css";
import { Route, Switch, NavLink } from "react-router-dom";
import UserPage from "./pages/UserPage";
import RightPage from "./pages/RightPage";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" className="header">
          <Navbar.Brand href="#home">InfoWatch</Navbar.Brand>
          <Nav>
            <NavLink className="header__link" to="/">
              Группы
            </NavLink>
            <NavLink className="header__link" to="/users">
              Пользователи
            </NavLink>
            <NavLink className="header__link" to="/rights">
              Права
            </NavLink>
          </Nav>
        </Navbar>
        <Switch>
          <Route exact path="/" component={GroupPage} />
          <Route path="/users" component={UserPage} />
          <Route path="/rights" component={RightPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
