import React, { Component } from "react";
import "./style.css";
import Spinner from "react-bootstrap/Spinner";

class Fetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      result: null
    };
  }

  async componentWillMount() {
    try {
      let result = await this.props.request;
      this.setState({ result });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const content = this.state.loading ? (
      <Spinner className="fetcher__spinner" animation="border" />
    ) : (
      this.getContent()
    );
    return <div className="fetcher">{content}</div>;
  }

  getContent() {
    return this.props.children(this.state.result);
  }
}

export default Fetcher;
