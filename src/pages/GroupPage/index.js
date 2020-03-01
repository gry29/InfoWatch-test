import React, { Component } from "react";
import { getGroups } from "./../../resources/group";
import Table from "react-bootstrap/Table";
import { withRouter } from "react-router";
import { getRights } from "./../../resources/right";
import Fetcher from "../../components/Fetcher";

class GroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: props.groups,
      rights: props.rights
    };
  }

  handleClick = groupId => {
    this.props.history.push(`/group-editor/${groupId}`);
  };

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>П/н</th>
            <th>Имя группы</th>
            <th>Права группы</th>
          </tr>
        </thead>
        <tbody>
          {this.state.groups.map(group => (
            <tr key={group.id} onClick={() => this.handleClick(group.id)}>
              <td>{group.id}</td>
              <td>{group.groupName}</td>
              <td>
                {group.rights.map(
                  rightId =>
                    this.state.rights.find(right => right.id === rightId)
                      .rightName
                ) + " "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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

export default withRouter(GroupFetcher);
