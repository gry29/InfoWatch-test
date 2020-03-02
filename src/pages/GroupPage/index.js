import React, { Component } from "react";
import {
  getGroups,
  deleteGroup,
  putGroup,
  updateGroup
} from "./../../resources/group";
import Table from "react-bootstrap/Table";
import { getRights } from "./../../resources/right";
import Fetcher from "../../components/Fetcher";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import GroupForm from "./../../smurt/GroupForm";
import "./style.css";

class GroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: props.groups,
      rights: props.rights,
      showGroupForm: false,
      selectedGroup: null,
      loading: true
    };
  }

  async handleSave() {
    try {
      this.setState({ loading: true });
      await updateGroup(this.state.group);
      this.props.history.goBack();
    } finally {
      this.setState({ loading: false });
    }
  }

  handleEditGroup = selectedGroup => {
    this.setState({ selectedGroup, showGroupForm: true });
  };

  handleDelete = async groupId => {
    await deleteGroup(groupId);

    this.setState({
      groups: this.state.groups.filter(g => g.id !== groupId)
    });
  };

  handleSubmit = async event => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (!form.checkValidity()) {
      return;
    }

    let isNew = this.state.selectedGroup.id === undefined;

    const group = await putGroup(this.state.selectedGroup);
    let groups = [...this.state.groups];

    if (isNew) {
      groups.push(group);
    } else {
      const foundIndex = groups.findIndex(x => x.id === group.id);
      groups.splice(foundIndex, 1, group);
    }
    this.setState({ groups, showGroupForm: false });
  };

  openModal = () => {
    this.setState({
      showGroupForm: true,
      selectedGroup: { groupName: "Новая группа", users: [], rights: [] }
    });
  };

  handleClose = () => {
    this.setState({ showGroupForm: false });
  };

  handleChangeGroup = group => {
    this.setState({ selectedGroup: group });
  };

  handelChangeName = event => {
    this.setState({
      selectedGroup: {
        ...this.state.selectedGroup,
        groupName: event.target.value
      }
    });
  };

  getRightNames = group => {
    const rightNames = group.rights.map(
      rightId => this.state.rights.find(right => right.id === rightId).rightName
    );

    return rightNames.join(", ");
  };

  render() {
    return (
      <div className="group-page">
        <Button
          variant="primary"
          className="group-page__add-btn"
          onClick={() => this.openModal()}
        >
          Добавить группу
        </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>П/н</th>
              <th>Имя группы</th>
              <th>Права группы</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {this.state.groups.map(group => (
              <tr key={group.id}>
                <td>{group.id}</td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => this.handleEditGroup(group)}
                >
                  {group.groupName}
                </td>
                <td>{this.getRightNames(group)}</td>
                <td>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="group-page__action-btn"
                    onClick={() => this.handleEditGroup(group)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="group-page__action-btn"
                    onClick={() => this.handleDelete(group.id)}
                  >
                    Удалить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={this.state.showGroupForm} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Форма добавления права</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <GroupForm
              id="groupForm"
              onSubmit={this.handleSubmit}
              onChangeName={this.handelChangeName}
              group={this.state.selectedGroup}
              rights={this.state.rights}
              onChangeGroup={this.handleChangeGroup}
            />
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Закрыть
              </Button>
              <Button variant="primary" type="submit" form="groupForm">
                Сохранить
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const GroupFetcher = props => {
  const request = Promise.all([getGroups(), getRights()]);

  return (
    <Fetcher request={request}>
      {([groups, rights]) => (
        <GroupPage {...props} groups={groups} rights={rights} />
      )}
    </Fetcher>
  );
};

export default GroupFetcher;
