import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { getUsers } from "../../resources/user";
import "./style.css";
import { getRights } from "../../resources/right";
import Checkbox from "../../components/Checkbox";
import Fetcher from "../../components/Fetcher";
import { getGroup } from "../../resources/group";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { UserSelection } from "./../../smurt/smurt/UserSelection/index";
import { updateGroup } from "../../resources/group";

class _GroupEditorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
      rights: props.rights,
      group: props.group,
      loading: false
    };
  }

  handleChangeCheckBox = rightId => {
    let index = this.state.group.rights.findIndex(
      rightIndex => rightIndex === rightId
    );
    const { rights } = this.state.group;
    if (index > -1) {
      this.setState({
        group: {
          ...this.state.group,
          rights: rights.filter(id => id !== rightId)
        }
      });
    } else {
      this.setState({
        group: {
          ...this.state.group,
          rights: [...rights, rightId]
        }
      });
    }
  };

  async handleSave() {
    try {
      this.setState({ loading: true });
      await updateGroup(this.state.group);
      this.props.history.goBack();
    } finally {
      this.setState({ loading: false });
    }
  }

  handleDel = userId => {
    const { users } = this.state.group;
    this.setState({
      group: {
        ...this.state.group,
        users: users.filter(id => id !== userId)
      }
    });
  };

  handleUserSelected = user => {
    this.setState({
      group: {
        ...this.state.group,
        users: [...this.state.group.users, user.id]
      }
    });
  };

  getGroupUsers() {
    return this.state.users.filter(user =>
      this.state.group.users.includes(user.id)
    );
  }

  getNonGroupUsers() {
    return this.state.users.filter(
      user => !this.state.group.users.includes(user.id)
    );
  }

  render() {
    const content = this.state.loading ? (
      <Spinner className="group-editor-page__spinner" animation="border" />
    ) : (
      this.getContent()
    );

    return <div className="group-editor-page">{content}</div>;
  }

  getContent() {
    return (
      <>
        <UserSelection
          className="group-editor-page__user-selection"
          onChange={this.handleUserSelected}
          users={this.getNonGroupUsers()}
        />

        <Table className="group-editor-page__users" striped bordered hover>
          <thead>
            <tr>
              <th>П/н</th>
              <th>Имена пользователей</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {this.getGroupUsers().map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.userName}</td>
                <td>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => this.handleDel(item.id)}
                  >
                    Удалить пользователя
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Table className="group-editor-page__rights" striped bordered hover>
          <thead>
            <tr>
              <th>Активно</th>
              <th>Права пользователей группы</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rights.map(item => (
              <tr key={item.id}>
                <td>
                  <Checkbox
                    checked={this.state.group.rights.some(
                      right => item.id === right
                    )}
                    onChange={() => this.handleChangeCheckBox(item.id)}
                  ></Checkbox>
                </td>
                <td>{item.rightName}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button
          className="group-editor-page__buttonssave"
          onClick={() => this.handleSave()}
        >
          Сохранить
        </Button>
        <Button
          className="group-editor-page__buttonssave"
          onClick={() => this.props.history.goBack()}
          variant="secondary"
        >
          Отмена
        </Button>
      </>
    );
  }
}

const GroupEditorPageFetcher = props => {
  const { groupId } = props.match.params;

  const request = Promise.all([getUsers(), getRights(), getGroup(+groupId)]);
  return (
    <Fetcher request={request}>
      {([users, rights, group]) => (
        <_GroupEditorPage
          {...props}
          users={users}
          rights={rights}
          group={group}
        />
      )}
    </Fetcher>
  );
};

export default withRouter(GroupEditorPageFetcher);
