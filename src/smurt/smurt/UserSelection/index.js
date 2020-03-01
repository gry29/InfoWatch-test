import React, { PureComponent } from "react";
import { Typeahead } from "react-bootstrap-typeahead";

export class UserSelection extends PureComponent {
  typeahed = React.createRef();

  handleOnChanged = event => {
    this.typeahed.current.getInstance().clear();
    if (this.props.onChange !== undefined) {
      this.props.onChange(event[0]);
    }
  };

  render() {
    return (
      <div>
        <Typeahead
          id="21312"
          ref={this.typeahed}
          labelKey="userName"
          options={this.props.users}
          placeholder="Введите имя пользователя, чтобы добавить его в группу..."
          onChange={this.handleOnChanged}
        />
      </div>
    );
  }
}

export default UserSelection;
