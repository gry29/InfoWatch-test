import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Typeahead } from "react-bootstrap-typeahead";
import Fetcher from "./../../components/Fetcher";
import { getUsers } from "./../../resources/user";

class GroupForm extends Component {
  handleUserSelected = users => {
    this.props.onChangeGroup({
      ...this.props.group,
      users: users.map(user => user.id)
    });
  };

  handleRightSelected = rights => {
    this.props.onChangeGroup({
      ...this.props.group,
      rights: rights.map(right => right.id)
    });
  };

  getGroupUsers() {
    return this.props.users.filter(user =>
      this.props.group.users.includes(user.id)
    );
  }

  getGroupRights() {
    return this.props.rights.filter(right =>
      this.props.group.rights.includes(right.id)
    );
  }

  getNonGroupUsers() {
    return this.props.users.filter(
      user => !this.props.group.users.includes(user.id)
    );
  }

  getNonGroupRights() {
    return this.props.rights.filter(
      right => !this.props.group.rights.includes(right.id)
    );
  }

  handleChangeName = event => {
    this.props.onChangeGroup({
      ...this.props.group,
      groupName: event.target.value
    });
  };

  render() {
    return (
      <Form
        id={this.props.id}
        className="group-form"
        onSubmit={this.props.onSubmit}
      >
        <Form.Group>
          <Form.Label>Имя группы</Form.Label>
          <Form.Control
            name="groupNaName"
            type="text"
            value={this.props.group.groupName}
            onChange={this.handleChangeName}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Пользователи</Form.Label>
          <Typeahead
            id="users-typeahead"
            labelKey="userName"
            multiple
            options={this.getNonGroupUsers()}
            placeholder="Введите имя пользователя, чтобы добавить его в группу..."
            onChange={users => this.handleUserSelected(users)}
            selected={this.getGroupUsers()}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Права</Form.Label>
          <Typeahead
            id="rights-typeahead"
            labelKey="rightName"
            multiple
            options={this.getNonGroupRights()}
            placeholder="Введите имя права, чтобы добавить его в группу..."
            onChange={rights => this.handleRightSelected(rights)}
            selected={this.getGroupRights()}
          />
        </Form.Group>
      </Form>
    );
  }
}
const GroupFormFetcher = props => {
  return (
    <Fetcher request={getUsers()}>
      {users => <GroupForm {...props} users={users} />}
    </Fetcher>
  );
};

export default GroupFormFetcher;
