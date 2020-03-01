import React, { Component } from "react";
import { getRights } from "./../../resources/right";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Fetcher from "../../components/Fetcher";
import { putRight, deleteRight } from "../../resources/right";

class RightPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rights: props.rights,
      showRightForm: false
    };
  }


  handleSubmit = async event => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (!form.checkValidity()) {
      return;
    }

    const right = await putRight({ rightName: form.elements.rightName.value });
    this.setState({
      rights: [...this.state.rights, right],
      showRightForm: false
    });
  };

  openModal = () => {
    this.setState({ showRightForm: true });
  };

  handleClose = () => {
    this.setState({ showRightForm: false });
  };

  handleDelete = async rightId => {
    await deleteRight(rightId);

    this.setState({
      rights: this.state.rights.filter(r => r.id !== rightId)
    });
  };

  render() {
    return (
      <div className="right-page">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>П/н</th>
              <th>Права</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rights.map(right => (
              <tr key={right.id}>
                <td>{right.id}</td>
                <td>{right.rightName}</td>
                <td>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => this.handleDelete(right.id)}
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
            <Modal.Title>Форма добавления права</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form id="rightForm" onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Имя права</Form.Label>
                <Form.Control
                  size="lg"
                  name="rightName"
                  type="text"
                  required
                />
              </Form.Group>
            </Form>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Закрыть
              </Button>
              <Button variant="primary" type="submit" form="rightForm">
                Сохранить
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const RightsFetcher = props => {
  return (
    <Fetcher request={getRights()}>
      {rights => <RightPage {...props} rights={rights} />}
    </Fetcher>
  );
};

export default RightsFetcher;
