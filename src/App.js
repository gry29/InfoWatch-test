import React, { Component } from "react";
import GroupPage from "./pages/GroupPage";
import "./App.css";
import { Route, Switch, NavLink } from "react-router-dom";
import GroupEditorPage from "./pages/GroupEditorPage";
import UserPage from "./pages/UserPage";
import RightPage from "./pages/RightPage";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">InfoWatch</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="">
              <NavLink to="/">Группы</NavLink>
            </Nav.Link>
            <Nav.Link href="">
              <NavLink to="/users">Пользователи </NavLink>
            </Nav.Link>
            <Nav.Link href="">
              <NavLink to="/rights"> Права</NavLink>
            </Nav.Link>
          </Nav>
        </Navbar>
        <Switch>
          <Route exact path="/" component={GroupPage} />
          <Route path="/users" component={UserPage} />
          <Route path="/rights" component={RightPage} />
          <Route path="/group-editor/:groupId" component={GroupEditorPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
