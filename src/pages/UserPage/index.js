import React, { Component } from "react";
import { getUsers, deleteUser, putUser } from "./../../resources/user";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Fetcher from "../../components/Fetcher";

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users
    };
  }

  handleSubmit = async event => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (!form.checkValidity()) {
      return;
    }

    const user = await putUser({ userName: form.elements.userName.value });
    this.setState({
      users: [...this.state.users, user],
      showRightForm: false
    });
  };

  openModal = () => {
    this.setState({ showRightForm: true });
  };

  handleClose = () => {
    this.setState({ showRightForm: false });
  };

  handleDelete = async userId => {
    await deleteUser(userId);

    this.setState({
      users: this.state.users.filter(r => r.id !== userId)
    });
  };

  render() {
    return (
      <div className="user-page">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>П/н</th>
              <th>Права</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.userName}</td>
                <td>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => this.handleDelete(user.id)}
                  >
                    Удалить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button
          className="right-page__save-btn"
          onClick={() => this.openModal()}
        >
          Добавить право
        </Button>

        <Modal show={this.state.showRightForm} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Форма добавления пользователей</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form id="userForm" onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Имя пользователя</Form.Label>
                <Form.Control size="lg" name="userName" type="text" required />
              </Form.Group>
            </Form>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Закрыть
              </Button>
              <Button variant="primary" type="submit" form="userForm">
                Сохранить
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const UsersFetcher = props => {
  return (
    <Fetcher request={getUsers()}>
      {users => <UserPage {...props} users={users} />}
    </Fetcher>
  );
};

export default UsersFetcher;
