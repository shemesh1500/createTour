import React, { Component } from "react";
import { connect } from "react-redux";
import { incrementAsync, decramentAsync, changeURL } from "./testAction";
import { Button } from "semantic-ui-react";
import { openModal } from "../modals/modalActions";

const mapState = (state) => ({
  data: state.test.data,
  loading: state.async.loading,
  buttonName: state.async.elementName,
  user: state.user,
});

const actions = {
  incrementAsync,
  decramentAsync,
  openModal,
  changeURL
};

class TestComponent extends Component {
  getData() {
    console.log("inside GET");
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // get a callback when the server responds
    xhr.addEventListener("load", () => {
      // update the state of the component with the result here
      console.log(xhr.responseText);
    });
    // open the request with the verb and the url
    xhr.open(
      "GET",
      "http://localhost:5001/tours-app-1579553856346/us-central1/addMessage"
      //"https://asia-northeast1-tours-app-1579553856346.cloudfunctions.net/addMessage"
    ); //"https://httpbin.org/anything");
    // send the request
    xhr.send();
  }

  render() {
    console.log("GET");
    return (
      <div>
        <h1>Test Component</h1>
        <h3>the data is: {this.props.data}</h3>
        <Button
          name="increment"
          onClick={(e) => this.props.incrementAsync(e.target.name)}
          positive
          content="Increment"
          loading={this.props.buttonName === "increment" && this.props.loading}
        />
        <Button
          name="decrament"
          onClick={(e) => this.props.decramentAsync(e.target.name)}
          negative
          content="Decrement"
          loading={this.props.buttonName === "decrament" && this.props.loading}
        />
        <Button
          onClick={() => this.props.openModal("TestModal", { data: 55 })}
          color="teal"
          content="Open Modal"
        />
        <Button
          name="decrament"
          onClick={(e) => this.props.setUserToDB(this.test_user)}
          negative
          content="Decrement"
        />
        <Button
          onClick={() => this.getData()}
          color="teal"
          content="Open Modal"
        />
        <Button
          onClick={() => this.props.changeURL('ckgnyu13q000b3a5s8v62g02o', 'ckgqfclcm00042464d233guw5')}
          color="teal"
          content="TEST ref"
        />
      <Button onClick={() => window.confirm("hello?") ? console.log("Lets do it!") : null}>
        Open Modal
      </Button>
      </div>
    );
  }
}

export default connect(mapState, actions)(TestComponent);
